import React, { memo, useEffect, useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import './learning.css';
// hooks
import { useResponsive } from '~/hooks';
// components
import Page from '~/components/Page';
import Logo from '~/components/Logo';
import Image from '~/components/Image';
import { DialogAnimate } from '~/components/animate';
import LoadingScreen from '~/components/LoadingScreen';

import { eventApi, zoomApi } from '~/api';
import { ErrorIcon } from '~/assets';
import { cloudinary } from '~/utils';
import { Event, SignatureData } from '~/models';

// ----------------------------------------------------------------------

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.2.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  padding: theme.spacing(0),
  margin: theme.spacing(0),
  backgroundColor: theme.palette.background.default,
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  position: 'absolute',
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(0),
  padding: theme.spacing(20, 5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0),
  },
}));

const ContainerContent = styled(Container)(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(10),
  },
  // backgroundColor: theme.palette.background.primary,
}));

function Learning() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const registrantToken = '';
  const { id } = useParams(); // id --> eventId
  const navigate = useNavigate();
  const [meetingInfo, setMeetingInfo] = useState<Partial<Event>>();
  const apiKey = process.env.REACT_APP_ZOOM_JWT_API_KEY;
  const leaveUrl = `${window.location.origin}/learning/${id}`;

  useEffect(() => {
    const checkValidUserInClass = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await eventApi.checkValidUser(id);
        setMeetingInfo(data);
      } catch (error) {}
      setIsLoading(false);
    };

    checkValidUserInClass();
  }, [id]);

  const mdUp = useResponsive('up', 'md');

  const startMeeting = (signature: string) => {
    const zmmtgRoot = document.getElementById('zmmtg-root');
    if (!zmmtgRoot) return;
    zmmtgRoot.style.display = 'block';

    ZoomMtg.init({
      leaveUrl,
      success: () => {
        ZoomMtg.join({
          signature,
          meetingNumber: meetingInfo?.meetingNumber as string,
          userName: meetingInfo?.name as string,
          apiKey,
          userEmail: meetingInfo?.email,
          passWord: meetingInfo?.passwordMeeting,
          tk: registrantToken,
          success: () => {},
          error: () => {
            if (!zmmtgRoot) return;
            zmmtgRoot.style.display = 'none';
          },
        });
      },
      error: () => {},
    });
  };

  const getSignature = async () => {
    if (!meetingInfo) return;
    try {
      const data: SignatureData = {
        meetingNumber: meetingInfo?.meetingNumber as string,
        role: meetingInfo?.role as number,
      };
      const { signature } = await zoomApi.getSignature(data);
      startMeeting(signature);
    } catch (error) {}
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Page title="Learning">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
        <ContainerContent>
          <Grid container>
            {mdUp && (
              <Grid item xs={12} md={5}>
                <SectionStyle>
                  <Image
                    alt="join meeting"
                    src={`${window.location.origin}/assets/images/education-online.png`}
                  />
                </SectionStyle>
              </Grid>
            )}

            <Grid item xs={12} md={7}>
              <ContentStyle>
                <Image
                  alt="js"
                  ratio="21/9"
                  sx={{ borderRadius: 1 }}
                  src={cloudinary.w700(meetingInfo?.cover)}
                />
                <Typography variant="h3" sx={{ my: 5 }}>
                  Join Meeting
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={getSignature}
                >
                  Join Meeting
                </Button>
              </ContentStyle>
            </Grid>
          </Grid>
        </ContainerContent>

        <DialogAnimate open={!meetingInfo}>
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <ErrorIcon sx={{ mb: 5, mx: 'auto', height: 120 }} />
            <Typography variant="h3" gutterBottom>
              You do not have permission to join this meeting
            </Typography>

            <Button
              size="large"
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{ mt: 5 }}
            >
              Back
            </Button>
          </Box>
        </DialogAnimate>
      </RootStyle>
    </Page>
  );
}

export default memo(Learning);

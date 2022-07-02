import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import { LogoOnlyLayout } from '~/layouts';
// routes
import { PATH_AUTH } from '~/routes/paths';
// components
import Page from '~/components/Page';
import LoadingScreen from '~/components/LoadingScreen';
// assets
import { SuccessIcon, ErrorIcon } from '~/assets';
import { userApi } from '~/api';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Verify() {
  const { id, token } = useParams();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);
      if (!id || !token) return setIsValid(false);
      try {
        await userApi.verifyEmail(id, token);
        setIsValid(true);
      } catch (error) {}
      setIsLoading(false);
    };

    verifyEmail();
  }, [id, token]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Page title="Verify Email" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {isValid ? (
              <Box sx={{ textAlign: 'center' }}>
                <SuccessIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Verify email successfully, go to login
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 5 }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <ErrorIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
                <Typography variant="h3" gutterBottom>
                  Verify email fail
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.verify}
                  sx={{ mt: 5 }}
                >
                  Go back
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

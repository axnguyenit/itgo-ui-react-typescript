// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar } from '@mui/material';
// utils
import { cloudinary, createAvatar, cssStyles } from '~/utils';
// components
import Image from '~/components/Image';
import { User } from '~/models';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles(theme).bgBlur({
      blur: 2,
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

interface ProfileCoverProps {
  profile: Partial<User>;
}

export default function ProfileCover({ profile }: ProfileCoverProps) {
  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          src={cloudinary.w300(profile?.avatar)}
          alt={`${profile?.firstName} ${profile?.lastName}`}
          color={
            profile?.avatar
              ? 'default'
              : createAvatar(`${profile?.firstName} ${profile?.lastName}`).color
          }
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderRadius: '50%',
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant='h4'>
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>
            {profile?.position || '#'}
          </Typography>
        </Box>
      </InfoStyle>
      <Image
        alt='profile cover'
        src={cloudinary.w900(profile?.avatar)}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}

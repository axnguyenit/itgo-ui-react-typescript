// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Theme } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const HeroOverlayStyle = styled('img')({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '80%',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  return (
    <Box>
      <RootStyle>
        <HeroOverlayStyle
          alt='overlay'
          src={`${window.location.origin}/assets/images/overlay.svg`}
        />

        <HeroImgStyle
          alt='hero'
          src={`${window.location.origin}/assets/images/home-hero.png`}
        />

        <Container>
          <Stack
            spacing={5}
            sx={{
              zIndex: 10,
              maxWidth: 520,
              margin: 'auto',
              textAlign: 'center',
              position: 'relative',
              paddingTop: theme.spacing(15),
              paddingBottom: theme.spacing(15),
              [theme.breakpoints.up('md')]: {
                margin: 'unset',
                textAlign: 'left',
              },
            }}
          >
            <Typography variant='h1' sx={{ color: 'common.white' }}>
              Start learning <br />
              programming <br /> with
              <Typography
                component='span'
                variant='h1'
                sx={{ color: 'primary.main' }}
              >
                &nbsp;ITGO
              </Typography>
            </Typography>

            <Typography sx={{ color: 'common.white' }}>
              Vietnam's leading programming learning platform taught by IT
              engineers.
            </Typography>
          </Stack>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </Box>
  );
}

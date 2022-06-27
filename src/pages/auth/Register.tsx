import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Card } from '@mui/material';
// hooks
import { useResponsive } from '~/hooks';
// routes
import { PATH_AUTH } from '~/routes/paths';
// components
import Page from '~/components/Page';
import Logo from '~/components/Logo';
import Image from '~/components/Image';
// sections
import { RegisterForm } from '~/sections/auth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title='Register'>
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant='body2' sx={{ mt: { lg: 1, md: -2 } }}>
              Already have an account?&nbsp;
              <Link
                variant='subtitle2'
                component={RouterLink}
                to={PATH_AUTH.login}
              >
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Start learning programing with ITGO
            </Typography>
            <Image
              alt='register'
              src={`${window.location.origin}/assets/images/register.png`}
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Register to ITGO
                </Typography>
              </Box>
              <Image
                disabledEffect
                src={`${window.location.origin}/assets/images/ic_jwt.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Box>
            <RegisterForm />

            <Typography
              variant='body2'
              align='center'
              sx={{ color: 'text.secondary', mt: 3 }}
            >
              By registering, I agree to Minimal&nbsp;
              <Link underline='always' color='text.primary' href='#'>
                Terms of Service&nbsp;
              </Link>
              and&nbsp;
              <Link underline='always' color='text.primary' href='#'>
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                  variant='subtitle2'
                  to={PATH_AUTH.login}
                  component={RouterLink}
                >
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Container, Typography } from '@mui/material';
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
import { RootStyle, HeaderStyle, SectionStyle, ContentStyle } from './Styles';

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { lg: 1, md: -2 } }}>
              Already have an account?&nbsp;
              <Link
                variant="subtitle2"
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
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Start learning programing with ITGO
            </Typography>
            <Image
              alt="register"
              src={`${window.location.origin}/assets/images/register.png`}
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
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

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                  variant="subtitle2"
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

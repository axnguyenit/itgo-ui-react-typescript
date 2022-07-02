import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '~/routes/paths';
// components
import Page from '~/components/Page';
import Logo from '~/components/Logo';
import Image from '~/components/Image';
// sections
import { LoginForm } from '~/sections/auth';
import { RootStyle, HeaderStyle, SectionStyle, ContentStyle } from './Styles';
import { useResponsive } from '~/hooks';

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { lg: 1, md: -2 } }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image
              alt="login"
              src={`${window.location.origin}/assets/images/login.png`}
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Login to ITGO
                </Typography>
              </Box>

              <Image
                disabledEffect
                src={`${window.location.origin}/assets/images/ic_jwt.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Stack>

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to={PATH_AUTH.register}
                >
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

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
// sections
import { ResetPasswordForm } from '~/sections/auth';
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

export default function ForgotPassword() {
  const { id, token } = useParams();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkRequestResetPassword = async () => {
      setIsLoading(true);
      if (!id || !token) return setIsValid(false);
      try {
        await userApi.checkRequestResetPassword(id, token);
        setIsValid(true);
      } catch (error) {}
      setIsLoading(false);
    };

    checkRequestResetPassword();
  }, [id, token]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!isSent && isValid && (
              <>
                <Typography variant="h3" paragraph>
                  Create new password
                </Typography>

                <ResetPasswordForm
                  onSent={() => setIsSent(true)}
                  id={id as string}
                  token={token as string}
                />

                <Button
                  fullWidth
                  size="large"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 2 }}
                >
                  Go back
                </Button>
              </>
            )}

            {isSent && (
              <Box sx={{ textAlign: 'center' }}>
                <SuccessIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Reset password successfully
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 5 }}
                >
                  Go back
                </Button>
              </Box>
            )}

            {!isValid && (
              <Box sx={{ textAlign: 'center' }}>
                <ErrorIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
                <Typography variant="h3" gutterBottom>
                  Link reset password is invalid
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
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

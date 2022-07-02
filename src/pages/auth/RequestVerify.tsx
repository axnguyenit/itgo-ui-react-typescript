import { useEffect, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import { LogoOnlyLayout } from '~/layouts';
// routes
import { PATH_AUTH } from '~/routes/paths';
// components
import Page from '~/components/Page';
// sections
import { RequestVerifyForm } from '~/sections/auth';
// assets
import { SentIcon } from '~/assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RequestVerify() {
  const [email, setEmail] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') as string;
  const _email = searchParams.get('email') as string;

  useEffect(() => {
    if (status === 'sent') {
      setIsSent(true);
      setEmail(_email);
    }
  }, [status, _email]);

  return (
    <Page title="Verify Email" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!isSent ? (
              <>
                <Typography variant="h3" paragraph>
                  Verify your email address
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account
                  and We will email you a link to verify your email address.
                </Typography>

                <RequestVerifyForm
                  onSent={() => setIsSent(true)}
                  onGetEmail={(value) => setEmail(value)}
                />

                <Button
                  fullWidth
                  size="large"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a verify email link to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
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

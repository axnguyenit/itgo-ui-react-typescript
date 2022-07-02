import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '~/components/Page';
// assets
import { SeverErrorIllustration } from '~/assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page500() {
  const navigate = useNavigate();
  return (
    <Page title="500 Internal Server Error" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              500 Internal Server Error
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              There was an error, please try again later.
            </Typography>

            <SeverErrorIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />

            <Button
              onClick={() => navigate(-2)}
              size="large"
              variant="contained"
            >
              Go back
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

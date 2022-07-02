// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  CardHeader,
  Typography,
  Box,
  Grid,
  Alert,
  Stack,
} from '@mui/material';
// sections
import { useAuth } from '~/hooks';
// components
import Image from '~/components/Image';
import Page from '~/components/Page';
// sections
import { CourseHero } from '~/sections/courses';
import { ApplyAsInstructorForm } from '~/sections/become-instructor';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function BecomeInstructor() {
  const { user } = useAuth();
  return (
    <Page title="Become An Instructor">
      <RootStyle>
        <CourseHero
          label="Become An Instructor"
          src={`${window.location.origin}/assets/images/my-learning.jpg`}
        />
        <Container maxWidth="lg" sx={{ mt: 12, mb: 10 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CardHeader
              title="Apply As Instructor"
              subheader="Share your knowledge with everyone"
              sx={{
                '& .MuiCardHeader-action': {
                  alignSelf: 'center',
                },
                '& .MuiCardHeader-title': {
                  fontSize: 28,
                },
                mb: 2,
              }}
            />
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography
                variant="body2"
                sx={{ mb: 4, width: { xs: '100%', md: '80%' } }}
              >
                ITGO needs talented human resources like you, let's create
                values together with ITGO. To be an instructor at ITGO, you just
                fill in your working position and attach you CV as PDF. We will
                consider your application and response to you if you can afford
                it. Don't hesitate, we are always waiting for you
              </Typography>
            </Stack>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} md={8}>
              <Box>
                <Image
                  src="/assets/images/become-instructor.png"
                  ratio="16/9"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {user?.isInstructor ? (
                <Alert>You are already an instructor</Alert>
              ) : user?.isApply ? (
                <Alert>
                  Your have already sent the request. Please wait for
                  approvement
                </Alert>
              ) : (
                <ApplyAsInstructorForm />
              )}
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// @mui
import Page from '~/components/Page';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// sections
import {
  HomeHero,
  HomeRoadmapList,
  HomeInstructorList,
  HomePopularTech,
} from 'src/sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

export default function Home() {
  return (
    <Page title='Home'>
      <HomeHero />
      <ContentStyle>
        <Container sx={{ mt: 15 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <HomeRoadmapList />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <HomeInstructorList />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <HomePopularTech />
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </Page>
  );
}

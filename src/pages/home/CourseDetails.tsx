import { capitalCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab } from '@mui/material';
// components
import {
  CourseHero,
  // CourseDetailsReview,
  CourseDetailsSummary,
} from '~/sections/courses';
import Page from '~/components/Page';
import { PATH_PAGE } from '~/routes/paths';
import Markdown from '~/components/Markdown';
import LoadingScreen from '~/components/LoadingScreen';
// api
import courseApi from '~/api/courseApi';
import { Course } from '~/models';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const TAB_LIST = ['overview', 'requirements', 'target-audiences', 'reviews'];

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TAB_LIST.includes(tab)) setCurrentTab(tab);
  }, [searchParams]);

  useEffect(() => {
    const getCourse = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const { course } = await courseApi.get(id);
        setCourse(course);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
      setIsLoading(false);
    };

    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
    setSearchParams({ tab: value });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Page title='Course Details'>
      <RootStyle>
        <CourseHero label='Course Details' src={`${window.location.origin}/assets/images/courses-hero.jpg`} />

        <Container sx={{ mt: 15, mb: 10 }}>
          {/* <Grid container spacing={4}> */}
          {/* <Grid item xs={12} md={8} spacing={3}> */}
          {course && <CourseDetailsSummary course={course} />}

          <Stack sx={{ mt: 3 }}>
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => handleChangeTab(value)}>
                {TAB_LIST.map((tab) => (
                  <Tab key={tab} disableRipple value={tab} label={capitalCase(tab)} />
                ))}
              </TabList>

              <Divider />

              <TabPanel value='overview'>
                <Box sx={{ py: 4 }}>
                  <Markdown children={course?.details.overview as string} />
                </Box>
              </TabPanel>
              <TabPanel value='requirements'>
                <Box sx={{ py: 4 }}>
                  <Markdown children={course?.details?.requirements as string} />
                </Box>
              </TabPanel>
              <TabPanel value='target-audiences'>
                <Box sx={{ py: 4 }}>
                  <Markdown children={course?.details?.targetAudiences as string} />
                </Box>
              </TabPanel>
              <TabPanel value='reviews'>Tab 4{/* <CourseDetailsReview product={product} /> */}</TabPanel>
            </TabContext>
          </Stack>
          {/* </Grid> */}

          {/* <Grid item xs={12} md={4}>
							{courses && <RelatedCourses courses={courses} />}
						</Grid> */}
          {/* </Grid> */}
        </Container>
      </RootStyle>
    </Page>
  );
}

import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// @mui
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
// components

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'become-an-instructor',
    component: <TabBecomeAnInstructor />,
  },
  {
    value: 'instructor-rules',
    component: <TabInstructorRules />,
  },
  {
    value: 'start-with-course',
    component: <TabStartWithCourse />,
  },
];

export default function InstructorRules() {
  const [currentTab, setCurrentTab] = useState('become-an-instructor');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setCurrentTab(tab);
  }, [searchParams]);

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <Stack>
      <Stack direction='row' justifyContent='center' sx={{ mb: 1 }}>
        <Tabs
          value={currentTab}
          onChange={(e, value) => handleChangeTab(value)}
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile
        >
          {TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              label={capitalCase(tab.value)}
            />
          ))}
        </Tabs>
      </Stack>

      {TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Stack>
  );
}

function TabBecomeAnInstructor() {
  return (
    <Box>
      <Typography variant='body1'>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy.
      </Typography>
    </Box>
  );
}
function TabInstructorRules() {
  return <Box>TabInstructorRules</Box>;
}
function TabStartWithCourse() {
  return <Box>TabStartWithCourse</Box>;
}

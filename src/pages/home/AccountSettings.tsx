import { useEffect, useState } from 'react';
import { capitalCase } from 'change-case';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// router
import { useSearchParams } from 'react-router-dom';
// components
import Iconify from '~/components/Iconify';
import Page from '~/components/Page';
// sections
import { AccountChangePassword, AccountGeneral } from '~/sections/my-account';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'general',
    icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
    component: <AccountGeneral />,
  },
  {
    value: 'change-password',
    icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
    component: <AccountChangePassword />,
  },
];

export default function AccountSettings() {
  const [currentTab, setCurrentTab] = useState<string>('general');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const existTab = ACCOUNT_TABS.find((item) => item.value === tab);
      if (existTab) setCurrentTab(existTab.value);
    }
  }, [searchParams]);

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <Page title='Account Settings'>
      <Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
        <Tabs
          value={currentTab}
          scrollButtons='auto'
          variant='scrollable'
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}


import React, { useState } from 'react';
import { Box, TabGroup, Tabs, Tab, TabPanels, TabPanel } from '@strapi/design-system';
import GeneralTab from '../../components/theme-settings/tabs/general-tab';
import ColorsTab from '../../components/theme-settings/tabs/colors-tab';
import LayoutTab from '../../components/theme-settings/tabs/layout-tab';
import ExperienceTab from '../../components/theme-settings/tabs/experience-tab';
import MembershipTab from '../../components/theme-settings/tabs/membership-tab';

const ThemeSettings = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box padding={4}>
      <TabGroup 
        label="Theme Settings" 
        id="tabs" 
        selectedIndex={selectedTab}
        onTabChange={setSelectedTab}
      >
        <Tabs>
          <Tab>General</Tab>
          <Tab>Colors</Tab>
          <Tab>Layout</Tab>
          <Tab>Experience</Tab>
          <Tab>Membership</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <GeneralTab />
          </TabPanel>
          <TabPanel>
            <ColorsTab />
          </TabPanel>
          <TabPanel>
            <LayoutTab />
          </TabPanel>
          <TabPanel>
            <ExperienceTab />
          </TabPanel>
          <TabPanel>
            <MembershipTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  );
};

export default ThemeSettings;

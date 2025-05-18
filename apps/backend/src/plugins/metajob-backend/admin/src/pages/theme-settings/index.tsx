
import React, { useState } from 'react';
import { Box, Flex, Typography } from '@strapi/design-system';
import ThemeSettingsTabs from '../../components/theme-settings/tabs';
import GeneralTab from '../../components/theme-settings/tabs/general-tab';
import StylesTab from '../../components/theme-settings/tabs/styles-tab';
import TypographyTab from '../../components/theme-settings/tabs/typography-tab';
import JobTypesTab from '../../components/theme-settings/tabs/job-types-tab';
import SkillsTab from '../../components/theme-settings/tabs/skills-tab';
import ExperienceTab from '../../components/theme-settings/tabs/experience-tab';
import MembershipTab from '../../components/theme-settings/tabs/membership-tab';

const ThemeSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab />;
      case 'styles':
        return <StylesTab />;
      case 'typography':
        return <TypographyTab />;
      case 'job-types':
        return <JobTypesTab />;
      case 'skills':
        return <SkillsTab />;
      case 'experience':
        return <ExperienceTab />;
      case 'membership':
        return <MembershipTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <Box padding={8}>
      <Typography variant="alpha">Theme Settings</Typography>
      <Box paddingTop={6}>
        <Flex>
          <Box background="neutral100" padding={4} style={{ minWidth: '200px' }}>
            <ThemeSettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </Box>
          <Box padding={4} style={{ flex: 1 }}>
            {renderTabContent()}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ThemeSettings;

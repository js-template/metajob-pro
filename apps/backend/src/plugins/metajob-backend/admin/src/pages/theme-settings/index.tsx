
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
import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Stack,
  TextInput,
  ToggleInput,
  Button,
  Layout,
  HeaderLayout,
  ContentLayout
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import pluginId from '../../pluginId';
import { ThemeSettings } from '../../types/theme-settings';

const ThemeSettingsPage = () => {
  const [settings, setSettings] = useState<ThemeSettings>({
    primary_color: '#000000',
    secondary_color: '#ffffff',
    font_family: 'Arial',
    is_dark_mode: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
  };

  return (
    <Layout>
      <HeaderLayout 
        title="Theme Settings" 
        subtitle="Customize your theme appearance"
        primaryAction={
          <Button startIcon={<Check />} onClick={handleSubmit}>
            Save
          </Button>
        }
      />
      <ContentLayout>
        <Box padding={8} background="neutral0">
          <Stack spacing={4}>
            <TextInput
              label="Primary Color"
              name="primary_color"
              value={settings.primary_color}
              onChange={e => setSettings({...settings, primary_color: e.target.value})}
              type="color"
            />
            <TextInput
              label="Secondary Color"
              name="secondary_color"
              value={settings.secondary_color}
              onChange={e => setSettings({...settings, secondary_color: e.target.value})}
              type="color"
            />
            <TextInput
              label="Font Family"
              name="font_family"
              value={settings.font_family}
              onChange={e => setSettings({...settings, font_family: e.target.value})}
            />
            <ToggleInput
              label="Dark Mode"
              name="is_dark_mode"
              onLabel="Enabled"
              offLabel="Disabled"
              checked={settings.is_dark_mode}
              onChange={e => setSettings({...settings, is_dark_mode: e.target.checked})}
            />
          </Stack>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default ThemeSettingsPage;

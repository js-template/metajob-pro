
import React from 'react';
import { Box, Typography } from '@strapi/design-system';

interface Tab {
  id: string;
  label: string;
}

interface ThemeSettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: 'general', label: 'General Settings' },
  { id: 'styles', label: 'Styles' },
  { id: 'typography', label: 'Typography' },
  { id: 'job-types', label: 'Job Types' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience Levels' },
  { id: 'membership', label: 'Membership' },
];

const ThemeSettingsTabs: React.FC<ThemeSettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Box>
      {tabs.map((tab) => (
        <Box
          key={tab.id}
          padding={4}
          background={activeTab === tab.id ? 'primary100' : 'transparent'}
          onClick={() => setActiveTab(tab.id)}
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="omega">{tab.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ThemeSettingsTabs;


import React, { useState, useEffect } from 'react';
import { Box, TextInput, Typography, Grid } from '@strapi/design-system';
import { request } from '@strapi/helper-plugin';

const GeneralTab = () => {
  const [settings, setSettings] = useState({
    siteTitle: '',
    tagLine: '',
    mainLogo: '',
    rentalLogo: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await request('/metajob-backend/settings/general', { method: 'GET' });
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    try {
      await request('/metajob-backend/settings/general', {
        method: 'POST',
        body: settings,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Box padding={4}>
      <Grid gap={4}>
        <Box>
          <Typography variant="delta">Site Identity</Typography>
          <Box paddingTop={4}>
            <TextInput
              label="Site Title"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={e => handleChange('siteTitle', e.target.value)}
            />
          </Box>
          <Box paddingTop={4}>
            <TextInput
              label="Tagline"
              name="tagLine"
              value={settings.tagLine}
              onChange={e => handleChange('tagLine', e.target.value)}
            />
          </Box>
        </Box>

        <Box paddingTop={4}>
          <Typography variant="delta">Logo Settings</Typography>
          <Box paddingTop={4}>
            <TextInput
              label="Main Logo URL"
              name="mainLogo"
              value={settings.mainLogo}
              onChange={e => handleChange('mainLogo', e.target.value)}
            />
          </Box>
          <Box paddingTop={4}>
            <TextInput
              label="Rental Logo URL"
              name="rentalLogo"
              value={settings.rentalLogo}
              onChange={e => handleChange('rentalLogo', e.target.value)}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default GeneralTab;

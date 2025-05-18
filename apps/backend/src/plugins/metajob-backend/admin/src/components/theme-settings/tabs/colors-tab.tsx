
import React, { useState, useEffect } from 'react';
import { Box, TextInput, Typography, Grid } from '@strapi/design-system';
import { request } from '@strapi/helper-plugin';

const ColorsTab = () => {
  const [colors, setColors] = useState({
    primary: '#1E40AF',
    secondary: '#1F2937',
    accent: '#059669',
    text: '#111827',
    background: '#FFFFFF',
  });

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const data = await request('/metajob-backend/settings/colors', { method: 'GET' });
      setColors(data);
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setColors({ ...colors, [key]: value });
  };

  const handleSave = async () => {
    try {
      await request('/metajob-backend/settings/colors', {
        method: 'POST',
        body: colors,
      });
    } catch (error) {
      console.error('Error saving colors:', error);
    }
  };

  return (
    <Box padding={4}>
      <Grid gap={4}>
        <Box>
          <Typography variant="delta">Brand Colors</Typography>
          <Box paddingTop={4} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TextInput
              label="Primary Color"
              name="primary"
              type="color"
              value={colors.primary}
              onChange={e => handleChange('primary', e.target.value)}
            />
            <TextInput
              label="Secondary Color"
              name="secondary"
              type="color"
              value={colors.secondary}
              onChange={e => handleChange('secondary', e.target.value)}
            />
            <TextInput
              label="Accent Color"
              name="accent"
              type="color"
              value={colors.accent}
              onChange={e => handleChange('accent', e.target.value)}
            />
          </Box>
        </Box>

        <Box paddingTop={4}>
          <Typography variant="delta">Text & Background</Typography>
          <Box paddingTop={4} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TextInput
              label="Text Color"
              name="text"
              type="color"
              value={colors.text}
              onChange={e => handleChange('text', e.target.value)}
            />
            <TextInput
              label="Background Color"
              name="background"
              type="color"
              value={colors.background}
              onChange={e => handleChange('background', e.target.value)}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default ColorsTab;

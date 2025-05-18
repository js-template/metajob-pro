
import React, { useState, useEffect } from 'react';
import { Box, Select, Option, Typography, Grid } from '@strapi/design-system';
import { request } from '@strapi/helper-plugin';

const LayoutTab = () => {
  const [layout, setLayout] = useState({
    headerStyle: 'default',
    footerStyle: 'default',
    sidebarPosition: 'right',
    containerWidth: 'wide',
  });

  useEffect(() => {
    loadLayout();
  }, []);

  const loadLayout = async () => {
    try {
      const data = await request('/metajob-backend/settings/layout', { method: 'GET' });
      setLayout(data);
    } catch (error) {
      console.error('Error loading layout:', error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setLayout({ ...layout, [key]: value });
  };

  const handleSave = async () => {
    try {
      await request('/metajob-backend/settings/layout', {
        method: 'POST',
        body: layout,
      });
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  };

  return (
    <Box padding={4}>
      <Grid gap={4}>
        <Box>
          <Typography variant="delta">Header & Footer</Typography>
          <Box paddingTop={4}>
            <Select
              label="Header Style"
              value={layout.headerStyle}
              onChange={value => handleChange('headerStyle', value)}
            >
              <Option value="default">Default</Option>
              <Option value="centered">Centered</Option>
              <Option value="minimal">Minimal</Option>
            </Select>
          </Box>
          <Box paddingTop={4}>
            <Select
              label="Footer Style"
              value={layout.footerStyle}
              onChange={value => handleChange('footerStyle', value)}
            >
              <Option value="default">Default</Option>
              <Option value="simple">Simple</Option>
              <Option value="widgets">With Widgets</Option>
            </Select>
          </Box>
        </Box>

        <Box paddingTop={4}>
          <Typography variant="delta">Content Layout</Typography>
          <Box paddingTop={4}>
            <Select
              label="Sidebar Position"
              value={layout.sidebarPosition}
              onChange={value => handleChange('sidebarPosition', value)}
            >
              <Option value="left">Left</Option>
              <Option value="right">Right</Option>
            </Select>
          </Box>
          <Box paddingTop={4}>
            <Select
              label="Container Width"
              value={layout.containerWidth}
              onChange={value => handleChange('containerWidth', value)}
            >
              <Option value="wide">Wide</Option>
              <Option value="boxed">Boxed</Option>
              <Option value="fluid">Fluid</Option>
            </Select>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default LayoutTab;

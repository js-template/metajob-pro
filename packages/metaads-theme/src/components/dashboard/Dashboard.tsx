
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { ListingCard } from '../listing-card';
import { CategoryList } from '../category/CategoryList';

interface DashboardProps {
  userListings: any[];
  favoriteListings: any[];
  recentCategories: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  userListings,
  favoriteListings,
  recentCategories,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            My Listings
          </Typography>
          <Grid container spacing={2}>
            {userListings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Favorite Listings
          </Typography>
          <Grid container spacing={2}>
            {favoriteListings.map((listing) => (
              <Grid item xs={12} sm={6} key={listing.id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Popular Categories
          </Typography>
          <CategoryList categories={recentCategories} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

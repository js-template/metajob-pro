
import React from 'react';
import { Box, Container, Grid, Typography, Button, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { formatCurrency } from '../../utils/format';

interface ListingDetailProps {
  listing: {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    condition: string;
    createdAt: string;
    category: {
      name: string;
    };
    location: {
      name: string;
    };
    seller: {
      username: string;
      email: string;
    };
  };
}

export const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative', height: 400, mb: 3 }}>
            <Image
              src={listing.images[0] || '/placeholder.jpg'}
              alt={listing.title}
              fill
              style={{ objectFit: 'cover', borderRadius: 8 }}
            />
          </Box>
          
          <Typography variant="h4" gutterBottom>
            {listing.title}
          </Typography>
          
          <Stack direction="row" spacing={2} mb={3}>
            <Chip label={listing.condition} />
            <Chip label={listing.category.name} />
            <Chip label={listing.location.name} />
            <Chip 
              label={formatDistance(new Date(listing.createdAt), new Date(), { addSuffix: true })}
            />
          </Stack>

          <Typography variant="h5" color="primary" gutterBottom>
            {formatCurrency(listing.price)}
          </Typography>

          <Typography variant="body1" paragraph>
            {listing.description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Seller Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              {listing.seller.username}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              href={`mailto:${listing.seller.email}`}
              sx={{ mt: 2 }}
            >
              Contact Seller
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListingDetail;


import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '../../utils/format';

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
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
  };
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link href={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, height: '100%' }}>
        <CardMedia
          component="div"
          sx={{ height: 200, position: 'relative' }}
        >
          <Image 
            src={listing.images[0] || '/placeholder.jpg'}
            alt={listing.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {listing.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {formatCurrency(listing.price)}
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip size="small" label={listing.condition} />
            <Chip size="small" label={listing.category.name} />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {listing.location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDistance(new Date(listing.createdAt), new Date(), { addSuffix: true })}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;

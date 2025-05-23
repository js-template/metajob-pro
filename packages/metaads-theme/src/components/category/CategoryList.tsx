
import React from 'react';
import { Grid, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  listingCount: number;
}

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <Link href={`/categories/${category.slug}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%', cursor: 'pointer' }}>
              <CardContent>
                <IconButton color="primary" sx={{ mb: 2 }}>
                  <Icon icon={category.icon} width={24} height={24} />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
                <Typography color="text.secondary">
                  {category.listingCount} listings
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;


import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  category: yup.string().required('Category is required'),
  condition: yup.string().required('Condition is required'),
  location: yup.string().required('Location is required'),
});

interface ListingFormProps {
  onSubmit: (values: any) => Promise<void>;
  categories: Array<{ id: string; name: string }>;
  locations: Array<{ id: string; name: string }>;
}

export const ListingForm: React.FC<ListingFormProps> = ({
  onSubmit,
  categories,
  locations,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      condition: '',
      location: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      images.forEach((image) => {
        formData.append('images', image);
      });
      await onSubmit(formData);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Listing
      </Typography>
      
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                id="condition"
                name="condition"
                value={formik.values.condition}
                onChange={formik.handleChange}
                error={formik.touched.condition && Boolean(formik.errors.condition)}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="like_new">Like New</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="images"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="images">
              <Button variant="outlined" component="span">
                Upload Images
              </Button>
            </label>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              {previews.map((preview, index) => (
                <Box
                  key={index}
                  sx={{ position: 'relative', width: 100, height: 100 }}
                >
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Create Listing
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ListingForm;

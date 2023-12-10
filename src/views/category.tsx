import React, { useState, useEffect } from 'react';

// mui
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

// custom component
import CustomCard from '../component/CustomCard.tsx';


// interface and ts type
import { reqCategoryList } from '../api/listenadmin/category';
import type { CategoryResponse } from "../api/listenadmin/category/type";

interface mappedData {
  coverUrl: string
  title: string
  description: string
  path: string
}

const Category: React.FC = () => {

  const [categoryData, setCategoryData] = useState<mappedData[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: CategoryResponse = await reqCategoryList();
        const mappedData = response.map(category => ({
          coverUrl: category.coverUrl,
          title: category.name.chinese,
          description: category.name.english,
          path: category.path
        }));
        setCategoryData(mappedData);
      } catch (error) {
        console.error('Error fetching category list:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: '20px', marginTop: '30px', margin: 'auto' }}>
    <Grid container spacing={3}>
      {categoryData.map((category, index) => (
        <Grid key={index} xs={6} md={2}>
          <CustomCard
            photo={category.coverUrl}
            title={category.title}
            description={category.description}
            to="/listen"
          />
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

export default Category

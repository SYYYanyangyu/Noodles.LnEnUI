import React, { useState, useEffect } from 'react';

// mui
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

// custom component
import CustomCard from '../component/CustomCard.tsx';

// 封面
import TED from '../assets/category/TED.webp';
import TOEFL from '../assets/category/TOEFL.webp';
import IELTS from '../assets/category/IELTS.jpg';
import Concept from '../assets/category/Concept.jpg';
import teenager from '../assets/category/teenager.webp';
import exam from '../assets/category/exam.webp';
import movie from '../assets/category/movie.webp';
import story from '../assets/category/story.png';
import code from '../assets/category/code.webp';

// interface and ts type
import { reqCategoryList } from '../api/listenadmin/category';
import type { CategoryResponse } from "../api/listenadmin/category/type";

const Category: React.FC = () => {

  const [categoryData, setCategoryData] = useState<mapModel[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: CategoryResponse = await reqCategoryList();
        
        console.log(response)

        const mappedData = response.map(category => ({
          coverUrl: category.coverUrl,
          title: category.name.chinese,
          description: category.name.english,
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

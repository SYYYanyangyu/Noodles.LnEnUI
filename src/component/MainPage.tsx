// HomePage.tsx

import React from 'react';

// mui
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

// custome component
import CustomCard from './CustomCard.tsx';

// images
import listenImage from '../assets/main/listen.png';
import vocabulary from '../assets/main/vocobulary.png';
import exam from '../assets/main/exammale.png';
import communication from '../assets/main/communicationcarton.png';


const HomePage: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', marginTop: '30px', margin :'auto'}}>
      <Grid container spacing={6}>

        <Grid xs={6} md={2}>
          <CustomCard photo={listenImage} title="听力练习" description="听力精炼" to="/listen" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo={vocabulary} title="单词练习" description="单词精炼" to="/vocabulary" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo={exam} title="考试练习" description="考试精炼" to="/exam" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo={communication} title="一对一辅导" description="一对一辅导" to="/tutoring" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo="https://d2g4kcs2g0r8f3.cloudfront.net/lrg_c86a70575200f95c6d186c27d4dc0d57.jpg" title="一对一辅导" description="一对一辅导" to="/listen" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo="https://d2g4kcs2g0r8f3.cloudfront.net/lrg_46ea26a448702a50bc469e1431a3cced.jpg" title="一对一辅导" description="一对一辅导" to="/listen" />
        </Grid>

        <Grid xs={6} md={2}>
          <CustomCard photo="https://d2g4kcs2g0r8f3.cloudfront.net/lrg_a0002f9cb7041b4ee1e12c8981f29a91.jpg" title="小程序" description="一对一辅导" to="/listen" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;


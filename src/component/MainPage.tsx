// MainPage.tsx
import React from 'react';
import { Box, Container, CssBaseline, Paper, Typography } from '@mui/material';

const MainPage: React.FC = () => {
  const squareStyles = {
    width: 'calc(33.33% - 8px)', // 33.33% 宽度，并留出一些间距
    marginBottom: '16px', // 底部间距
    paddingTop: '33.33%', // 使 div 具有正方形的纵横比
    background: '#2196f3', // 用你喜欢的颜色替换
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" flexWrap="wrap">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box key={index} width="calc(33.33% - 8px)" marginBottom="16px" marginRight="16px">
              <Paper elevation={3} sx={squareStyles}>
                <Typography align="center" variant="h6" color="white">
                  Square {index}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default MainPage;

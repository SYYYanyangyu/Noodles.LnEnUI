// MainPage.tsx
import React from 'react';
import { Box, Container, CssBaseline, Paper, Typography } from '@mui/material';

const MainPage: React.FC = () => {
  const squareStyles = {
    width: '100%',
    paddingTop: '100%', // 使 div 具有正方形的纵横比
    background: '#2196f3', // 用你喜欢的颜色替换
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {/* 正方形 1 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 1
            </Typography>
          </Paper>

          {/* 正方形 2 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 2
            </Typography>
          </Paper>

          {/* 正方形 3 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 3
            </Typography>
          </Paper>

          {/* 正方形 4 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 4
            </Typography>
          </Paper>

          {/* 正方形 5 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 5
            </Typography>
          </Paper>

          {/* 正方形 6 */}
          <Paper elevation={3} sx={squareStyles}>
            <Typography align="center" variant="h6" color="white">
              Square 6
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default MainPage;

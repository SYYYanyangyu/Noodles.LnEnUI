import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


// 假设这是你的电影数据类型定义
interface FilmOptionType {
  label: string;
  year: number;
}


// top100Films数组作为示例数据
const top100Films: FilmOptionType[] = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  // ...更多电影数据
];

export default function SearchInput() {
  // 假设top100Films是一个包含电影名的数组
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    // ...更多电影数据
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Button variant="contained" fullWidth>Hello world</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            sx={{ width: '100%' }} // 使用100%宽度以适应父容器
          />
        </Grid>
      </Grid>
    </Box>
  );
}
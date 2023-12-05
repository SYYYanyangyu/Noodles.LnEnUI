import React from 'react';
import { Input, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput: React.FC = () => {

  const handleSearch = () => {
    // 处理搜索事件的逻辑
    console.log('Search clicked!');
  };

  return (
    <Input
    placeholder="Search..."
    startAdornment={
      <InputAdornment position="start">
        <IconButton onMouseDown={handleSearch} edge="start">
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    }
    sx={{ flexGrow: 1, flexShrink: 0 }}
  />
  );
};

export default SearchInput;

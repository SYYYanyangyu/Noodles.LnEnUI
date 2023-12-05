// Navbar.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Input,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = () => {
    // 处理搜索事件的逻辑
    console.log('Search clicked!');
  };

  const menuItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          // 在手机端显示搜索框和菜单按钮
          <>
            <Input
              placeholder="language is information, and information is everything..."
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onMouseDown={handleSearch} edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
            />
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
              <List>
                {menuItems.map((text) => (
                  <ListItem button key={text} onClick={handleDrawerToggle}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          // 在桌面端显示搜索框和菜单按钮
          <>
            <Input
              placeholder="language is information, and information is everything..."
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onMouseDown={handleSearch} edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              sx={{ flexGrow: 1, flexShrink: 0 }}
            />
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Contact</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

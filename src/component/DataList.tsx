import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const MyAlbum: React.FC = () => {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemIcon>
            <FolderCopyIcon />
          </ListItemIcon>
          <ListItemText primary="文件夹1" />
        </ListItem>
        <Divider />
        {/* 继续添加其他文件夹 */}
      </List>
    </div>
  );
};

export default MyAlbum;
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem,ButtonGroup,Menu,IconButton} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SentenceProps {
  sentence: string;
}

const Sentence: React.FC<SentenceProps> = ({ sentence }) => {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 新增状态用于控制菜单显示与隐藏
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 新增状态用于设置菜单的位置
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleToggleExpanded = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(prevExpanded => !prevExpanded);
    setAnchorEl(event.currentTarget); // 设置菜单的位置为点击按钮的位置
    setMenuOpen(true); // 点击按钮后打开菜单
  };

  const handleClickMenuItem = (event: React.MouseEvent<HTMLLIElement>) => {
    setMenuOpen(false); // 点击菜单项后关闭菜单
    const action = event.currentTarget.dataset.action;
    
    switch (action) {
      case 'translate':
        setDialogOpen(true); // 打开Dialog
        break;
      case 'syntax':
        setDialogOpen(true); // 打开Dialog
        break;
      // Add more actions here
      default:
        break;
    }
  };
  const handleCloseMenu = () => {
    setMenuOpen(false); // 关闭菜单
  };

  const displayText = expanded ? sentence : sentence.split(' ').slice(0, 5).join(' ') + '...';

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          fontSize: '16px',
          lineHeight: '1.5',
          color: 'black',
          textAlign: 'center',
          wordBreak: 'break-all', // 使用word-break属性实现强制换行
        }}
      >
        {displayText}
      </span>
      {sentence.length > 5 && (
        <>
          <ButtonGroup variant="text">
            <IconButton onClick={handleToggleExpanded}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ButtonGroup>
          <Menu
            open={menuOpen} // 控制菜单的显示与隐藏
            onClose={handleCloseMenu}
            anchorEl={anchorEl} // 设置菜单的位置为anchorEl
            anchorOrigin={{
              vertical: 'bottom', // 将菜单放在展开按钮下方
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClickMenuItem} data-action="translate">
              Translate
            </MenuItem>
            <MenuItem onClick={handleClickMenuItem} data-action="syntax">
              Syntax analysis
            </MenuItem>
            {/* Add more menu items here */}
          </Menu>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{displayText}</DialogTitle>
            <DialogContent>
              {/* 根据菜单项显示对应的内容 */}
              {dialogOpen && (
                <>
                  {sentence === 'translate' && <div>Translate: {sentence}</div>}
                  {sentence === 'syntax' && <div>Syntax analysis: {sentence}</div>}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Sentence;
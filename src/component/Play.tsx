import React, { useState, useEffect } from 'react';
import '../App.css'
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
} from "@mui/material";
import {
  LightModeRounded,
  ComputerRounded,
  DarkModeRounded,
} from "@mui/icons-material";

import reactLogo from '../assets/react.svg'
import Player, { Track, PlayerInterface } from 'react-material-music-player'
import makeTheme from "../utils/makeTheme";
import { makeStyles } from '@mui/styles';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Paper, Box, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

// api and interface 
import type { EpisodeResponse, Sentence } from "../api/listenadmin/episode/type";

import type { SubscribeState } from '../model/subscribeState'

const useStyles = makeStyles({
  selected: {
    backgroundColor: '#4CAF50', // 设置选中状态的背景颜色
    color: '#FFFFFF', // 设置选中状态的文本颜色
  },
  unselected: {
    backgroundColor: '#CCCCCC', // 设置未选中状态的背景颜色
    color: '#000000', // 设置未选中状态的文本颜色
  },
});


function Sentence({ sentence }) {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? sentence : sentence.split(' ').slice(0, 5).join(' ') + '...';

  return (
    <>
      <span>{displayText}</span>
      {sentence.length > 5 && (
        <IconButton onClick={toggleExpanded}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      )}
      <br />
    </>
  );
}

const PlayerApp: React.FC<{ traceList: Track[], detialEpisode: EpisodeResponse }> = ({ traceList, detialEpisode }) => {
  const [mode, setMode] = useState("system");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [boxHeightScale , setHeightScale] = useState('vh');
  const classes = useStyles();

  const currentIndexRef = React.useRef(0); // 使用 ref 来存储 currentIndex 的值

  React.useEffect(() => {
    currentIndexRef.current = 0; // 初始化 currentIndex 的值
  }, []); // 只在组件挂载时执行一次

  PlayerInterface.subscribe((state: SubscribeState) => {
    if (state.mediaState === "PLAYING" && currentIndexRef.current !== state.currentTrack) {
      currentIndexRef.current = state.currentTrack; // 更新 currentIndexRef 的值
    }
  });

  PlayerInterface.setPlaylist(traceList);

  const theme = makeTheme(
    mode === "system" ? (isDark ? "dark" : "light") : mode
  );

  const handlePlagiarismClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsSelected(!isSelected);
    setOpen(true);
    if(boxHeightScale == '%'){
      setHeightScale('vh')
    }else{
      setHeightScale('%')
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [
    {
      width,
      position,
      bottom,
      boxShadow,
      borderRadiusTL,
      borderRadiusTR,
      borderRadiusBL,
      borderRadiusBR,
    }
  ] = useState({
    width: "90vw", // 调整宽度
    position: "fixed",
    bottom: 20, // 调整底部间距
    boxShadow: 4, // 调整阴影大小
    borderRadiusTL: 8, // 调整边框圆角
    borderRadiusTR: 8,
    borderRadiusBL: 0,
    borderRadiusBR: 0,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: `100${boxHeightScale}`,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
          textAlign: "center",
        }}
      >


        {isSelected ? (
          <Paper sx={{ maxHeight: '480px', overflow: 'auto', mt: 2 }}>
            <Box sx={{ p: 2 }}>
              {detialEpisode.sentences.map((sentence, index) => (
                <Sentence key={index} sentence={sentence.value} />
              ))}
            </Box>
          </Paper>
        ) : (
          <>
            <img src={reactLogo} className="App-logo" alt="logo" />
            <Box sx={{ typography: "h6" }}>Language is Infomation , and Infomation is Everything</Box>
          </>
        )}


        <ToggleButtonGroup
          value={mode}
          exclusive={true}
          onChange={(e, value) => {
            if (value) setMode(value);
          }}
          sx={{ marginTop: '20px' }}
        >
          <ToggleButton value={"light"}>
            <LightModeRounded />
          </ToggleButton>
          <ToggleButton value={"system"}>
            <ComputerRounded />
          </ToggleButton>
          <ToggleButton value={"dark"}>
            <DarkModeRounded />
          </ToggleButton>
          <ToggleButtonGroup value={isSelected ? "selected" : "unselected"}>
            <ToggleButton
              value={"plagiarism"}
              onClick={handlePlagiarismClick}
              className={isSelected ? classes.selected : classes.unselected}
            >
              {isSelected ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />}
            </ToggleButton>
          </ToggleButtonGroup>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose as any}
          >
            <MuiAlert onClose={handleClose} severity={isSelected ? 'success' : 'error'}>
              {isSelected ? '显示字幕' : '关闭字幕'}
            </MuiAlert>
          </Snackbar>
        </ToggleButtonGroup>

        <Player
          sx={{
            width: width,
            position: position,
            bottom: bottom,
            boxShadow: boxShadow,
            borderRadius: `${borderRadiusTL}px ${borderRadiusTR}px ${borderRadiusBL}px ${borderRadiusBR}px`,
          }}
        />
        
      </Box>
    </ThemeProvider>
  );
}

// wait 3 seconds
window.setTimeout(() =>
  // adds music at end of playlist
  PlayerInterface.playLater([
    new Track(
      "2",
      "http://radio-upyun.test.upcdn.net/images/category/backiee-205922.jpg",
      "All through the night",
      "Emerson",
      "https://music.163.com/song/media/outer/url?id=1969744125"
    ),
  ]),
  3000 // 3 seconds
);

// wait 6 seconds
window.setTimeout(() =>
  // add music after current track
  PlayerInterface.playNext([
    new Track(
      "3",
      "http://radio-upyun.test.upcdn.net/images/category/backiee-205922.jpg",
      "Ut queant laxis",
      "Guido von Arezzo",
      "https://music.163.com/song/media/outer/url?id=1441997419"
    ),
  ]),
  6000 // 6 seconds
);

export default PlayerApp;
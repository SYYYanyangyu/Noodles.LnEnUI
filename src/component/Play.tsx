import React, { useState, useEffect } from 'react';
import '../App.css'
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  Paper, Box
} from "@mui/material";
import {
  LightModeRounded,
  ComputerRounded,
  DarkModeRounded
} from "@mui/icons-material";

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import reactLogo from '../assets/react.svg'
import Player, { Track, PlayerInterface } from 'react-material-music-player'
import makeTheme from "../utils/makeTheme";
import { makeStyles } from '@mui/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// api and interface 
import type { EpisodeResponse, Sentence } from "../api/listenadmin/episode/type";
import type { SubscribeState } from '../model/subscribeState'

import SubTitle from './SubTitle';

const useStyles = makeStyles({
  selected: {
    backgroundColor: '#4CAF50', // 设置选中状态的背景颜色
    color: '#FFFFFF', // 设置选中状态的文本颜色
  },
  unselected: {
    backgroundColor: '#CCCCCC', // 设置未选中状态的背景颜色
    color: '#000000', // 设置未选中状态的文本颜色
  },
  globalClass: {
    // 添加你的样式规则
    position: 'static'
  },
});


const PlayerApp: React.FC<{ traceList: Track[], detialEpisode: EpisodeResponse }> = ({ traceList, detialEpisode }) => {
  PlayerInterface.setPlaylist(traceList);
  const [mode, setMode] = useState("system");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  // 是否开启字幕
  const [isSelected, setIsSelected] = useState(false);
  // 手机端用vh pc端用%
  const [boxHeightScale, setHeightScale] = useState('vh');
  // 信息提示
  const [showSnackbar, setShowSnackbar] = useState(false); // 添加一个state来控制Snackbar的显示和隐藏
  // 使用 ref 来存储 currentIndex 的值
  const currentIndexRef = React.useRef(0);
  // 设置当前的播放的字幕
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  // 样式
  const classes = useStyles();

  const theme = makeTheme(
    mode === "system" ? (isDark ? "dark" : "light") : mode
  );

  PlayerInterface.subscribe((state: SubscribeState) => {
    if (state.mediaState === "PLAYING" && currentIndexRef.current !== state.currentTrack) {
      currentIndexRef.current = state.currentTrack; // 更新 currentIndexRef 的值
    }

    // 当前播放时间
    var position = state.currentTime;
    var foundSentence = querySentence(position);
    if (foundSentence && !sentenceEqual(foundSentence, currentSentence!)) {
      // 将判断逻辑放在回调外面，如果满足条件，设置新的状态
      setCurrentSentence((prevSentence: any) => {
        // 在这里，prevSentence 代表前一个状态的值
        // 如果当前的状态与前一个状态不相等，返回新的状态，否则返回前一个状态
        if (!sentenceEqual(foundSentence!, prevSentence)) {
          console.log(foundSentence)
          return foundSentence;
        } else {
          return prevSentence;
        }
      });
    }
  });

  // 寻找当前播放的句子
  const querySentence = (position: number) => {
    const sentences = detialEpisode.sentences;
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i];
      if (position >= sentence.startTime && position <= sentence.endTime) {
        return sentence;
      }
    }
  };

  // 判断当前句子是否相等
  const sentenceEqual = (s1: Sentence, s2: Sentence) => {
    const floatEqual = (n1: number, n2: number) => {
      return Math.abs(n1 - n2) < 0.1
    };
    return (floatEqual(s1.startTime, s2.startTime) && s1.value == s2.value);
  }

  // 是否显示字幕
  const handlePlagiarismClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsSelected(!isSelected);
    setHeightScale(boxHeightScale === '%' ? 'vh' : '%');
    setShowSnackbar(true);
  };

  // 关闭提示
  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false); // 设置showSnackbar为false，关闭Snackbar
  };



  return (
    <div>
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
            position: isSelected ? 'static' : 'fixed', // Fix the screen when subtitles are displayed
            zIndex: isSelected ? 1000 : 1, // Set a higher z-index when subtitles are displayed
          }}
        >
          {isSelected ? (
            <Paper sx={{
              width: '80%',
              mt: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflowY: 'auto', // Enable scrolling
              maxHeight: '70vh'
            }}>
              {detialEpisode.sentences.map((sentence, index) => (
                <SubTitle key={index} sentence={sentence.value} />
              ))}
            </Paper>
          ) : (
            <>
              <img src={reactLogo} className="App-logo" alt="logo" />
              <Box sx={{ typography: "h6" }}>
                {currentSentence?.value && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Current Sentence:</p>
                    <p style={{ fontSize: '24px', margin: '10px' }}>{currentSentence.value}</p>
                  </div>
                )}
                Language is Information, and Information is Everything
              </Box>
            </>
          )}
          <div style={{ marginTop: '20px', zIndex: 2 }}>
            <ToggleButtonGroup
              value={mode}
              exclusive={true}
              onChange={(e, value) => {
                if (value) setMode(value);
              }}
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

              <ToggleButtonGroup>
                <ToggleButton
                  value={isSelected ? "selected" : "unselected"}
                  onClick={handlePlagiarismClick}
                  className={isSelected ? classes.selected : classes.unselected}
                  sx={{ position: 'relative', zIndex: 2 }} // Set a higher z-index
                >
                  {isSelected ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />}
                </ToggleButton>

              </ToggleButtonGroup>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={handleClose as any}
              >
                <MuiAlert onClose={handleClose} severity={isSelected ? 'success' : 'error'}>
                  {isSelected ? '显示字幕' : '关闭字幕'}
                </MuiAlert>
              </Snackbar>
            </ToggleButtonGroup>
          </div>
          <Player
            sx={{
              width: '90vw',
              position: 'fixed',
              bottom: 20,
              boxShadow: '4',
              borderRadius: `${8}px ${8}px ${0}px ${0}px`,
            }}
          />

        </Box>
      </ThemeProvider >
    </div>
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
      "https://music.163.com/song/media/outer/url?id=1969744125"
    ),
  ]),
  6000 // 6 seconds
);

export default PlayerApp;
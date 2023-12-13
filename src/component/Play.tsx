import React from 'react';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery
} from "@mui/material";
import {
  LightModeRounded,
  ComputerRounded,
  DarkModeRounded,
} from "@mui/icons-material";

// To use the player this is what you need to import
import Player, { Track, PlayerInterface } from 'react-material-music-player'
import makeTheme from "../utils/makeTheme";

function PlayerApp() {
  const [mode, setMode] = React.useState("system");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = makeTheme(
    mode === "system" ? (isDark ? "dark" : "light") : mode
  );

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
  ] = React.useState({
    width: "90vw", // 调整宽度
    position: "fixed",
    bottom: 16, // 调整底部间距
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
        height: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "text.primary",
        textAlign: "center",
      }}
    >
        <img src="https://mui.com/static/images/cards/live-from-space.jpg" className="App-logo" alt="logo" />
        <Box sx={{ typography: "h6" }}>react-material-music-player</Box>

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

// get media data over tthe internet
const TEST_MEDIA =
  "https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/";

// update playlist with test data and start play
PlayerInterface.setPlaylist([
  new Track(
    "1",
    TEST_MEDIA + "bach.jpg",
    "68 Choral",
    "Bach",
    "https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/"
  ),
  
]);

// wait 3 seconds
window.setTimeout(
  () =>
    // adds music at end of playlist
    PlayerInterface.playLater([
      new Track(
        "2",
        TEST_MEDIA + "emerson.jpeg",
        "All through the night",
        "Emerson",
        TEST_MEDIA +
          "Emerson%20--%20All%20through%20the%20Night%20(Ar%20Hyd%20y%20Nos).mp3"
      ),
    ]),
  3000 // 3 seconds
);

// wait 6 seconds
window.setTimeout(
  () =>
    // add music after current track
    PlayerInterface.playNext([
      new Track(
        "3",
        TEST_MEDIA + "guido.jpg",
        "Ut queant laxis",
        "Guido von Arezzo",
        "https://music.163.com/song/media/outer/url?id=1441997419"
      ),
    ]),
  6000 // 6 seconds
);

export default PlayerApp;
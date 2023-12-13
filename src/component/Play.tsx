import { APlayer, AudioInfo } from "aplayer-react";
import "aplayer-react/dist/index.css";
import React from "react";

type PlayerProps = {
  audioList: AudioInfo[];
}

const Player: React.FC<PlayerProps> = ({ audioList }) => {
  return (
    <APlayer
      audio={audioList}
      theme="auto"
    />
  )
}

export default Player;
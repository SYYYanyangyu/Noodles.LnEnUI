import Player, { Track, PlayerInterface } from 'react-material-music-player'

export interface SubscribeState {
    mediaState: string,
    playlist: Track[],
    currentTrack: number, // index
    shuffled: boolean,
    currentTime: number, // seconds
    timeLeft: number, // seconds
    volume: number, // min:0 max:100
    repeatMode: string
  }
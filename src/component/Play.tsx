import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, Slider } from 'antd';
import "aplayer-react/dist/index.css";
import { makeStyles } from '@mui/styles';
import { ReactComponent as IconPlay } from "../assets/play.svg";
import { ReactComponent as IconPause } from "../assets/pause.svg";

// api and interface 
import type { EpisodeResponse } from "../api/listenadmin/episode/type";

import { useLocation, useParams, useSearchParams } from 'react-router-dom';


import "./Play.scss";
import { useSyncExternalStore } from 'react';
import { formatAudioDuration } from '../utils/time';


// const PlayerApp: React.FC<{ traceList: Track[], detailEpisode: EpisodeResponse }> = ({ traceList, detailEpisode }) => {
const PlayerApp: React.FC<{ traceList: any[], detailEpisode: EpisodeResponse }> = ({ traceList, detailEpisode }) => {

  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSliderChange, setIsSliderChange] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [lyric, setLyric] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioRef = useRef<any>();
  const lyricContainerRef = useRef<any>();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // 禁止滚动
    lyricContainerRef.current?.addEventListener('mousewheel', (e: Event) => {
      e.preventDefault();
    })
  }, [])
  useEffect(() => {
    let arr = detailEpisode?.sentences;
    setLyric(arr);
    audioRef.current.src = searchParams.get("audioUrl");
  }, [detailEpisode?.sentences])
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? handleStop() : audioRef.current.play().then((res: any) => {
      // 返回成功 播放
      // setIsPlaying(true);
    }).catch((err: any) => {
      console.log(err);
      // 失败 不播放
      // setIsPlaying(false);
    });
  }
  const handleStop = () => {
    audioRef.current.pause()
  }
  // 由 currentTime 指定的时间更新。
  const timeUpData = (e: any) => {
    const currentTime = e.target.currentTime;
    if (!isSliderChange) {
      setCurrentTime(currentTime);
      setProgress(progress);
    }
    setCurrentTime(currentTime);
    const currentTimeUpData = e.target.currentTime;
    let curIndex = currentIndex != -1 ? currentIndex : 0;
    // 当前时间大于开始时间并且小于结束时间
    lyric?.forEach((item: { startTime: number; endTime: number; }, idx: number) => {
      if (currentTimeUpData > item.startTime && currentTimeUpData < item.endTime) {
        handleScroll(idx);
        setCurrentIndex(idx + 1);
      }
    })
  }
  const sliderChange = (e: any) => {
    audioRef.current.play();
    setIsPlaying(true);
    setProgress(e);
    setIsSliderChange(true);
    audioRef.current.currentTime = e;
  }
  const sliderChangeComplete = (e: any) => {
    setIsSliderChange(false);
  }
  // 处理歌曲播放结束
  const handleMusicEnded = () => { }

  const transformStyle = useMemo<React.CSSProperties>(() => {
    // let index = currentIndex ?? 0;
    return {
      // transform: `translateY(${-index * 30}px)`,
      // WebkitTransform: `translateY(${-index * 30}px)`,
    };
  }, [currentIndex]);

  const handleScroll = (index: number) => {
    lyricContainerRef.current.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
    const s = index * 30;
    setScroll(s);
  }
  return (
    <div>
      <Card style={{ padding: '50px 100px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div>
          <div className="title">原文</div>
          <div className="lyric_content" ref={lyricContainerRef} style={transformStyle}>
            {lyric?.length && lyric?.map((item: any, i: number) =>
              <div key={i} className='lyric_item_height' style={{ color: i == currentIndex - 1 ? 'red' : '' }}>
                {item.value}
              </div>)
            }</div>
        </div>
      </Card>
      <div className="play-control-bar">
        <div className='play-pic-container' onClick={() => handlePlay()}>
          <img src="http://radio-upyun.test.upcdn.net/images/category/backiee-205922.jpg" alt="" />
          <div className="play-state-icon">
            {isPlaying ? <IconPause /> : <IconPlay />}
          </div>
        </div>
        <div className="play-progress">
          <div className="play-title">{detailEpisode?.name?.chinese}</div>
          <div className="progress">
            <Slider defaultValue={30}
              value={progress}
              max={detailEpisode?.durationInSecond}
              tooltip={{
                open: false
              }}
              onChange={sliderChange}
              onChangeComplete={sliderChangeComplete}
            />
          </div>
        </div>
        <div className="paly-control-btn">
          <div className="time">
            <span className="now-time">{formatAudioDuration(currentTime)}</span>
            <span className="divider">/</span>
            <span className="duration">{formatAudioDuration(detailEpisode?.durationInSecond)}</span>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={e => timeUpData(e)}
        onEnded={e => handleMusicEnded()}
      />
    </div>
  );
}


export default PlayerApp;
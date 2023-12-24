import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card } from 'antd';
// import '../App.css' 
import { APlayer } from "aplayer-react";
import "aplayer-react/dist/index.css";
import { makeStyles } from '@mui/styles';

// api and interface 
import type { EpisodeResponse } from "../api/listenadmin/episode/type";



import "./Play.scss";
import { useSyncExternalStore } from 'react';
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


// const PlayerApp: React.FC<{ traceList: Track[], detailEpisode: EpisodeResponse }> = ({ traceList, detailEpisode }) => {
const PlayerApp: React.FC<{ traceList: any[], detailEpisode: EpisodeResponse }> = ({ traceList, detailEpisode }) => {
  console.log(traceList, detailEpisode, 11);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [lyric, setLyric] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioRef = useRef<any>();
  const lyricContainerRef = useRef<any>();
  useEffect(() => {
    // 禁止滚动
    lyricContainerRef.current?.addEventListener('mousewheel', (e: Event) => {
      e.preventDefault();
    })
  }, [])
  useEffect(() => {
    audioRef.current.src = 'http://radio-upyun.test.upcdn.net/test/2023/12/18/4f8ca524691306871ad9eca1826adbe0636aa063957cddc9d540c3d3cd2c8b3a/%E5%8E%86%E5%B9%B4%E7%9C%9F%E9%A2%98(%E4%B8%80).m4a';
    console.log(detailEpisode?.sentences)
    let arr = detailEpisode?.sentences;
    setLyric(arr);
  }, [detailEpisode?.sentences])
  const handlePlay = () => {
    audioRef.current.play().then((res: any) => {
      console.log(res, 1234);
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
  const handleTime = () => {
    audioRef.current.currentTime = 104;
  }
  // 由 currentTime 指定的时间更新。
  const timeUpData = (e: any) => {
    console.log(e);
    const currentTimeUpData = e.target.currentTime;
    let curIndex = currentIndex != -1 ? currentIndex : 0;
    let startTime = lyric?.[curIndex]?.startTime;
    let endTime = lyric?.[curIndex]?.endTime;
    console.log(startTime, 'startTime', endTime, curIndex, currentIndex, currentTimeUpData);
    // 当前时间大于开始时间并且小于结束时间
    if (endTime > currentTimeUpData && currentTimeUpData > startTime && currentIndex != null) {

      handleScroll();

      setCurrentIndex(curIndex + 1);
    }
  }
  const currentTime1 = useSyncExternalStore(
    useCallback(
      (onStoreChange: () => void) => {
        audioRef.current?.addEventListener("timeupdate", onStoreChange);

        return () => {
          audioRef.current?.removeEventListener(
            "timeupdate",
            onStoreChange
          );
        };
      },
      [audioRef]
    ),
    () => {
      if (!audioRef.current) {
        return undefined;
      }
      return Math.round(audioRef.current.currentTime);
    },
    () => undefined
  );
  // const timeUpdata = (e) => {
  //   const currentTimeUpdata = e.target.currentTime;
  //   if (!isChanging) {
  //     setCurrentTime(currentTimeUpdata * 1000);
  //     setProgress(currentTimeUpdata * 1000 / duration * 100);
  //   }
  //   // 获取歌词
  //   let i = 0;
  //   for ( ; i < lyricList.length; i++){
  //     let lyricItem = lyricList[i];
  //     if (currentTimeUpdata * 1000 < lyricItem.time) {
  //       break;
  //     }
  //   }
  //   if (currentLyricIndex !== i - 1) {
  //     dispatch(changeCurrentLyricIndexAction(i - 1));
  //     const content = lyricList[i - 1] && lyricList[i - 1].content;
  //     message.open({
  //       key: "lyric",
  //       content: content,
  //       duration: 0,
  //       className: "lyric-class"
  //     })
  //   }
  // }
  // 处理歌曲播放结束
  const handleMusicEnded = () => { }

  const transformStyle = useMemo<React.CSSProperties>(() => {
    // let index = currentIndex ?? 0;
    return {
      // transform: `translateY(${-index * 30}px)`,
      // WebkitTransform: `translateY(${-index * 30}px)`,
    };
  }, [currentIndex]);

  const handleScroll = () => {
    lyricContainerRef.current.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
    const s = scroll + 30;
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
      <Card >
        {/* <APlayer
          audio={{
            name: "Dancing with my phone",
            artist: "HYBS",
            url: "https://music.163.com/song/media/outer/url?id=1969744125",
          }}
          autoPlay
        /> */}
        <button onClick={() => handlePlay()}>播放</button>
        <button onClick={() => handleStop()}>暂停</button>
        <button onClick={() => handleTime()}>跳过开头</button>

        <audio controls
          ref={audioRef}
          onTimeUpdate={e => timeUpData(e)}
          onEnded={e => handleMusicEnded()}
        />
      </Card>

    </div>
  );
}


export default PlayerApp;
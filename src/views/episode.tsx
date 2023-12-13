import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type {AudioInfo}  from "aplayer-react";
import Player from '../component/Play';
import { useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { reqEpisodeInfo, reqEpisodeList } from '../api/listenadmin/episode';
import type { EpisodeResponse, Sentence } from "../api/listenadmin/episode/type";


const exampleList = [
    {
        name: "Dancing with my phone",
        artist: "HYBS",
        url: "https://music.163.com/song/media/outer/url?id=1969744125",
        cover: "https://mui.com/static/images/cards/live-from-space.jpg",
    },
    {
        name: "Dancing with my phone",
        artist: "HYBS",
        url: "https://music.163.com/song/media/outer/url?id=1441997419",
        cover: "https://mui.com/static/images/cards/live-from-space.jpg",
    },
];

const Play: React.FC = () => {
    const [episodeData, setEpisodeData] = useState<EpisodeResponse | null>(null);  // 获取字幕
    const [episodeListData, setEpisodeListData] = useState<EpisodeResponse[] | null>(null); // 同一目录下的所有episode
    const [showSubtitles, setShowSubtitles] = useState(false); // 控制显示字幕的状态
    const [audioList, setAudioList] = useState<AudioInfo[]>(exampleList);  // Updated audioList
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const audioUrl = searchParams.get('audioUrl');
    const episodeId = searchParams.get('id') as string | 'default';
    const name = searchParams.get('name');

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const episodeData: EpisodeResponse = await reqEpisodeInfo(episodeId);
                setEpisodeData(episodeData);

                // 同一目录下的所有episode
                const episodeListResult: EpisodeResponse[] = await reqEpisodeList(episodeData.albumId);
                setEpisodeListData(episodeListResult);

                // 根据 episodeId 查找对应的 audioUrl
                const audioUrl = episodeListResult.find((episode) => episode.id === episodeId)?.audioUrl;

                // 更新 audioList 的 Url
                if (audioUrl) {
                    const updatedAudioList: Array<AudioInfo> = episodeListResult.map((episode) => {
                        return {
                            name: episode.name.english,
                            artist: "",
                            url: episode.audioUrl,
                            cover: "https://mui.com/static/images/cards/live-from-space.jpg",
                        };
                    });

                    const targetIndex = updatedAudioList.findIndex(ss => ss.url == audioUrl); // 指定元素的索引
                    const targetElement = updatedAudioList.splice(targetIndex, 1)[0]; // 移除指定元素并保存
                    updatedAudioList.unshift(targetElement); // 将指定元素放到数组的首位
                    setAudioList(updatedAudioList);
                }

            } catch (error) {
                console.error('Error fetching album list:', error);
            }
        };
        fetchAlbumData();
    }, [episodeId]);

    const toggleSubtitles = () => {
        setShowSubtitles(!showSubtitles);
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {name}
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '500px' }}>
                        <Player key={audioUrl} audioList={audioList}/>
                    </Box>
                    <Button variant="outlined" onClick={toggleSubtitles} sx={{ mt: 2 }}>
                        {showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}
                    </Button>
                    <Collapse in={showSubtitles}>
                        <Paper sx={{ maxHeight: '500px', overflow: 'auto', mt: 2 }}>
                            <Box sx={{ p: 2 }}>
                                {episodeData?.sentences.map((sentence: Sentence, index) => (
                                    <span key={index}>
                                        {sentence.value}
                                        <br />
                                    </span>
                                ))}
                            </Box>
                        </Paper>
                    </Collapse>
                </CardContent>
            </Box>
        </Card>
    )
};

export default Play;
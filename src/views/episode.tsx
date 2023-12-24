import React, { useState, useEffect } from 'react';
import PlayerCusomer from '../component/Play.tsx';
import { useLocation } from 'react-router-dom';
import { Track, PlayerInterface } from 'react-material-music-player'
import { reqEpisodeInfo, reqEpisodeList } from '../api/listenadmin/episode';
import type { EpisodeResponse, Sentence } from "../api/listenadmin/episode/type";


const exampleList: Array<Track> = [
    new Track(
        "1",
        "Dancing with my phone",
        "HYBS",
        "https://music.163.com/song/media/outer/url?id=1969744125",
        "https://mui.com/static/images/cards/live-from-space.jpg",
    ),

    new Track(
        "2",
        "Dancing with my phone",
        "HYBS",
        "https://music.163.com/song/media/outer/url?id=1441997419",
        "https://mui.com/static/images/cards/live-from-space.jpg"
    )
];

const Play: React.FC = () => {
    const [episodeData, setEpisodeData] = useState<EpisodeResponse | null>(null);  // 获取字幕
    const [episodeListData, setEpisodeListData] = useState<EpisodeResponse[] | null>(null); // 同一目录下的所有episode
    const [audioList, setAudioList] = useState<Track[]>(exampleList);  // Updated audioList
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const episodeId = searchParams.get('id') as string | 'default';

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
                    let i = 1;
                    
                    const updatedAudioList: Array<Track> = episodeListResult.map((episode) => {
                        let customerId = 0;
                        if (audioUrl == episode.audioUrl) {
                            customerId = 1;
                        } else {
                            customerId = ++i;
                        }

                        return new Track(
                            `${customerId}`,
                            "http://radio-upyun.test.upcdn.net/images/category/backiee-205922.jpg",
                            episode.name.english,
                            "noodles",
                            episode.audioUrl
                        );
                    });

                    const targetIndex = updatedAudioList.findIndex(ss => ss.source == audioUrl); // 指定元素的索引
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

    return (
        <PlayerCusomer traceList={audioList} detailEpisode = {episodeData!} />
    )
};

export default Play;
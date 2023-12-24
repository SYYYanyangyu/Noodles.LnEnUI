//统一管理咱们项目用户相关的接口
import request from '../../../utils/request'

import type {
    EpisodeResponse,
} from './type'


enum API {
    EpisodeList_URL = '/Episode/FindByAlbumId/',
    Episode_URL = '/Episode/FindById/',
}


// episodeList
export const reqEpisodeList = (albumId: string) =>
    request.get<any, EpisodeResponse[]>(`${API.EpisodeList_URL}${albumId}`)

// episodeInfo
export const reqEpisodeInfo = (episodeId: string) =>
    request.get<any, EpisodeResponse>(`${API.Episode_URL}${episodeId}`)
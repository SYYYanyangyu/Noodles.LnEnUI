//统一管理咱们项目用户相关的接口
import request from '../../../utils/request'

import type {
    EpisodeResponse,
} from './type'


enum API {
    EpisodeList_URL = '/Listening.Main/Episode/FindByAlbumId/',
}


// episode
export const reqEpisodeList = (albumId:string) => 
    request.get<any, EpisodeResponse[]>(`${API.EpisodeList_URL}${albumId}`)
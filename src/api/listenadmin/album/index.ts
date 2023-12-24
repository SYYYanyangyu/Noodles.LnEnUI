//统一管理咱们项目用户相关的接口
import request from '../../../utils/request'

import type {
    AlbumResponse,
} from './type'


enum API {
    AlbumList_URL = '/Album/FindByCategoryId/',
}


// 目录
export const reqAlbumList = (categoryId: string) =>
    request.get<any, AlbumResponse[]>(`${API.AlbumList_URL}${categoryId}`)
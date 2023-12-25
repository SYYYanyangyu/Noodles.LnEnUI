//统一管理咱们项目用户相关的接口
import request from '../../../utils/request'

import type {
    CategoryResponse,
} from './type'


enum API {
    CategoryList_URL = '/Category/FindAll',
}


// 目录
export const reqCategoryList = () =>
    request.get<any, CategoryResponse>(API.CategoryList_URL)
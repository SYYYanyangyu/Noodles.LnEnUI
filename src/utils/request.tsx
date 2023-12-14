import axios, { AxiosResponse } from 'axios';
import { Alert } from '@mui/material';

const api = axios.create({
    baseURL: "http://localhost", //基础路径上会携带/api
    timeout: 15000, //超时的时间的设置
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    let message = '';

    switch (error.response?.status) {
      case 401:
        message = 'Token expired';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Request not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
        case 502:
            message = 'bad getway';
        break;
      default:
        message = error.message;
    }

    // 示例如下：
    <Alert severity="error">{message}</Alert>;

    return Promise.reject(error);
  }
);

export default api;
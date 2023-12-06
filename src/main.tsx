import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// 引入路由组件
import { RouterProvider } from "react-router-dom";

import router from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

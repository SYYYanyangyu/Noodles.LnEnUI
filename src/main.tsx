import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import Navbar from './component/Navbar.tsx'; // 导入导航栏组件

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar /> {/* 将导航栏组件放置在应用的顶部 */}
    <App />
  </React.StrictMode>,
)

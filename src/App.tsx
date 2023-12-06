
import React from 'react';

import MainPage from './component/MainPage.tsx'; // 确保路径正确
import Navbar from './component/Navbar.tsx'; // 导入导航栏组件
import Footer from './component/Footer.tsx'; // 导入导航栏组件

const App: React.FC = () => {
    return (
        <div>
            <Navbar /> {/* 将导航栏组件放置在应用的顶部 */}
            <MainPage />
            <Footer /> {/* 将页脚组件放置在应用的底部 */}
        </div>
    );
};

export default App;
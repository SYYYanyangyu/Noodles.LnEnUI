// HomePage.tsx

import React from 'react';
import CustomCard from './CustomCard.tsx';
import '../css/mainpage.css'; // 引入样式文件

// images
import listenImage from '../assets/main/listen.png';
import vocabulary from '../assets/main/vocobulary.png';
import exam from '../assets/main/exammale.png';
import communication from '../assets/main/communicationcarton.png';

const HomePage: React.FC = () => {
  
  return (
      <div className="card-container">
        <CustomCard photo={listenImage} title = "听力练习" description = "听力精炼"/>
        <CustomCard photo={vocabulary} title = "单词练习" description = "单词精炼"/>
        <CustomCard photo={exam} title = "考试练习" description = "考试精炼"/>
        <CustomCard photo={communication} title = "一对一辅导" description = "一对一辅导"/>
        <CustomCard photo="https://d2g4kcs2g0r8f3.cloudfront.net/lrg_c86a70575200f95c6d186c27d4dc0d57.jpg" title = "一对一辅导" description = "一对一辅导"/>
        <CustomCard photo="https://d2g4kcs2g0r8f3.cloudfront.net/lrg_46ea26a448702a50bc469e1431a3cced.jpg" title = "一对一辅导" description = "一对一辅导"/>
        <CustomCard photo="	https://d2g4kcs2g0r8f3.cloudfront.net/lrg_a0002f9cb7041b4ee1e12c8981f29a91.jpg" title = "小程序" description = "一对一辅导"/>
      </div>
  );
};

export default HomePage;


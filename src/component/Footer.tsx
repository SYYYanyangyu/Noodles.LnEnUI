import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(true);

  const footerStyle: React.CSSProperties = {
    position: isFooterFixed ? 'fixed' : 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#f8f9fa', // 浅灰色背景
    color: '#6c757d', // 深灰色文字
    padding: '1rem', // 增加一些内边距
    textAlign: 'center', // 文字居中
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1200px', // 内容的最大宽度
    margin: '0 auto', // 内容居中显示
    fontSize: '0.7rem', // 字体大小
  };

  // Function to determine if the footer should be fixed or relative
  const checkFooterPosition = () => {
    // Get the height of the document body and viewport
    const bodyHeight = document.body.offsetHeight;
    const viewportHeight = window.innerHeight;
    // Set the state based on whether body height is less than viewport height
    setIsFooterFixed(bodyHeight < viewportHeight);
  };

  useEffect(() => {
    // Run function on initial render
    checkFooterPosition();
    // Add event listener on window resize
    window.addEventListener('resize', checkFooterPosition);
    // Check footer position after each render
    const timerId = setInterval(checkFooterPosition, 100);
    // Cleanup interval and event listener on component unmount
    return () => {
      clearInterval(timerId);
      window.removeEventListener('resize', checkFooterPosition);
    };
  }, []);

  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        {/* 版权 & 个人信息 */}
        <p>&copy; {new Date().getFullYear()} Powered by Noodles on Docker.</p>
        <p>联系方式: Noodles.Syy@outlook.com</p>
        <p>github : https://github.com/SYYYanyangyu</p>
        {/* 这里可以添加你想展示的其他信息 */}
      </div>
    </footer>
  );
};

export default Footer;

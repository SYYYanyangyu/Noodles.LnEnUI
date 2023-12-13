import React from 'react';

interface EmojiProps {
  icon: string;
  className: string;
}

const Emoji: React.FC<EmojiProps> = ({ icon, className }) => (
  <span className={className}>{icon}</span>
);

function getRandomEmoji(): string {
  const emojis: string[] = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
    '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
    '🤡', '🥱', '🤕', '😤', '🧑‍🎓', '🧑‍💻', '👨‍👩‍👦‍👦'
    // 添加更多的 emoji 表情符号...
  ];

  const randomIndex: number = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

interface RandomEmojiProps {
  className: string;
}

const RandomEmoji: React.FC<RandomEmojiProps> = ({ className }) => {
  const randomEmoji: string = getRandomEmoji();
  return <Emoji icon={randomEmoji} className={className} />;
};

export default RandomEmoji
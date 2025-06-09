
import React from 'react';
import { Moon } from 'lucide-react';

const DarkModeToggle: React.FC = () => {
  return (
    <button
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
      onClick={() => {
        // ダークモード機能は未実装
        console.log('ダークモードボタンが押されました');
      }}
    >
      <Moon size={20} className="text-muted-foreground" />
    </button>
  );
};

export default DarkModeToggle;

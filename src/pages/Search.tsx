
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Item } from '../types';
import { Camera, Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'image' | 'voice'>('text');
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // ここで実際の検索ロジックを実装
    console.log('Searching for:', query);
  };

  const searchTabs = [
    { type: 'text' as const, label: 'テキスト', icon: SearchIcon },
    { type: 'image' as const, label: '画像', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* ヘッダー */}
      <div className="bg-card px-6 pt-12 pb-6 shadow-soft">
        <h1 className="text-2xl font-bold text-foreground mb-6">検索・発見</h1>
        
        {/* 検索タブ */}
        <div className="flex bg-primary/5 rounded-xl p-1 mb-6">
          {searchTabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setSearchType(tab.type)}
              className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-smooth ${
                searchType === tab.type
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              <tab.icon size={18} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 検索バー */}
        {searchType === 'text' && (
          <SearchBar 
            onSearch={handleSearch}
            placeholder="アイテム名、場所、タグで検索..."
          />
        )}

        {/* 画像検索 */}
        {searchType === 'image' && (
          <div className="space-y-4">
            <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5">
              <Camera className="mx-auto mb-4 text-primary" size={48} />
              <p className="text-foreground font-medium mb-2">写真で検索</p>
              <p className="text-muted-foreground text-sm mb-4">
                似たようなアイテムを探します
              </p>
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium transition-smooth hover:bg-primary/90">
                写真を撮る
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 検索結果 */}
      <div className="px-6 py-6">
        {searchQuery ? (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              "{searchQuery}" の検索結果
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl p-4 shadow-soft">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                        {item.images[0] ? (
                          <img 
                            src={item.images[0]} 
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-primary font-semibold text-lg">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-primary font-medium">📍 {item.location}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="text-muted-foreground" size={32} />
                </div>
                <p className="text-muted-foreground">該当するアイテムが見つかりません</p>
              </div>
            )}
          </div>
        ) : (
          /* 検索提案 */
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">よく検索されるアイテム</h2>
              <div className="flex flex-wrap gap-2">
                {['パスポート', '印鑑', '薬', '充電器', '保険証'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-primary/5 hover:border-primary/30 transition-smooth"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">カテゴリから探す</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: '重要書類', emoji: '📄' },
                  { name: '衣類', emoji: '👕' },
                  { name: '工具', emoji: '🔧' },
                  { name: '季節物', emoji: '🌸' },
                  { name: '電子機器', emoji: '📱' },
                  { name: 'キッチン用品', emoji: '🍳' }
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleSearch(category.name)}
                    className="bg-card p-4 rounded-xl shadow-soft hover:shadow-lg transition-smooth text-left"
                  >
                    <div className="text-2xl mb-2">{category.emoji}</div>
                    <div className="font-medium text-foreground">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

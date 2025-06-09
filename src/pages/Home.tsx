import React, { useState, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import ItemPin from '../components/ItemPin';
import QuickAccessCard from '../components/QuickAccessCard';
import DarkModeToggle from '../components/DarkModeToggle';
import NotificationCenter from '../components/NotificationCenter';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Item } from '../types';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const floorPlanRef = useRef<HTMLDivElement>(null);

  // サンプルデータ（期限管理と重要度を追加）
  const sampleItems: Item[] = [
    {
      id: '1',
      name: 'パスポート',
      category: 'documents',
      location: 'リビング 引き出し',
      room: 'living',
      images: [],
      tags: ['重要書類', '旅行'],
      coordinates: { x: 30, y: 40 },
      lastAccessed: new Date(),
      createdAt: new Date()
    },
    {
      id: '2',
      name: '冬用コート',
      category: 'clothing',
      location: 'クローゼット 上段',
      room: 'bedroom',
      images: [],
      tags: ['冬物', 'アウター'],
      coordinates: { x: 70, y: 25 },
      lastAccessed: new Date(),
      createdAt: new Date()
    },
    {
      id: '3',
      name: '工具セット',
      category: 'tools',
      location: 'ガレージ 棚',
      room: 'garage',
      images: [],
      tags: ['DIY', '修理'],
      coordinates: { x: 85, y: 60 },
      lastAccessed: new Date(),
      createdAt: new Date()
    }
  ];

  const recentItems = sampleItems.slice(0, 2);
  const frequentItems = sampleItems.slice(1, 3);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <div className="bg-card px-6 pt-12 pb-6 shadow-soft border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ホーム</h1>
            <p className="text-muted-foreground">家の中の物を見つけましょう</p>
          </div>
          <div className="flex items-center space-x-3">
            <NotificationCenter />
            <DarkModeToggle />
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 間取り図ビュー */}
      <div className="px-6 py-6">
        <div className="bg-card rounded-2xl p-4 shadow-soft mb-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">間取り図</h2>
            <button
              onClick={() => navigate('/floorplan')}
              className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
            >
              編集
            </button>
          </div>
          
          <Tabs defaultValue="1f" className="w-full">
            <TabsList className="grid w-full grid-cols-1 max-w-xs mb-4 bg-muted/50">
              <TabsTrigger 
                value="1f" 
                className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                1F
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="1f">
              <div 
                ref={floorPlanRef}
                className="relative w-full h-64 bg-secondary rounded-xl border-2 border-dashed border-primary/20 overflow-hidden"
              >
                {/* シンプルな間取り図の背景 */}
                <div className="absolute inset-4 border-2 border-primary/30 rounded-lg">
                  {/* リビングエリア */}
                  <div className="absolute top-4 left-4 w-1/2 h-1/2 border border-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">リビング</span>
                  </div>
                  {/* 寝室エリア */}
                  <div className="absolute top-4 right-4 w-2/5 h-1/2 border border-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">寝室</span>
                  </div>
                  {/* キッチンエリア */}
                  <div className="absolute bottom-4 left-4 w-1/3 h-2/5 border border-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">キッチン</span>
                  </div>
                </div>

                {/* アイテムピン */}
                {sampleItems.map((item) => (
                  <ItemPin
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                  />
                ))}

                {/* アイテムが少ない場合の案内 */}
                {sampleItems.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Plus className="text-primary" size={32} />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        最初のアイテムを登録しましょう
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* クイックアクセス */}
        <div className="space-y-4">
          <QuickAccessCard
            title="最近登録したアイテム"
            items={recentItems}
            onItemClick={handleItemClick}
          />
          
          <QuickAccessCard
            title="よく検索するアイテム"
            items={frequentItems}
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      {/* フローティングアクションボタン */}
      <button
        onClick={() => navigate('/add')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center transition-smooth hover:scale-105 z-40"
      >
        <Plus size={28} />
      </button>

      {/* アイテム詳細モーダル */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-soft border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {selectedItem.name}
            </h3>
            <p className="text-primary font-medium mb-4">
              📍 {selectedItem.location}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedItem.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-smooth hover:bg-primary/90"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

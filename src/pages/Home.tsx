
import React, { useState, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import ItemPin from '../components/ItemPin';
import QuickAccessCard from '../components/QuickAccessCard';
import NotificationCenter from '../components/NotificationCenter';
import DarkModeToggle from '../components/DarkModeToggle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Item } from '../types';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const floorPlanRef = useRef<HTMLDivElement>(null);

  // サンプルデータ（Figmaデザインに合わせてピン位置を調整）
  const sampleItems: Item[] = [
    {
      id: '1',
      name: 'パスポート',
      category: 'documents',
      location: 'リビング 引き出し',
      room: 'living',
      images: [],
      tags: ['重要書類', '旅行'],
      coordinates: { x: 50, y: 35 }, // 上部中央のピンク
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
      coordinates: { x: 50, y: 60 }, // 中央のティール
      lastAccessed: new Date(),
      createdAt: new Date()
    },
    {
      id: '3',
      name: '工具セット',
      category: 'tools',
      location: '玄関前',
      room: 'entrance',
      images: [],
      tags: ['DIY', '修理'],
      coordinates: { x: 30, y: 75 }, // 下部左のブルー
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
    <div className="min-h-screen bg-muted">
      {/* ヘッダー */}
      <div className="bg-card px-6 pt-12 pb-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ホーム</h1>
            <p className="text-muted-foreground">家の中の物を見つけましょう</p>
          </div>
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <NotificationCenter />
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 間取り図ビュー */}
      <div className="px-6 py-6">
        <div className="bg-card rounded-2xl p-4 shadow-soft mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">間取り図</h2>
            <button
              onClick={() => navigate('/floorplan')}
              className="text-primary text-sm font-medium hover:text-primary/80"
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
                className="relative w-full h-80 bg-warm-beige rounded-xl border-2 border-dashed border-primary/20 overflow-hidden"
              >
                {/* Figmaデザインに合わせた正方形に近い間取り図 */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                  {/* 外壁 - より正方形に近い形状 */}
                  <rect x="40" y="40" width="240" height="240" fill="none" stroke="#26A69A" strokeWidth="3"/>
                  
                  {/* 上部左の部屋 */}
                  <rect x="40" y="40" width="80" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="80" y="85" textAnchor="middle" className="text-xs fill-primary/60">寝室</text>
                  
                  {/* 上部右の部屋 */}
                  <rect x="120" y="40" width="80" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="160" y="85" textAnchor="middle" className="text-xs fill-primary/60">書斎</text>
                  
                  {/* 上部右端の部屋 */}
                  <rect x="200" y="40" width="80" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="240" y="85" textAnchor="middle" className="text-xs fill-primary/60">WIC</text>
                  
                  {/* 中央左の部屋（バス・トイレ） */}
                  <rect x="40" y="120" width="80" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="80" y="165" textAnchor="middle" className="text-xs fill-primary/60">水回り</text>
                  
                  {/* 中央のメインリビング */}
                  <rect x="120" y="120" width="160" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="200" y="165" textAnchor="middle" className="text-sm fill-primary/60">リビング</text>
                  
                  {/* 下部左の玄関 */}
                  <rect x="40" y="200" width="80" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="80" y="245" textAnchor="middle" className="text-xs fill-primary/60">玄関</text>
                  
                  {/* 下部右のキッチン */}
                  <rect x="120" y="200" width="160" height="80" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="200" y="245" textAnchor="middle" className="text-sm fill-primary/60">キッチン</text>
                  
                  {/* ドア表示 */}
                  <line x1="80" y1="200" x2="80" y2="220" stroke="#26A69A" strokeWidth="2"/>
                  <line x1="120" y1="160" x2="140" y2="160" stroke="#26A69A" strokeWidth="2"/>
                  <line x1="200" y1="120" x2="200" y2="140" stroke="#26A69A" strokeWidth="2"/>
                </svg>

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
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center transition-smooth hover:scale-105 z-40"
      >
        <Plus size={28} />
      </button>

      {/* アイテム詳細モーダル */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-soft"
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
              className="w-full py-3 bg-primary text-white rounded-xl font-medium transition-smooth hover:bg-primary/90"
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


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

  // サンプルデータ（ピン位置を間取り図に合わせて修正）
  const sampleItems: Item[] = [
    {
      id: '1',
      name: 'パスポート',
      category: 'documents',
      location: 'リビング 引き出し',
      room: 'living',
      images: [],
      tags: ['重要書類', '旅行'],
      coordinates: { x: 45, y: 65 }, // リビング内の適切な位置
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
      coordinates: { x: 38, y: 25 }, // 寝室内の適切な位置
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
      coordinates: { x: 25, y: 85 }, // ガレージ内の適切な位置
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
                {/* より現実的な間取り図（ガレージ付き） */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                  {/* 外壁 */}
                  <rect x="20" y="20" width="360" height="280" fill="none" stroke="#26A69A" strokeWidth="3"/>
                  
                  {/* 玄関 */}
                  <rect x="20" y="250" width="60" height="50" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="50" y="278" textAnchor="middle" className="text-xs fill-primary/60">玄関</text>
                  
                  {/* リビング・ダイニング */}
                  <rect x="80" y="160" width="180" height="140" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="170" y="235" textAnchor="middle" className="text-sm fill-primary/60">リビング</text>
                  
                  {/* キッチン */}
                  <rect x="260" y="200" width="120" height="100" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="320" y="255" textAnchor="middle" className="text-xs fill-primary/60">キッチン</text>
                  
                  {/* 寝室1 */}
                  <rect x="80" y="20" width="140" height="120" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="150" y="85" textAnchor="middle" className="text-sm fill-primary/60">寝室</text>
                  
                  {/* 寝室2/書斎 */}
                  <rect x="240" y="20" width="140" height="120" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="310" y="85" textAnchor="middle" className="text-xs fill-primary/60">書斎</text>
                  
                  {/* バスルーム */}
                  <rect x="20" y="160" width="60" height="70" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="50" y="200" textAnchor="middle" className="text-xs fill-primary/60">風呂</text>
                  
                  {/* トイレ */}
                  <rect x="20" y="120" width="60" height="40" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="50" y="145" textAnchor="middle" className="text-xs fill-primary/60">トイレ</text>
                  
                  {/* ガレージ */}
                  <rect x="20" y="60" width="60" height="60" fill="none" stroke="#26A69A" strokeWidth="2"/>
                  <text x="50" y="95" textAnchor="middle" className="text-xs fill-primary/60">ガレージ</text>
                  
                  {/* 廊下 */}
                  <rect x="80" y="140" width="140" height="20" fill="none" stroke="#26A69A" strokeWidth="1" strokeDasharray="3,3"/>
                  
                  {/* ドア表示 */}
                  <line x1="80" y1="250" x2="80" y2="270" stroke="#26A69A" strokeWidth="2"/>
                  <line x1="150" y1="160" x2="170" y2="160" stroke="#26A69A" strokeWidth="2"/>
                  <line x1="260" y1="230" x2="280" y2="230" stroke="#26A69A" strokeWidth="2"/>
                  <line x1="80" y1="90" x2="100" y2="90" stroke="#26A69A" strokeWidth="2"/>
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

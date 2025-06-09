
export interface SearchContext {
  [key: string]: string[];
}

export const searchContexts: SearchContext = {
  '旅行': ['パスポート', '薬', '充電器', '旅行用品', '保険証'],
  '旅行の準備': ['パスポート', '薬', '充電器', '旅行用品', '保険証'],
  '大掃除': ['掃除用具', '洗剤', '雑巾', 'ゴミ袋', '掃除機'],
  '確定申告': ['領収書', '通帳', '印鑑', '書類', '重要書類'],
  '冬支度': ['冬用コート', '暖房器具', '毛布', '冬物'],
  '夏支度': ['扇風機', '冷房器具', '夏物', '水着'],
  '料理': ['調理器具', 'キッチン用品', '調味料', '食器'],
  '修理': ['工具', '工具セット', 'ドライバー', 'ハンマー']
};

export const getContextualItems = (query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  
  for (const [context, items] of Object.entries(searchContexts)) {
    if (lowerQuery.includes(context.toLowerCase())) {
      return items;
    }
  }
  
  return [];
};

export const isContextualQuery = (query: string): boolean => {
  return getContextualItems(query).length > 0;
};

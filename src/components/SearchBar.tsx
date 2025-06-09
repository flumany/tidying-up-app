
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import VoiceSearchButton from './VoiceSearchButton';
import { getContextualItems, isContextualQuery } from '../utils/contextSearch';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "何をお探しですか？" 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    
    // 文脈検索の提案を表示
    if (isContextualQuery(newQuery)) {
      const contextItems = getContextualItems(newQuery);
      setSuggestions(contextItems.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleVoiceResult = (voiceQuery: string) => {
    setQuery(voiceQuery);
    onSearch(voiceQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={20} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-16 py-4 bg-card border border-border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth shadow-soft"
          />
          <VoiceSearchButton onVoiceResult={handleVoiceResult} />
        </div>
      </form>

      {/* 文脈検索の提案 */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="text-sm text-muted-foreground">関連アイテム:</p>
          </div>
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-smooth"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

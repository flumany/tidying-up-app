
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

interface VoiceSearchButtonProps {
  onVoiceResult: (query: string) => void;
}

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onVoiceResult }) => {
  const { isListening, startListening, stopListening, isSupported } = useVoiceSearch(onVoiceResult);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-smooth ${
        isListening 
          ? 'bg-accent text-white animate-pulse' 
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
    >
      {isListening ? (
        <MicOff size={20} />
      ) : (
        <Mic size={20} />
      )}
    </button>
  );
};

export default VoiceSearchButton;


import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceSearchHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export const useVoiceSearch = (onResult: (query: string) => void): VoiceSearchHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast({
        title: "音声認識未対応",
        description: "お使いのブラウザは音声認識に対応していません",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ja-JP';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('音声認識開始');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      onResult(result);
      console.log('音声認識結果:', result);
    };

    recognition.onerror = (event) => {
      console.error('音声認識エラー:', event.error);
      setIsListening(false);
      toast({
        title: "音声認識エラー",
        description: "音声を認識できませんでした。もう一度お試しください",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('音声認識終了');
    };

    recognition.start();
  }, [isSupported, onResult, toast]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  };
};

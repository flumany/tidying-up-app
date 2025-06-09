
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  type: 'move' | 'expiry' | 'important' | 'unused';
  message: string;
  timestamp: Date;
  itemId?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // 最新50件まで保持

    // トーストで即座に通知
    toast({
      title: getNotificationTitle(notification.type),
      description: notification.message,
    });
  }, [toast]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

const getNotificationTitle = (type: Notification['type']): string => {
  switch (type) {
    case 'move': return 'アイテム移動';
    case 'expiry': return '期限アラート';
    case 'important': return '重要アイテム';
    case 'unused': return '未使用アイテム';
    default: return '通知';
  }
};


import React from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification, clearAllNotifications } = useNotifications();

  return (
    <div className="relative">
      <button className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-smooth relative">
        <Bell className="text-primary" size={24} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length > 9 ? '9+' : notifications.length}
          </span>
        )}
      </button>
      
      {notifications.length > 0 && (
        <div className="absolute top-14 right-0 w-80 bg-card rounded-xl shadow-lg border border-border z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">通知</h3>
            <button
              onClick={clearAllNotifications}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              すべて削除
            </button>
          </div>
          
          <div className="space-y-2 p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 bg-muted/20 rounded-lg flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm text-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp.toLocaleTimeString('ja-JP')}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-muted-foreground hover:text-foreground ml-2"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

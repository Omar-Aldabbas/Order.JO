import { useEffect } from 'react';
import { toast } from 'sonner';
import echo from './echo';

export function NotificationsProvider({ children }) {
  useEffect(() => {
    echo.channel('couriers')
      .listen('NewOrderAvailable', (e) => {
        toast(`New order: #${e.order_id}`, { description: e.details || 'Check your dashboard' });
      });

    const userId = window.Laravel?.userId;
    if (userId) {
      echo.private(`user.${userId}`)
        .listen('OrderStatusUpdated', (e) => {
          toast(`Order #${e.order_id} is now ${e.status}`);
        });
    } else {
      console.warn('window.Laravel.userId is undefined. Skipping user channel subscription.');
    }

    return () => {
      echo.leaveChannel('couriers');
      if (userId) echo.leave(`user.${userId}`);
    };
  }, []);

  return children;
}

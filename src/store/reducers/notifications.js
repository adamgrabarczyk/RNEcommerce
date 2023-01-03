import {
  GET_NOTIFICATION,
  SET_NOTIFICATION,
  READ_NOTIFICATION,
} from '../actions/notifications';

const initialState = {
  notifications: [],
  unreadNotifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      const userNotification = action.notification;
      const unreadNotificationsFromServer = userNotification.filter(
        (item) => item.status !== 'read',
      );

      return {
        ...state,
        notifications: userNotification,
        unreadNotifications: unreadNotificationsFromServer,
      };

    case SET_NOTIFICATION:
      const notification = action.notification;

      const unreadNotifications = notification.filter(
        (item) => item.status !== 'read',
      );

      return {
        ...state,
        notifications: notification,
        unreadNotifications: unreadNotifications,
      };

    case READ_NOTIFICATION:
      const id = action.notification;

      const selectedNotification = state.notifications.find(
        (item) => item.date === id,
      );

      const updatedNotification = (selectedNotification.status = 'read');

      const unread = state.notifications.filter(
        (item) => item.status !== 'read',
      );

      return {
        ...state,
        unreadNotifications: unread,
      };
  }

  return state;
};

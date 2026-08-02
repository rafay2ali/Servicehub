import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../services/notificationService";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response =
        await getMyNotifications();

      setNotifications(
        response.notifications || []
      );
    } catch (error) {
      console.error(
        "Notification error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  const handleNotificationClick = async (
    notification
  ) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(
          notification._id
        );

        setNotifications((previous) =>
          previous.map((item) =>
            item._id === notification._id
              ? {
                  ...item,
                  isRead: true,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update notification"
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success(
        "All notifications marked as read"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to mark notifications as read"
      );
    }
  };

  const handleDeleteNotification = async (
    id
  ) => {
    try {
      await deleteNotification(id);

      setNotifications((previous) =>
        previous.filter(
          (notification) =>
            notification._id !== id
        )
      );

      toast.success(
        "Notification deleted"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete notification"
      );
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen(
            (previous) => !previous
          );

          if (!open) {
            fetchNotifications();
          }
        }}
        className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount > 9
              ? "9+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={
                  handleMarkAllAsRead
                }
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <CheckCheck size={16} />

                Mark all read
              </button>
            )}
          </div>

          {loading && (
            <div className="px-4 py-10 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          )}

          {!loading &&
            notifications.length === 0 && (
              <div className="px-4 py-10 text-center">
                <Bell
                  size={32}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm text-gray-500">
                  No notifications yet.
                </p>
              </div>
            )}

          {!loading &&
            notifications.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(
                  (notification) => (
                    <div
                      key={
                        notification._id
                      }
                      className={`flex gap-3 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 ${
                        !notification.isRead
                          ? "bg-blue-50"
                          : "bg-white"
                      }`}
                    >
                      <div
                        className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                          notification.isRead
                            ? "bg-gray-300"
                            : "bg-blue-600"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleNotificationClick(
                            notification
                          )
                        }
                        className="flex-1 text-left"
                      >
                        <p className="text-sm leading-5 text-gray-800">
                          {
                            notification.message
                          }
                        </p>

                        {notification.sender
                          ?.name && (
                          <p className="mt-1 text-xs text-gray-400">
                            From{" "}
                            {
                              notification
                                .sender
                                .name
                            }
                          </p>
                        )}

                        <p className="mt-1 text-xs text-gray-400">
                          {notification.createdAt
                            ? new Date(
                                notification.createdAt
                              ).toLocaleString()
                            : ""}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteNotification(
                            notification._id
                          )
                        }
                        className="self-start rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Delete notification"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
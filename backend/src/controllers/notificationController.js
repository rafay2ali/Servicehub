import Notification from "../models/Notification.js";


export const getMyNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({
        recipient: req.user._id,
      })
        .populate(
          "sender",
          "name email"
        )
        .populate(
          "booking",
          "bookingDate status totalPrice"
        )
        .populate(
          "service",
          "title price location"
        )
        .sort({
          createdAt: -1,
        });

    // Count unread notifications
    const unreadCount =
      await Notification.countDocuments({
        recipient: req.user._id,
        isRead: false,
      });

    res.status(200).json({
      message:
        "Notifications retrieved successfully",

      count: notifications.length,

      unreadCount,

      notifications,
    });
  } catch (error) {
    console.error(
      "Get notifications error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving notifications",
    });
  }
};

export const markNotificationAsRead = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const notification =
      await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        message:
          "Notification not found",
      });
    }

    if (
      notification.recipient.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to update this notification",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      message:
        "Notification marked as read",

      notification,
    });
  } catch (error) {
    console.error(
      "Mark notification read error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while updating notification",
    });
  }
};

export const markAllNotificationsAsRead = async (
  req,
  res
) => {
  try {
    await Notification.updateMany(
      {
        recipient: req.user._id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    res.status(200).json({
      message:
        "All notifications marked as read",
    });
  } catch (error) {
    console.error(
      "Mark all notifications read error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while updating notifications",
    });
  }
};

export const deleteNotification = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const notification =
      await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        message:
          "Notification not found",
      });
    }

    if (
      notification.recipient.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to delete this notification",
      });
    }

    await Notification.findByIdAndDelete(
      id
    );

    res.status(200).json({
      message:
        "Notification deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete notification error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while deleting notification",
    });
  }
};
import User from "../models/User.js";
import Service from "../models/Service.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.status(200).json({
      message:
        "Users retrieved successfully",

      count: users.length,

      users,
    });
  } catch (error) {
    console.error(
      "Get all users error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving users",
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user =
      await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    if (
      user._id.toString() ===
      req.user._id.toString()
    ) {
      return res.status(400).json({
        message:
          "Admin cannot delete their own account",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "User deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete user error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while deleting user",
    });
  }
};


export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email");

    res.status(200).json({
      message: "All services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error(
      "Admin get services error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving services",
    });
  }
};

export const deleteAnyService = async (req, res) => {
  try {
    const { id } = req.params;

    const service =
      await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "Service deleted successfully by admin",
    });
  } catch (error) {
    console.error(
      "Admin delete service error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while deleting service",
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email")
      .populate("provider", "name email")
      .populate(
        "service",
        "title description price location"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message:
        "All bookings retrieved successfully",

      count: bookings.length,

      bookings,
    });
  } catch (error) {
    console.error(
      "Admin get bookings error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving bookings",
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate(
        "customer",
        "name email"
      )
      .populate(
        "provider",
        "name email"
      )
      .populate(
        "booking",
        "bookingDate totalPrice status"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message:
        "All reviews retrieved successfully",

      count: reviews.length,

      reviews,
    });
  } catch (error) {
    console.error(
      "Admin get reviews error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving reviews",
    });
  }
};

export const deleteAnyReview = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    
    const review =
      await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found",
      });
    }

   
    await Review.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "Review deleted successfully by admin",
    });
  } catch (error) {
    console.error(
      "Admin delete review error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while deleting review",
    });
  }
};



export const getDashboardStats = async (
  req,
  res
) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalCustomers =
      await User.countDocuments({
        role: "customer",
      });

    const totalProviders =
      await User.countDocuments({
        role: "provider",
      });

    const totalAdmins =
      await User.countDocuments({
        role: "admin",
      });


    const totalServices =
      await Service.countDocuments();

    const activeServices =
      await Service.countDocuments({
        isAvailable: true,
      });

    const unavailableServices =
      await Service.countDocuments({
        isAvailable: false,
      });



    const totalBookings =
      await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "pending",
      });

    const acceptedBookings =
      await Booking.countDocuments({
        status: "accepted",
      });

    const completedBookings =
      await Booking.countDocuments({
        status: "completed",
      });

    const rejectedBookings =
      await Booking.countDocuments({
        status: "rejected",
      });

    const cancelledBookings =
      await Booking.countDocuments({
        status: "cancelled",
      });


    const totalReviews =
      await Review.countDocuments();


    const revenueResult =
      await Booking.aggregate([
        {
          $match: {
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      message:
        "Admin dashboard statistics retrieved successfully",

      statistics: {
        users: {
          total: totalUsers,
          customers: totalCustomers,
          providers: totalProviders,
          admins: totalAdmins,
        },

        services: {
          total: totalServices,
          active: activeServices,
          unavailable:
            unavailableServices,
        },

        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          accepted: acceptedBookings,
          completed:
            completedBookings,
          rejected:
            rejectedBookings,
          cancelled:
            cancelledBookings,
        },

        reviews: {
          total: totalReviews,
        },

        revenue: {
          total:
            totalRevenue,
        },
      },
    });

  } catch (error) {
    console.error(
      "Get dashboard statistics error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving dashboard statistics",
    });
  }
};



export const getDashboardAnalytics = async (
  req,
  res
) => {
  try {

    const monthlyBookings =
      await Booking.aggregate([
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
            },

            totalBookings: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);


    const monthlyRevenue =
      await Booking.aggregate([
        {
          $match: {
            status: "completed",
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
            },

            revenue: {
              $sum: "$totalPrice",
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    const topProviders =
      await Booking.aggregate([
        {
          $match: {
            status: "completed",
          },
        },

        {
          $group: {
            _id: "$provider",

            completedBookings: {
              $sum: 1,
            },

            totalRevenue: {
              $sum: "$totalPrice",
            },
          },
        },

        {
          $sort: {
            totalRevenue: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $lookup: {
            from: "users",

            localField: "_id",

            foreignField: "_id",

            as: "provider",
          },
        },

        {
          $unwind: "$provider",
        },

        {
          $project: {
            _id: 1,

            completedBookings: 1,

            totalRevenue: 1,

            "provider.name": 1,

            "provider.email": 1,
          },
        },
      ]);

    const popularServices =
      await Booking.aggregate([
        {
          $match: {
            status: {
              $in: [
                "pending",
                "accepted",
                "completed",
              ],
            },
          },
        },

        {
          $group: {
            _id: "$service",

            totalBookings: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            totalBookings: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $lookup: {
            from: "services",

            localField: "_id",

            foreignField: "_id",

            as: "service",
          },
        },

        {
          $unwind: "$service",
        },

        {
          $project: {
            _id: 1,

            totalBookings: 1,

            "service.title": 1,

            "service.category": 1,

            "service.price": 1,

            "service.location": 1,
          },
        },
      ]);


    const recentBookings =
      await Booking.find()
        .populate(
          "customer",
          "name email"
        )
        .populate(
          "provider",
          "name email"
        )
        .populate(
          "service",
          "title price"
        )
        .sort({
          createdAt: -1,
        })
        .limit(10);


    res.status(200).json({
      message:
        "Admin dashboard analytics retrieved successfully",

      analytics: {
        monthlyBookings,

        monthlyRevenue,

        topProviders,

        popularServices,

        recentBookings,
      },
    });

  } catch (error) {
    console.error(
      "Get dashboard analytics error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving dashboard analytics",
    });
  }
};
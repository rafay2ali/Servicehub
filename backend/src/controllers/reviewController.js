import mongoose from "mongoose";

import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const updateProviderRating = async (providerId) => {
  try {
    const reviews = await Review.find({
      provider: providerId,
    }).select("rating");

    const totalReviews = reviews.length;

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      totalReviews > 0
        ? Number(
            (totalRating / totalReviews).toFixed(1)
          )
        : 0;

    await User.findByIdAndUpdate(
      providerId,
      {
        averageRating,
        totalReviews,
      },
      {
        new: true,
      }
    );

    return {
      averageRating,
      totalReviews,
    };

  } catch (error) {
    console.error(
      "Update provider rating error:",
      error.message
    );

    throw error;
  }
};

export const createReview = async (req, res) => {
  try {

    const {
      booking,
      rating,
      comment,
    } = req.body;

    if (!booking) {
      return res.status(400).json({
        message: "Booking is required",
      });
    }

    if (
      rating === undefined ||
      rating === null
    ) {
      return res.status(400).json({
        message: "Rating is required",
      });
    }

    if (
      !comment ||
      !comment.trim()
    ) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        booking
      )
    ) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const numericRating =
      Number(rating);

    if (
      Number.isNaN(
        numericRating
      ) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5",
      });
    }

    if (
      !Number.isInteger(
        numericRating
      )
    ) {
      return res.status(400).json({
        message:
          "Rating must be a whole number between 1 and 5",
      });
    }

    const selectedBooking =
      await Booking.findById(
        booking
      );

    if (!selectedBooking) {
      return res.status(404).json({
        message:
          "Booking not found",
      });
    }

    if (
      !selectedBooking.customer ||
      selectedBooking.customer.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only review your own booking",
      });
    }

    if (
      !selectedBooking.provider
    ) {
      return res.status(400).json({
        message:
          "This booking has no assigned provider",
      });
    }

    if (
      selectedBooking.status !==
      "completed"
    ) {
      return res.status(400).json({
        message:
          "You can only review services after the booking is completed",
      });
    }

    const existingReview =
      await Review.findOne({
        booking:
          selectedBooking._id,
      });

    if (existingReview) {
      return res.status(400).json({
        message:
          "This booking has already been reviewed",
      });
    }

    const review =
      await Review.create({

        customer:
          req.user._id,

        provider:
          selectedBooking.provider,

        booking:
          selectedBooking._id,

        rating:
          numericRating,

        comment:
          comment.trim(),

      });

    const ratingSummary =
      await updateProviderRating(
        selectedBooking.provider
      );

    const populatedReview =
      await Review.findById(
        review._id
      )
        .populate(
          "customer",
          "name"
        )
        .populate(
          "provider",
          "name"
        )
        .populate(
          "booking",
          "bookingDate status"
        );

    return res.status(201).json({

      message:
        "Review created successfully",

      review:
        populatedReview,

      ratingSummary,

    });

  } catch (error) {

    console.error(
      "Create review error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Server error while creating review",
    });
  }
};

export const getProviderReviews = async (
  req,
  res
) => {

  try {

    const {
      providerId,
    } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        providerId
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid provider ID",
      });
    }

    const reviews =
      await Review.find({
        provider:
          providerId,
      })
        .populate(
          "customer",
          "name"
        )
        .populate(
          "booking",
          "bookingDate status"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    const totalReviews =
      reviews.length;

    const totalRating =
      reviews.reduce(
        (
          sum,
          review
        ) =>
          sum +
          review.rating,
        0
      );

    const averageRating =
      totalReviews > 0
        ? Number(
            (
              totalRating /
              totalReviews
            ).toFixed(1)
          )
        : 0;

    return res.status(200).json({

      message:
        "Provider reviews retrieved successfully",

      providerId,

      totalReviews,

      averageRating,

      reviews,

    });

  } catch (error) {

    console.error(
      "Get provider reviews error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Server error while retrieving reviews",
    });
  }
};

export const getMyReviews = async (
  req,
  res
) => {

  try {

    const reviews =
      await Review.find({
        customer:
          req.user._id,
      })
        .populate(
          "provider",
          "name email averageRating totalReviews"
        )
        .populate(
          "booking",
          "bookingDate status"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({

      message:
        "Your reviews retrieved successfully",

      count:
        reviews.length,

      reviews,

    });

  } catch (error) {

    console.error(
      "Get my reviews error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Server error while retrieving your reviews",
    });
  }
};

export const updateReview = async (
  req,
  res
) => {

  try {

    const {
      id,
    } = req.params;

    const {
      rating,
      comment,
    } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid review ID",
      });
    }

    if (
      rating === undefined &&
      comment === undefined
    ) {
      return res.status(400).json({
        message:
          "Rating or comment is required",
      });
    }

    const review =
      await Review.findById(
        id
      );

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found",
      });
    }

    if (
      review.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only update your own review",
      });
    }

    if (
      rating !== undefined
    ) {

      const numericRating =
        Number(rating);

      if (
        Number.isNaN(
          numericRating
        ) ||
        !Number.isInteger(
          numericRating
        ) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          message:
            "Rating must be a whole number between 1 and 5",
        });
      }

      review.rating =
        numericRating;

    }

    if (
      comment !== undefined
    ) {

      if (
        !comment ||
        !comment.trim()
      ) {
        return res.status(400).json({
          message:
            "Comment cannot be empty",
        });
      }

      review.comment =
        comment.trim();

    }

    await review.save();

    const ratingSummary =
      await updateProviderRating(
        review.provider
      );

    const updatedReview =
      await Review.findById(
        review._id
      )
        .populate(
          "customer",
          "name"
        )
        .populate(
          "provider",
          "name"
        )
        .populate(
          "booking",
          "bookingDate status"
        );

    return res.status(200).json({

      message:
        "Review updated successfully",

      review:
        updatedReview,

      ratingSummary,

    });

  } catch (error) {

    console.error(
      "Update review error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Server error while updating review",
    });
  }
};

export const deleteReview = async (
  req,
  res
) => {

  try {

    const {
      id,
    } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid review ID",
      });
    }

    const review =
      await Review.findById(
        id
      );

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found",
      });
    }

    const providerId =
      review.provider;

    if (
      req.user.role !== "admin" &&
      review.customer.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own reviews",
      });
    }

    await Review.findByIdAndDelete(
      id
    );

    const ratingSummary =
      await updateProviderRating(
        providerId
      );

    return res.status(200).json({

      message:
        "Review deleted successfully",

      ratingSummary,

    });

  } catch (error) {

    console.error(
      "Delete review error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Server error while deleting review",
    });
  }
};
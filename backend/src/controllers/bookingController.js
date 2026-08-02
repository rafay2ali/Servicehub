
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Notification from "../models/Notification.js";

export const createBooking = async (req, res) => {
  try {
    const {
      service,
      bookingDate,
      notes,
    } = req.body;


    if (!service || !bookingDate) {
      return res.status(400).json({
        message: "Service and booking date are required",
      });
    }

    const selectedDate = new Date(bookingDate);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid booking date",
      });
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Booking date cannot be in the past",
      });
    }

    const selectedService =
      await Service.findById(service);

    if (!selectedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }


    if (!selectedService.isAvailable) {
      return res.status(400).json({
        message:
          "This service is currently unavailable",
      });
    }


    if (!selectedService.provider) {
      return res.status(400).json({
        message:
          "This service has no assigned provider",
      });
    }

    const existingBooking =
      await Booking.findOne({
        service: selectedService._id,

        bookingDate: {
          $gte: selectedDate,
          $lt: new Date(
            selectedDate.getTime() +
              24 * 60 * 60 * 1000
          ),
        },

        status: {
          $in: [
            "pending",
            "accepted",
          ],
        },
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "This service is already booked for the selected date",
      });
    }


    const booking =
      await Booking.create({
        customer: req.user._id,

        service: selectedService._id,

        provider:
          selectedService.provider,

        bookingDate: selectedDate,

        totalPrice:
          selectedService.price,

        notes: notes || "",

        status: "pending",
      });

    await Notification.create({
      recipient:
        selectedService.provider,

      sender: req.user._id,

      message: `New booking received for ${selectedService.title}`,

      type: "booking",

      booking: booking._id,

      service: selectedService._id,
    });

    res.status(201).json({
      message:
        "Booking created successfully",

      booking,
    });

  } catch (error) {

    console.error(
      "Create booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while creating booking",
    });
  }
};

export const getMyBookings = async (
  req,
  res
) => {
  try {

    const bookings =
      await Booking.find({
        customer: req.user._id,
      })
        .populate(
          "service",
          "title description price location"
        )
        .populate(
          "provider",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      message:
        "Your bookings retrieved successfully",

      count: bookings.length,

      bookings,
    });

  } catch (error) {

    console.error(
      "Get my bookings error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving bookings",
    });
  }
};

export const getProviderBookings = async (
  req,
  res
) => {
  try {

    const bookings =
      await Booking.find({
        provider: req.user._id,
      })
        .populate(
          "customer",
          "name email"
        )
        .populate(
          "service",
          "title description price location"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      message:
        "Provider bookings retrieved successfully",

      count: bookings.length,

      bookings,
    });

  } catch (error) {

    console.error(
      "Get provider bookings error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while retrieving provider bookings",
    });
  }
};

export const acceptBooking = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.provider.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to accept this booking",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Only pending bookings can be accepted",
      });
    }

    booking.status = "accepted";

    await booking.save();

    await Notification.create({
      recipient:
        booking.customer,

      sender:
        req.user._id,

      message:
        "Your booking has been accepted by the service provider",

      type:
        "booking_accepted",

      booking:
        booking._id,

      service:
        booking.service,
    });

    res.status(200).json({
      message:
        "Booking accepted successfully",

      booking,
    });

  } catch (error) {

    console.error(
      "Accept booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while accepting booking",
    });
  }
};

export const rejectBooking = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }


    if (
      booking.provider.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to reject this booking",
      });
    }


    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Only pending bookings can be rejected",
      });
    }


    booking.status = "rejected";

    await booking.save();

    await Notification.create({
      recipient:
        booking.customer,

      sender:
        req.user._id,

      message:
        "Your booking has been rejected by the service provider",

      type:
        "booking_rejected",

      booking:
        booking._id,

      service:
        booking.service,
    });

    res.status(200).json({
      message:
        "Booking rejected successfully",

      booking,
    });

  } catch (error) {

    console.error(
      "Reject booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while rejecting booking",
    });
  }
};

export const completeBooking = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.provider.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to complete this booking",
      });
    }

    if (booking.status !== "accepted") {
      return res.status(400).json({
        message:
          "Only accepted bookings can be completed",
      });
    }

    booking.status = "completed";

    await booking.save();

    await Notification.create({
      recipient:
        booking.customer,

      sender:
        req.user._id,

      message:
        "Your service booking has been completed successfully",

      type:
        "booking_completed",

      booking:
        booking._id,

      service:
        booking.service,
    });

    res.status(200).json({
      message:
        "Booking completed successfully",

      booking,
    });

  } catch (error) {

    console.error(
      "Complete booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while completing booking",
    });
  }
};

export const cancelBooking = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to cancel this booking",
      });
    }

    if (
      booking.status !== "pending" &&
      booking.status !== "accepted"
    ) {
      return res.status(400).json({
        message:
          "This booking cannot be cancelled",
      });
    }


    booking.status = "cancelled";

    await booking.save();

    await Notification.create({
      recipient:
        booking.provider,

      sender:
        req.user._id,

      message:
        "A customer has cancelled the booking",

      type:
        "booking",

      booking:
        booking._id,

      service:
        booking.service,
    });

    res.status(200).json({
      message:
        "Booking cancelled successfully",

      booking,
    });

  } catch (error) {

    console.error(
      "Cancel booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Server error while cancelling booking",
    });
  }
};
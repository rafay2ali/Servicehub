import { useState } from "react";
import toast from "react-hot-toast";

import { createBooking } from "../../services/bookingService";

const BookingModal = ({
  service,
  onClose,
  onSuccess,
}) => {
  const [bookingDate, setBookingDate] =
    useState("");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] =
    useState(false);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate) {
      toast.error(
        "Please select a booking date"
      );

      return;
    }

    try {
      setLoading(true);

      await createBooking({
        service: service._id,
        bookingDate,
        notes,
      });

      toast.success(
        "Booking created successfully"
      );

      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (error) {
      console.error(
        "Create booking error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create booking"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">


        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-900">
            Book Service
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>

        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-4">

          <h3 className="font-semibold text-gray-900">
            {service.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {service.location}
          </p>

          <p className="mt-3 text-lg font-bold text-blue-600">
            ${service.price}
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Booking Date
            </label>

            <input
              type="date"
              min={today}
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Additional Notes
            </label>

            <textarea
              rows="4"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Add any special instructions..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Booking..."
                : "Confirm Booking"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BookingModal;

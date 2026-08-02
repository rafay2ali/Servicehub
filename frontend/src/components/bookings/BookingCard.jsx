import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiMapPin,
  FiCalendar,
  FiUser,
  FiMail,
  FiFileText,
  FiXCircle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiStar,
  FiMessageSquare,
} from "react-icons/fi";

import {
  cancelBooking,
} from "../../services/bookingService";

import ReviewModal from "../reviews/ReviewModal";


const BookingCard = ({
  booking,
  onBookingUpdated,
}) => {

  const [showReviewModal, setShowReviewModal] =
    useState(false);


  const handleCancel = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }


    try {

      await cancelBooking(
        booking._id
      );


      toast.success(
        "Booking cancelled successfully"
      );


      if (onBookingUpdated) {
        onBookingUpdated();
      }


    } catch (error) {

      console.error(
        "Cancel booking error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
          "Failed to cancel booking"
      );

    }
  };


  const handleReviewSuccess = () => {

    setShowReviewModal(false);


    toast.success(
      "Thank you for your review!"
    );


    if (onBookingUpdated) {
      onBookingUpdated();
    }
  };


  const getStatusConfig = () => {

    switch (booking.status) {

      case "pending":

        return {
          label: "Pending",

          className:
            "border-amber-200 bg-amber-50 text-amber-700",

          icon: FiClock,
        };


      case "accepted":

        return {
          label: "Accepted",

          className:
            "border-indigo-200 bg-indigo-50 text-indigo-700",

          icon: FiCheckCircle,
        };


      case "completed":

        return {
          label: "Completed",

          className:
            "border-emerald-200 bg-emerald-50 text-emerald-700",

          icon: FiCheckCircle,
        };


      case "rejected":

        return {
          label: "Rejected",

          className:
            "border-red-200 bg-red-50 text-red-700",

          icon: FiAlertCircle,
        };


      case "cancelled":

        return {
          label: "Cancelled",

          className:
            "border-slate-200 bg-slate-100 text-slate-600",

          icon: FiXCircle,
        };


      default:

        return {
          label: booking.status,

          className:
            "border-slate-200 bg-slate-100 text-slate-600",

          icon: FiAlertCircle,
        };
    }
  };


  const statusConfig =
    getStatusConfig();


  const StatusIcon =
    statusConfig.icon;


  return (

    <>

      <div
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-indigo-200
          hover:shadow-xl
        "
      >


        <div
          className="
            h-1
            bg-gradient-to-r
            from-indigo-500
            via-purple-500
            to-indigo-600
          "
        />


        <div className="p-6 sm:p-7">


          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >


            <div
              className="
                flex
                items-start
                gap-4
              "
            >


              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-50
                  text-xl
                  text-indigo-600
                  transition
                  group-hover:bg-indigo-100
                "
              >
                🛠️
              </div>


              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                    transition
                    group-hover:text-indigo-600
                  "
                >
                  {booking.service?.title ||
                    "Service"}
                </h3>


                <div
                  className="
                    mt-1.5
                    flex
                    items-center
                    gap-1.5
                    text-sm
                    text-slate-500
                  "
                >

                  <FiMapPin
                    className="shrink-0"
                  />

                  <span>
                    {booking.service?.location ||
                      "Location unavailable"}
                  </span>

                </div>

              </div>

            </div>


            <div
              className={`
                inline-flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-semibold
                ${statusConfig.className}
              `}
            >

              <StatusIcon
                className="text-sm"
              />

              {statusConfig.label}

            </div>

          </div>


          <div
            className="
              mt-6
              grid
              gap-4
              rounded-xl
              border
              border-slate-100
              bg-slate-50
              p-4
              sm:grid-cols-2
            "
          >


            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-indigo-600
                  shadow-sm
                "
              >
                <FiCalendar />
              </div>


              <div>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Booking Date
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  {booking.bookingDate
                    ? new Date(
                        booking.bookingDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>

            </div>


            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-purple-600
                  shadow-sm
                "
              >
                $
              </div>


              <div>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Total Price
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    font-bold
                    text-slate-900
                  "
                >
                  ${booking.totalPrice || 0}
                </p>

              </div>

            </div>

          </div>


          {booking.status === "rejected" && (

            <div
              className="
                mt-5
                flex
                gap-3
                rounded-xl
                border
                border-red-100
                bg-red-50
                p-4
              "
            >

              <FiAlertCircle
                className="
                  mt-0.5
                  shrink-0
                  text-red-500
                "
              />


              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-red-800
                  "
                >
                  Booking Rejected
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    leading-5
                    text-red-600
                  "
                >
                  Unfortunately, the provider rejected
                  this booking request.
                </p>

              </div>

            </div>

          )}


          {booking.status === "cancelled" && (

            <div
              className="
                mt-5
                flex
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >

              <FiXCircle
                className="
                  mt-0.5
                  shrink-0
                  text-slate-500
                "
              />


              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Booking Cancelled
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    leading-5
                    text-slate-500
                  "
                >
                  This booking has been cancelled
                  and is no longer active.
                </p>

              </div>

            </div>

          )}


          <div
            className="
              mt-6
              border-t
              border-slate-100
              pt-5
            "
          >

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Service Provider
            </p>


            <div
              className="
                mt-3
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-500
                  to-purple-600
                  text-sm
                  font-bold
                  text-white
                "
              >
                {booking.provider?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "P"}
              </div>


              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <FiUser
                    className="
                      text-sm
                      text-slate-400
                    "
                  />


                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    {booking.provider?.name ||
                      "Unknown Provider"}
                  </p>

                </div>


                {booking.provider?.email && (

                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <FiMail
                      className="
                        text-xs
                        text-slate-400
                      "
                    />


                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {booking.provider.email}
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>


          {booking.notes && (

            <div
              className="
                mt-5
                rounded-xl
                border
                border-indigo-100
                bg-indigo-50/50
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <FiFileText
                  className="text-indigo-500"
                />


                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-indigo-600
                  "
                >
                  Customer Notes
                </p>

              </div>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-600
                "
              >
                {booking.notes}
              </p>

            </div>

          )}


          {booking.status === "completed" && (

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-amber-100
                bg-gradient-to-br
                from-amber-50
                via-white
                to-orange-50
                p-5
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-100
                      text-xl
                      text-amber-500
                    "
                  >
                    <FiStar
                      className="fill-amber-400"
                    />
                  </div>


                  <div>

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                      "
                    >
                      How was your experience?
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      Your feedback helps other customers
                      find trusted service providers.
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowReviewModal(true)
                  }
                  className="
                    flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:from-indigo-700
                    hover:to-purple-700
                    hover:shadow-lg
                  "
                >

                  <FiMessageSquare />

                  Leave a Review

                </button>

              </div>

            </div>

          )}


          {(booking.status === "pending" ||
            booking.status === "accepted") && (

            <button
              onClick={handleCancel}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                transition-all
                duration-200
                hover:border-red-300
                hover:bg-red-50
                hover:text-red-700
              "
            >

              <FiXCircle />

              Cancel Booking

            </button>

          )}

        </div>

      </div>

      {showReviewModal && (

        <ReviewModal
          booking={booking}

          onClose={() =>
            setShowReviewModal(false)
          }

          onSuccess={
            handleReviewSuccess
          }
        />

      )}

    </>
  );
};


export default BookingCard;
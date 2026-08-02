import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiX,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";

import { createReview } from "../../services/reviewService";

const ReviewModal = ({
  booking,
  onClose,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        booking: booking._id,
        rating,
        comment: comment.trim(),
      });

      toast.success(
        "Review submitted successfully!"
      );

      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (error) {
      console.error(
        "Create review error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to submit review"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/70
        px-4
        py-5
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-md
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            h-1
            shrink-0
            bg-gradient-to-r
            from-indigo-500
            via-purple-500
            to-indigo-600
          "
        />

        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            border-b
            border-slate-100
            px-5
            py-4
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Leave a Review
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Share your experience with this provider.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close review modal"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              text-lg
              text-slate-400
              transition
              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-700
              disabled:cursor-not-allowed
            "
          >
            <FiX />
          </button>
        </div>

        <div
          className="
            overflow-y-auto
            px-5
            py-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-indigo-100
              bg-gradient-to-r
              from-indigo-50
              to-purple-50
              p-3
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
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                to-purple-600
                text-base
                font-bold
                text-white
              "
            >
              {booking.provider?.name
                ?.charAt(0)
                ?.toUpperCase() || "P"}
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-indigo-500
                "
              >
                Service Provider
              </p>

              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                {booking.provider?.name ||
                  "Service Provider"}
              </p>

              {booking.service?.title && (
                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {booking.service.title}
                </p>
              )}
            </div>
          </div>

          <div
            className="
              mt-5
              text-center
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              How was your experience?
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Tap a star to rate this service
            </p>

            <div
              className="
                mt-3
                flex
                justify-center
                gap-2
              "
              onMouseLeave={() =>
                setHoverRating(0)
              }
            >
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={loading}
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onClick={() =>
                      setRating(star)
                    }
                    aria-label={`${star} star rating`}
                    className="
                      rounded-lg
                      p-1
                      transition
                      duration-200
                      hover:scale-110
                      disabled:cursor-not-allowed
                    "
                  >
                    <FiStar
                      className={`
                        text-3xl
                        transition-colors
                        duration-200
                        ${
                          star <=
                          (hoverRating ||
                            rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }
                      `}
                    />
                  </button>
                )
              )}
            </div>

            <div
              className="
                mt-2
                h-5
                text-sm
                font-semibold
                text-indigo-600
              "
            >
              {rating === 1 &&
                "Poor"}
              {rating === 2 &&
                "Could be better"}
              {rating === 3 &&
                "Good"}
              {rating === 4 &&
                "Very Good"}
              {rating === 5 &&
                "Excellent!"}
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="reviewComment"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Your Review
            </label>

            <textarea
              id="reviewComment"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              disabled={loading}
              rows={4}
              maxLength={500}
              placeholder="Tell others about your experience with this provider..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                leading-6
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-indigo-500
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <div
              className="
                mt-1
                flex
                justify-end
              "
            >
              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                {comment.length}/500
              </span>
            </div>
          </div>

          <div
            className="
              mt-4
              flex
              gap-2.5
              rounded-xl
              border
              border-indigo-100
              bg-indigo-50/60
              p-3
            "
          >
            <FiCheckCircle
              className="
                mt-0.5
                shrink-0
                text-indigo-500
              "
            />

            <p
              className="
                text-xs
                leading-5
                text-slate-600
              "
            >
              Your review will appear on the
              provider's profile and help other
              customers make informed decisions.
            </p>
          </div>
        </div>

        <div
          className="
            flex
            shrink-0
            gap-3
            border-t
            border-slate-100
            bg-white
            px-5
            py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:border-slate-300
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              loading ||
              !rating ||
              !comment.trim()
            }
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:from-indigo-700
              hover:to-purple-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:translate-y-0
            "
          >
            {loading ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                Submitting...
              </>
            ) : (
              <>
                <FiCheckCircle />

                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
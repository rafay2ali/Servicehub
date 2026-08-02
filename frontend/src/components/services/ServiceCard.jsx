import { Link } from "react-router-dom";

import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  Star,
} from "lucide-react";

const ServiceCard = ({ service }) => {
  const serviceImage =
    service?.image ||
    (Array.isArray(service?.images)
      ? service.images[0]
      : "");

  const averageRating =
    Number(service?.averageRating) || 0;

  const totalReviews =
    Number(service?.totalReviews) || 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl hover:shadow-gray-200/60">

      <div className="relative h-56 overflow-hidden bg-gray-100">

        {serviceImage ? (
          <img
            src={serviceImage}
            alt={service?.title || "Service image"}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";

              const fallback =
                e.currentTarget.nextElementSibling;

              if (fallback) {
                fallback.classList.remove("hidden");
              }
            }}
          />
        ) : null}

        <div
          className={`${
            serviceImage ? "hidden" : "flex"
          } absolute inset-0 items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100`}
        >
          <div className="text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <Sparkles size={20} />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No image available
            </p>

          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4">

          <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
            {service?.category}
          </span>

        </div>

      </div>

      <div className="p-5 sm:p-6">

        <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-gray-900 transition group-hover:text-emerald-700">
          {service?.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
          {service?.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

          <MapPin
            size={16}
            className="shrink-0 text-emerald-600"
          />

          <span className="truncate">
            {service?.location}
          </span>

        </div>

        <div className="mt-4 flex items-center gap-2">

          {totalReviews > 0 ? (
            <>

              <div className="flex items-center gap-0.5">

                {Array.from({
                  length: 5,
                }).map((_, index) => {

                  const starNumber =
                    index + 1;

                  return (
                    <Star
                      key={starNumber}
                      size={16}
                      className={
                        starNumber <=
                        Math.round(
                          averageRating
                        )
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }
                    />
                  );

                })}

              </div>

              <span className="text-sm font-semibold text-gray-800">
                {averageRating.toFixed(1)}
              </span>

              <span className="text-sm text-gray-400">

                ({totalReviews}{" "}

                {totalReviews === 1
                  ? "review"
                  : "reviews"})

              </span>

            </>
          ) : (

            <div className="flex items-center gap-2 text-sm text-gray-400">

              <div className="flex items-center gap-0.5">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <Star
                    key={index}
                    size={15}
                    className="text-gray-300"
                  />

                ))}

              </div>

              <span>
                No reviews yet
              </span>

            </div>

          )}

        </div>

        <div className="my-5 h-px bg-gray-100" />

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Starting from
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              ${service?.price}
            </p>

          </div>

          <Link
            to={`/services/${service?._id}`}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-700"
          >

            View Details

            <ArrowUpRight
              size={16}
              className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />

          </Link>

        </div>

      </div>

    </article>
  );
};

export default ServiceCard;
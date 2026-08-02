import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Search,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getMyBookings,
} from "../../services/bookingService";

import BookingCard from "../../components/bookings/BookingCard";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(
    async () => {
      try {
        setLoading(true);

        const response = await getMyBookings();

        setBookings(response.bookings || []);
      } catch (error) {
        console.error(
          "Customer bookings error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

    const accepted = bookings.filter(
      (booking) =>
        booking.status === "accepted"
    ).length;

    const completed = bookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

    const cancelled = bookings.filter(
      (booking) =>
        booking.status === "cancelled"
    ).length;

    return {
      pending,
      accepted,
      completed,
      cancelled,
    };
  }, [bookings]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7faf9]">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          </div>

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <LayoutDashboard size={16} />

            <span>
              Dashboard
            </span>

            <span>
              /
            </span>

            <span className="text-emerald-400">
              My Bookings
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <Sparkles size={14} />

                Customer Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Manage your
                <span className="text-emerald-400">
                  {" "}services.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Keep track of your bookings,
                appointments, and service
                requests all in one place.
              </p>
            </div>

            <Link
              to="/services"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              <Search size={18} />

              Browse Services

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Booking Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick look at your service activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Bookings
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                  {bookings.length}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition group-hover:bg-gray-950 group-hover:text-white">
                <CalendarDays size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              All your service requests
            </p>
          </div>

          <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-amber-600">
                  {stats.pending}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Waiting for provider response
            </p>
          </div>

          <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-emerald-600">
                  {stats.accepted}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Accepted service bookings
            </p>
          </div>

          <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-blue-600">
                  {stats.completed}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Successfully completed
            </p>
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="mt-10 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold text-gray-950">
                  Booking Status
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Track the current state of your requests.
                </p>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Find another service

                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="flex h-full">
                {stats.completed > 0 && (
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${
                        (stats.completed /
                          bookings.length) *
                        100
                      }%`,
                    }}
                  />
                )}

                {stats.accepted > 0 && (
                  <div
                    className="bg-emerald-500"
                    style={{
                      width: `${
                        (stats.accepted /
                          bookings.length) *
                        100
                      }%`,
                    }}
                  />
                )}

                {stats.pending > 0 && (
                  <div
                    className="bg-amber-400"
                    style={{
                      width: `${
                        (stats.pending /
                          bookings.length) *
                        100
                      }%`,
                    }}
                  />
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />

                <span className="text-xs text-gray-500">
                  Pending:{" "}
                  <strong className="text-gray-900">
                    {stats.pending}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-xs text-gray-500">
                  Active:{" "}
                  <strong className="text-gray-900">
                    {stats.accepted}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                <span className="text-xs text-gray-500">
                  Completed:{" "}
                  <strong className="text-gray-900">
                    {stats.completed}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />

                <span className="text-xs text-gray-500">
                  Cancelled:{" "}
                  <strong className="text-gray-900">
                    {stats.cancelled}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                My Bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View and manage your service bookings.
              </p>
            </div>

            {bookings.length > 0 && (
              <span className="w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                {bookings.length}{" "}
                {bookings.length === 1
                  ? "Booking"
                  : "Bookings"}
              </span>
            )}
          </div>

          {bookings.length === 0 ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CalendarDays size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-950">
                No bookings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                You haven't booked any services yet.
                Explore our marketplace and find the
                right professional for your needs.
              </p>

              <Link
                to="/services"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-emerald-600"
              >
                <Search size={17} />

                Explore Services

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {bookings.map(
                (booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onBookingUpdated={
                      fetchBookings
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
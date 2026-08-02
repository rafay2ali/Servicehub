import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Settings2,
  ArrowRight,
  UserRound,
  Mail,
  MapPin,
  CircleDollarSign,
  XCircle,
  Loader2,
  PackageCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllServices,
} from "../../services/serviceService";

import {
  getProviderBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
} from "../../services/bookingService";

const ProviderDashboard = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);


  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const bookingResponse =
        await getProviderBookings();

      setBookings(
        bookingResponse.bookings || []
      );

      const serviceResponse =
        await getAllServices();

      const allServices =
        serviceResponse.services || [];

      const currentUserId =
        user?._id || user?.id;

      const providerServices =
        allServices.filter(
          (service) => {

            const providerId =
              service.provider?._id ||
              service.provider?.id ||
              service.provider;

            return (
              providerId?.toString() ===
              currentUserId?.toString()
            );
          }
        );

      setServices(providerServices);

    } catch (error) {

      console.error(
        "Provider dashboard error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (user?._id || user?.id) {
      fetchDashboardData();
    }

  }, [user]);


  const handleAcceptBooking = async (
    bookingId
  ) => {

    try {

      setActionLoading(bookingId);

      await acceptBooking(
        bookingId
      );

      toast.success(
        "Booking accepted successfully"
      );

      await fetchDashboardData();

    } catch (error) {

      console.error(
        "Accept booking error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to accept booking"
      );

    } finally {

      setActionLoading(null);

    }
  };

  const handleRejectBooking = async (
    bookingId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to reject this booking?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setActionLoading(bookingId);

      await rejectBooking(
        bookingId
      );

      toast.success(
        "Booking rejected successfully"
      );

      await fetchDashboardData();

    } catch (error) {

      console.error(
        "Reject booking error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to reject booking"
      );

    } finally {

      setActionLoading(null);

    }
  };

  const handleCompleteBooking = async (
    bookingId
  ) => {

    const confirmed =
      window.confirm(
        "Mark this booking as completed?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setActionLoading(bookingId);

      await completeBooking(
        bookingId
      );

      toast.success(
        "Booking marked as completed"
      );

      await fetchDashboardData();

    } catch (error) {

      console.error(
        "Complete booking error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to complete booking"
      );

    } finally {

      setActionLoading(null);

    }
  };

  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

  const acceptedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "accepted"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;


  const recentBookings =
    bookings.slice(0, 5);


  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">

            <Loader2
              className="h-7 w-7 animate-spin text-emerald-600"
            />

          </div>

          <p className="mt-4 font-medium text-gray-600">
            Loading provider dashboard...
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Please wait a moment
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">

      <section className="relative overflow-hidden bg-gray-950 px-6 py-14 text-white">


        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">

              <BriefcaseBusiness className="h-4 w-4" />

              Provider Workspace

            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

              Welcome back
              {user?.name
                ? `, ${user.name}`
                : ""}

            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">

              Manage your services, handle customer requests,
              and keep track of your bookings from one place.

            </p>

          </div>


          <Link
            to="/services/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >

            <Plus className="h-5 w-5" />

            Add New Service

          </Link>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          <StatCard
            title="Total Services"
            value={services.length}
            icon={BriefcaseBusiness}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />


          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={CalendarDays}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />


          <StatCard
            title="Pending Requests"
            value={pendingBookings}
            icon={Clock3}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />


          <StatCard
            title="Completed"
            value={completedBookings}
            icon={CheckCircle2}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />

        </div>


        <div className="mt-5 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">

              <PackageCheck className="h-5 w-5" />

            </div>

            <div>

              <p className="text-sm font-medium text-gray-600">
                Active Accepted Bookings
              </p>

              <p className="text-xs text-gray-500">
                Currently confirmed customer requests
              </p>

            </div>

          </div>

          <span className="text-2xl font-bold text-emerald-700">
            {acceptedBookings}
          </span>

        </div>


        <section className="mt-12">

          <div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-gray-500">
              Manage your services and provider workspace.
            </p>

          </div>


          <div className="mt-6 grid gap-5 md:grid-cols-2">


            <Link
              to="/services/create"
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-50 transition duration-300 group-hover:scale-150" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                  <Plus className="h-6 w-6" />

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-gray-900">
                      Add New Service
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                      Create and publish a new service so customers can discover and book your expertise.
                    </p>

                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />

                </div>

              </div>

            </Link>

            <Link
              to="/provider/services"
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 transition duration-300 group-hover:scale-150" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                  <Settings2 className="h-6 w-6" />

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-gray-900">
                      Manage Services
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                      View your listed services and manage your provider offerings.
                    </p>

                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />

                </div>

              </div>

            </Link>

          </div>

        </section>


        <section className="mt-12">


          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Recent Bookings
              </h2>

              <p className="mt-1 text-gray-500">
                Review customer requests and manage your latest bookings.
              </p>

            </div>


            <Link
              to="/provider/bookings"
              className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition hover:text-emerald-700"
            >

              View All

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

          {recentBookings.length === 0 && (

            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">

                <CalendarDays className="h-7 w-7" />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No Bookings Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Customer booking requests will appear here once someone books one of your services.
              </p>

            </div>

          )}

          {recentBookings.length > 0 && (

            <div className="mt-6 space-y-4">

              {recentBookings.map(
                (booking) => {

                  const isActionLoading =
                    actionLoading ===
                    booking._id;

                  return (

                    <div
                      key={booking._id}
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:border-emerald-100 hover:shadow-md"
                    >

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">



                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-lg font-bold text-gray-900">
                              {booking.service?.title ||
                                "Service Booking"}
                            </h3>

                            <StatusBadge
                              status={booking.status}
                            />

                          </div>


                          <div className="mt-4 grid gap-3 sm:grid-cols-2">

                            <InfoItem
                              icon={UserRound}
                              label="Customer"
                              value={
                                booking.customer?.name ||
                                "Unknown Customer"
                              }
                            />

                            <InfoItem
                              icon={Mail}
                              label="Email"
                              value={
                                booking.customer?.email ||
                                "N/A"
                              }
                            />

                            <InfoItem
                              icon={CalendarDays}
                              label="Booking Date"
                              value={
                                booking.bookingDate
                                  ? new Date(
                                      booking.bookingDate
                                    ).toLocaleDateString()
                                  : "N/A"
                              }
                            />

                            {booking.service?.location && (

                              <InfoItem
                                icon={MapPin}
                                label="Location"
                                value={
                                  booking.service.location
                                }
                              />

                            )}

                          </div>


                          {booking.notes && (

                            <div className="mt-4 rounded-xl bg-gray-50 p-3">

                              <p className="text-sm text-gray-600">

                                <span className="font-semibold text-gray-800">
                                  Customer Notes:
                                </span>{" "}

                                {booking.notes}

                              </p>

                            </div>

                          )}

                        </div>

                        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 lg:min-w-[220px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">

                          <div className="flex items-center justify-between lg:justify-end">

                            <span className="text-sm text-gray-500 lg:hidden">
                              Booking Value
                            </span>

                            <div className="flex items-center gap-1 text-xl font-bold text-gray-900">

                              <CircleDollarSign className="h-5 w-5 text-emerald-600" />

                              ${booking.totalPrice || 0}

                            </div>

                          </div>

                          {booking.status ===
                            "pending" && (

                            <div className="flex gap-2">

                              <button
                                onClick={() =>
                                  handleAcceptBooking(
                                    booking._id
                                  )
                                }
                                disabled={
                                  isActionLoading
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >

                                {isActionLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4" />
                                )}

                                {isActionLoading
                                  ? "Processing"
                                  : "Accept"}

                              </button>


                              <button
                                onClick={() =>
                                  handleRejectBooking(
                                    booking._id
                                  )
                                }
                                disabled={
                                  isActionLoading
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >

                                <XCircle className="h-4 w-4" />

                                Reject

                              </button>

                            </div>

                          )}

                          {booking.status ===
                            "accepted" && (

                            <button
                              onClick={() =>
                                handleCompleteBooking(
                                  booking._id
                                )
                              }
                              disabled={
                                isActionLoading
                              }
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                              {isActionLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-4 w-5" />
                              )}

                              {isActionLoading
                                ? "Processing..."
                                : "Mark Completed"}

                            </button>

                          )}

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}) => {

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >

          <Icon className="h-5 w-5" />

        </div>

      </div>

    </div>
  );
};

const StatusBadge = ({
  status,
}) => {

  const statusStyles = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-200",

    accepted:
      "bg-blue-50 text-blue-700 border-blue-200",

    completed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    rejected:
      "bg-red-50 text-red-700 border-red-200",

    cancelled:
      "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        statusStyles[status] ||
        "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {

  return (
    <div className="flex min-w-0 items-center gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">

        <Icon className="h-4 w-4" />

      </div>

      <div className="min-w-0">

        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-gray-700">
          {value}
        </p>

      </div>

    </div>
  );
};


export default ProviderDashboard;
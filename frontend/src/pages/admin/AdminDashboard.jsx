import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getDashboardStats,
  getDashboardAnalytics,
} from "../../services/adminService";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  UserRoundCheck,
  BriefcaseBusiness,
  CalendarCheck,
  Clock3,
  CircleCheck,
  Star,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  BarChart3,
  PackageCheck,
} from "lucide-react";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);


  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        statsResponse,
        analyticsResponse,
      ] = await Promise.all([
        getDashboardStats(),
        getDashboardAnalytics(),
      ]);

      setStatistics(
        statsResponse.statistics
      );

      setAnalytics(
        analyticsResponse.analytics
      );
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9f8]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const monthlyBookingsData =
    analytics?.monthlyBookings?.map(
      (item) => ({
        name: `${item._id.month}/${item._id.year}`,
        bookings: item.totalBookings,
      })
    ) || [];

  const monthlyRevenueData =
    analytics?.monthlyRevenue?.map(
      (item) => ({
        name: `${item._id.month}/${item._id.year}`,
        revenue: item.revenue,
      })
    ) || [];

  const topProvidersData =
    analytics?.topProviders?.map(
      (item) => ({
        name:
          item.provider?.name ||
          "Unknown",
        bookings:
          item.completedBookings,
        revenue:
          item.totalRevenue,
      })
    ) || [];

  // ==========================================
  // POPULAR SERVICES DATA
  // ==========================================

  const popularServicesData =
    analytics?.popularServices?.map(
      (item) => ({
        name:
          item.service?.title ||
          "Unknown",
        bookings:
          item.totalBookings,
      })
    ) || [];

  return (
    <div className="min-h-screen bg-[#f7f9f8]">

      <section className="border-b border-gray-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Activity size={17} />
                </span>

                <span className="text-sm font-semibold text-emerald-700">
                  Platform Overview
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                Monitor platform activity, track business
                performance, and manage ServiceHub insights
                from one place.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              Platform Active

            </div>

          </div>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">


        <div className="mb-6">

          <h2 className="text-xl font-bold text-gray-900">
            Platform Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick look at your platform's current performance.
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Users"
            value={
              statistics?.users?.total || 0
            }
            icon={Users}
            description="Registered users"
          />

          <StatCard
            title="Service Providers"
            value={
              statistics?.users?.providers || 0
            }
            icon={UserRoundCheck}
            description="Active providers"
          />

          <StatCard
            title="Total Services"
            value={
              statistics?.services?.total || 0
            }
            icon={BriefcaseBusiness}
            description="Listed services"
          />

          <StatCard
            title="Total Bookings"
            value={
              statistics?.bookings?.total || 0
            }
            icon={CalendarCheck}
            description="All platform bookings"
          />

        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Pending Bookings"
            value={
              statistics?.bookings?.pending || 0
            }
            icon={Clock3}
            description="Awaiting action"
            iconStyle="amber"
          />

          <StatCard
            title="Completed Bookings"
            value={
              statistics?.bookings?.completed || 0
            }
            icon={CircleCheck}
            description="Successfully completed"
            iconStyle="green"
          />

          <StatCard
            title="Total Reviews"
            value={
              statistics?.reviews?.total || 0
            }
            icon={Star}
            description="Customer feedback"
            iconStyle="purple"
          />

          <StatCard
            title="Total Revenue"
            value={`$${statistics?.revenue?.total || 0}`}
            icon={DollarSign}
            description="Platform revenue"
            iconStyle="green"
          />

        </div>


        <div className="mt-10 grid gap-6 xl:grid-cols-2">


          <ChartCard
            icon={TrendingUp}
            title="Monthly Bookings"
            description="Booking activity over time"
          >

            <div className="h-80">

              {monthlyBookingsData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={monthlyBookingsData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "#9ca3af",
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "#9ca3af",
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#059669",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              ) : (
                <EmptyChart />
              )}

            </div>

          </ChartCard>


          <ChartCard
            icon={DollarSign}
            title="Monthly Revenue"
            description="Completed booking revenue over time"
          >

            <div className="h-80">

              {monthlyRevenueData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={monthlyRevenueData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "#9ca3af",
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "#9ca3af",
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                    />

                    <Bar
                      dataKey="revenue"
                      fill="#10b981"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (
                <EmptyChart />
              )}

            </div>

          </ChartCard>

        </div>

        <DashboardSection
          icon={UserRoundCheck}
          title="Top Providers"
          description="Providers with the highest completed booking revenue"
        >

          <div className="overflow-x-auto">

            {topProvidersData.length > 0 ? (

              <table className="w-full min-w-[600px] text-left">

                <thead>

                  <tr className="border-b border-gray-100">

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Provider
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Completed Bookings
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Revenue
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {topProvidersData.map(
                    (provider, index) => (

                      <tr
                        key={index}
                        className="border-b border-gray-50 transition hover:bg-gray-50/70"
                      >

                        <td className="px-4 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                              {provider.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <p className="font-semibold text-gray-900">
                                {provider.name}
                              </p>

                              <p className="text-xs text-gray-400">
                                Service Provider
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="px-4 py-5 text-sm text-gray-600">
                          {provider.bookings}
                        </td>

                        <td className="px-4 py-5">

                          <span className="font-semibold text-emerald-600">
                            ${provider.revenue}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            ) : (
              <EmptyTable text="No provider data available." />
            )}

          </div>

        </DashboardSection>

        <DashboardSection
          icon={BarChart3}
          title="Popular Services"
          description="Most booked services on ServiceHub"
        >

          <div className="h-80">

            {popularServicesData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={popularServicesData}
                  layout="vertical"
                  margin={{
                    left: 20,
                    right: 20,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#6b7280",
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Bar
                    dataKey="bookings"
                    fill="#059669"
                    radius={[
                      0,
                      8,
                      8,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (
              <EmptyChart />
            )}

          </div>

        </DashboardSection>

        <DashboardSection
          icon={PackageCheck}
          title="Recent Bookings"
          description="Latest activity across the ServiceHub platform"
        >

          <div className="overflow-x-auto">

            {analytics?.recentBookings?.length > 0 ? (

              <table className="w-full min-w-[800px] text-left">

                <thead>

                  <tr className="border-b border-gray-100">

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Customer
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Provider
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Service
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Price
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {analytics.recentBookings.map(
                    (booking) => (

                      <tr
                        key={booking._id}
                        className="border-b border-gray-50 transition hover:bg-gray-50/70"
                      >

                        <td className="px-4 py-5 font-medium text-gray-900">
                          {booking.customer?.name ||
                            "Unknown"}
                        </td>

                        <td className="px-4 py-5 text-sm text-gray-600">
                          {booking.provider?.name ||
                            "Unknown"}
                        </td>

                        <td className="px-4 py-5 text-sm text-gray-600">
                          {booking.service?.title ||
                            "Unknown"}
                        </td>

                        <td className="px-4 py-5 font-semibold text-gray-900">
                          ${booking.totalPrice || 0}
                        </td>

                        <td className="px-4 py-5">

                          <StatusBadge
                            status={
                              booking.status
                            }
                          />

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            ) : (
              <EmptyTable text="No recent bookings available." />
            )}

          </div>

        </DashboardSection>

      </main>

    </div>
  );
};


const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconStyle = "emerald",
}) => {

  const iconStyles = {
    emerald:
      "bg-emerald-50 text-emerald-600",

    amber:
      "bg-amber-50 text-amber-600",

    green:
      "bg-green-50 text-green-600",

    purple:
      "bg-purple-50 text-purple-600",
  };

  return (
    <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            iconStyles[iconStyle]
          }`}
        >
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-gray-300 transition group-hover:text-emerald-500"
        />

      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
};


const ChartCard = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={19} />
        </div>

        <div>

          <h2 className="font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
};


const DashboardSection = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-start gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={19} />
        </div>

        <div>

          <h2 className="font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>

        </div>

      </div>

      {children}

    </div>
  );
};


const StatusBadge = ({
  status,
}) => {

  const styles = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-100",

    accepted:
      "bg-blue-50 text-blue-700 border-blue-100",

    completed:
      "bg-emerald-50 text-emerald-700 border-emerald-100",

    cancelled:
      "bg-red-50 text-red-700 border-red-100",

    rejected:
      "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] ||
        "border-gray-100 bg-gray-50 text-gray-600"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

const EmptyChart = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50">

      <BarChart3
        size={28}
        className="text-gray-300"
      />

      <p className="mt-3 text-sm font-medium text-gray-500">
        No data available yet.
      </p>

    </div>
  );
};

const EmptyTable = ({
  text,
}) => {
  return (
    <div className="py-12 text-center">

      <p className="text-sm text-gray-500">
        {text}
      </p>

    </div>
  );
};


export default AdminDashboard;
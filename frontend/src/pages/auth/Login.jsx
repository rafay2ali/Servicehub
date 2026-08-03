import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/Authcontext";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await login(
        formData.email,
        formData.password
      );

      toast.success(
        response.message || "Login successful"
      );

      const loggedInUser = response.user;

      if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (loggedInUser?.role === "provider") {
        navigate("/provider/dashboard");
      } else {
        navigate(
          location.state?.from?.pathname ||
          "/customer/dashboard"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f7faf9]">

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-5 py-12 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] lg:grid-cols-2">

          <div className="relative hidden overflow-hidden bg-gray-950 p-10 lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative">

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <img
                  src="/servicehub_icon.svg"
                  alt="ServiceHub logo"
                  className="h-11 w-11 object-contain"
                />

                <span className="text-xl font-bold tracking-tight text-white">
                  ServiceHub
                </span>

              </Link>

            </div>

            <div className="relative py-12">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                <Sparkles size={22} />
              </div>

              <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-white">
                Great services are
                <span className="text-emerald-400">
                  {" "}just a click away.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                Connect with trusted professionals,
                discover reliable services, and manage
                your bookings with confidence.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={16} />
                  </div>

                  Trusted service providers
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={16} />
                  </div>

                  Simple and secure bookings
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={16} />
                  </div>

                  Manage everything in one place
                </div>

              </div>

            </div>

            <div className="relative">

              <p className="text-xs text-gray-500">
                Your trusted marketplace for professional services.
              </p>

            </div>

          </div>

          <div className="p-7 sm:p-10 lg:p-12">

            <div className="mb-8 flex items-center justify-center lg:hidden">

              <Link
                to="/"
                className="flex items-center gap-2"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                  S
                </div>

                <span className="text-xl font-bold text-gray-900">
                  ServiceHub
                </span>

              </Link>

            </div>

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                Welcome back

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Access your dashboard and continue
                managing your services and bookings.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>

              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-700/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {loading
                  ? "Signing you in..."
                  : "Sign in"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">

              <p className="text-sm text-gray-500">

                Don't have a ServiceHub account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline"
                >
                  Create an account
                </Link>

              </p>

            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

              <ShieldCheck size={14} />

              Secure account access

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
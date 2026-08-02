import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill in all required fields"
      );

      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {
      setLoading(true);

      const response = await register(formData);

      toast.success(
        response.message ||
        "Registration successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <div className="relative hidden overflow-hidden bg-gray-950 lg:flex lg:w-[46%]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-950" />

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link
              to="/"
              className="group flex w-fit items-center gap-3"
            >
              <img
                  src="/servicehub_icon.svg"
                  alt="ServiceHub logo"
                  className="h-11 w-11 object-contain"
                />

              <div>
                <p className="text-xl font-bold tracking-tight text-white">
                  ServiceHub
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                  Trusted Services
                </p>
              </div>
            </Link>

            <div className="max-w-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
                <Sparkles size={23} />
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                Join a better way
                <span className="block text-emerald-400">
                  to get things done.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                Connect with trusted professionals,
                discover reliable services, and manage
                everything from one simple platform.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Discover trusted local professionals
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Book and manage services easily
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>

                  <span className="text-sm text-gray-300">
                    Grow your service business
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck
                size={18}
                className="text-emerald-500"
              />

              <span>
                Your information is secure with us.
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-5 py-12 sm:px-8 lg:w-[54%]">
          <div className="w-full max-w-md">
            <div className="mb-10 flex justify-center lg:hidden">
              <Link
                to="/"
                className="flex items-center gap-3"
              >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold text-white shadow-lg shadow-emerald-500/20 transition duration-300 group-hover:rotate-3 group-hover:bg-emerald-400">
                S
              </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    ServiceHub
                  </p>

                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                    Trusted Services
                  </p>
                </div>
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-emerald-600">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join ServiceHub and start connecting
                with trusted services and professionals.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
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
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Password must contain at least 6 characters.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Choose Account Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        role: "customer",
                      }))
                    }
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${formData.role === "customer"
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${formData.role === "customer"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        <UserRound size={18} />
                      </div>

                      {formData.role ===
                        "customer" && (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-600"
                          />
                        )}
                    </div>

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Customer
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Find and book services.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        role: "provider",
                      }))
                    }
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${formData.role === "provider"
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${formData.role === "provider"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        <BriefcaseBusiness
                          size={18}
                        />
                      </div>

                      {formData.role ===
                        "provider" && (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-600"
                          />
                        )}
                    </div>

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Provider
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Offer services and grow.
                    </p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-emerald-600 transition hover:text-emerald-700 hover:underline"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={15} />

              <span>
                Secure registration · Your data is protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
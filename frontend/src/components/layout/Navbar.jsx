import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import { useAuth } from "../../context/Authcontext";
import NotificationBell from "../notifications/NotificationBell";
import serviceHubLogo from "../../assets/servicehub_logo.svg";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-emerald-700"
        : "text-gray-600 hover:text-gray-900"
    }`;

  const handleLogout = () => {
    logout();

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");

    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex h-20 items-center justify-between">

          <Link
            to="/"
            className="group flex items-center"
          >
            <img
              src={serviceHubLogo}
              alt="ServiceHub"
              className="h-18 w-auto object-contain transition duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={navLinkClass}
            >
              Browse Services
            </NavLink>

            {user?.role === "customer" && (
              <NavLink
                to="/customer/dashboard"
                className={navLinkClass}
              >
                My Bookings
              </NavLink>
            )}

            {user?.role === "provider" && (
              <>
                <NavLink
                  to="/provider/dashboard"
                  className={navLinkClass}
                >
                  Provider Dashboard
                </NavLink>

                <NavLink
                  to="/services/create"
                  className={navLinkClass}
                >
                  Add Service
                </NavLink>
              </>
            )}

            {user?.role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                className={navLinkClass}
              >
                Admin Dashboard
              </NavLink>
            )}

          </div>

          <div className="hidden items-center gap-3 lg:flex">

            <Link
              to="/services"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              title="Search Services"
            >
              <Search size={19} />
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}

            {user && (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100">
                  <NotificationBell />
                </div>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <UserRound size={17} />
                  </div>

                  <div className="hidden xl:block">

                    <p className="text-xs text-gray-400">
                      Welcome back
                    </p>

                    <p className="max-w-[120px] truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            )}

          </div>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

        {mobileOpen && (

          <div className="border-t border-gray-100 py-5 lg:hidden">

            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Home
              </NavLink>

              <NavLink
                to="/services"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Browse Services
              </NavLink>

              {user?.role === "customer" && (
                <NavLink
                  to="/customer/dashboard"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  My Bookings
                </NavLink>
              )}

              {user?.role === "provider" && (
                <>
                  <NavLink
                    to="/provider/dashboard"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Provider Dashboard
                  </NavLink>

                  <NavLink
                    to="/services/create"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Add Service
                  </NavLink>
                </>
              )}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Admin Dashboard
                </NavLink>
              )}

              <div className="mt-3 border-t border-gray-100 pt-4">

                {!user ? (

                  <div className="flex flex-col gap-2">

                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="rounded-xl px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="rounded-xl bg-gray-900 px-4 py-3 text-center font-semibold text-white"
                    >
                      Get Started
                    </Link>

                  </div>

                ) : (

                  <div className="space-y-2">

                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <UserRound size={17} />
                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Welcome back
                          </p>

                          <p className="max-w-[180px] truncate text-sm font-semibold text-gray-900">
                            {user.name}
                          </p>

                        </div>

                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm">
                        <NotificationBell />
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;
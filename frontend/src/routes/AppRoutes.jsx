import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RoleRoute from "../routes/RoleRoute";

import Home from "../pages/home/Home";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ProviderServices from "../pages/provider/ProviderServices";
import AdminDashboard from "../pages/admin/AdminDashboard";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Services from "../pages/services/Services";
import ServiceDetails from "../pages/services/ServiceDetails";
import CreateService from "../pages/services/CreateService";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        {/* Service Details */}
        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />


        <Route
          element={
            <RoleRoute
              allowedRoles={["provider"]}
            />
          }
        >

          <Route
            path="/provider/dashboard"
            element={<ProviderDashboard />}
          />

          <Route
            path="/provider/services"
            element={<ProviderServices />}
          />

          <Route
            path="/services/create"
            element={<CreateService />}
          />

        </Route>


        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />


        <Route
          element={
            <RoleRoute
              allowedRoles={["admin"]}
            />
          }
        >

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

        </Route>

      </Route>

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">

            <div className="text-center">

              <h1 className="text-6xl font-bold text-gray-900">
                404
              </h1>

              <p className="mt-4 text-xl text-gray-600">
                Page Not Found
              </p>

            </div>

          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
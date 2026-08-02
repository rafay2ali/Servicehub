import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import { getServiceById } from "../../services/serviceService";
import BookingModal from "../../components/bookings/BookingModal";
import { useAuth } from "../../context/AuthContext";

const ServiceDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);

        const response =
          await getServiceById(id);

        setService(response.service);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load service"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading service...
        </p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Service not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <Link
          to="/services"
          className="text-blue-600 hover:underline"
        >
          ← Back to Services
        </Link>

        <div className="mt-8 grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">

          <div className="flex min-h-[400px] items-center justify-center overflow-hidden rounded-xl bg-gray-100">

            {service.images &&
            service.images.length > 0 ? (
              <img
                src={service.images[0]}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400">
                No Image Available
              </span>
            )}

          </div>

          <div>

            <span className="font-medium text-blue-600">
              {service.category}
            </span>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {service.title}
            </h1>

            <p className="mt-5 leading-7 text-gray-600">
              {service.description}
            </p>

            <div className="mt-6 space-y-3">


              <p className="text-gray-600">
                📍 {service.location}
              </p>

              <p className="text-3xl font-bold text-gray-900">
                ${service.price}
              </p>

              {service.provider && (
                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="font-semibold text-gray-900">
                    Service Provider
                  </p>

                  <p className="mt-1 text-gray-600">
                    {service.provider.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {service.provider.email}
                  </p>

                </div>
              )}

            </div>

            {!user ? (

              <Link
                to="/login"
                state={{
                  from: {
                    pathname: `/services/${service._id}`,
                  },
                }}
                className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Login to Book
              </Link>

            ) : user.role === "customer" ? (

              <button
                onClick={() =>
                  setShowBookingModal(true)
                }
                className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Book This Service
              </button>

            ) : (

              <p className="mt-8 rounded-xl bg-gray-100 px-6 py-3 text-center font-medium text-gray-500">
                Only customers can book services
              </p>

            )}

          </div>

        </div>

      </div>

      {showBookingModal && (
        <BookingModal
          service={service}
          onClose={() =>
            setShowBookingModal(false)
          }
          onSuccess={() => {
            toast.success(
              "You can view your booking in the customer dashboard"
            );
          }}
        />
      )}

    </div>
  );
};

export default ServiceDetails;
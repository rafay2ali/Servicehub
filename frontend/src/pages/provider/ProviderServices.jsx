import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Trash2,
  Eye,
  MapPin,
  Loader2,
  BriefcaseBusiness,
  Plus,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllServices,
  deleteService,
} from "../../services/serviceService";


const ProviderServices = () => {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);


  const fetchProviderServices = async () => {
    try {
      setLoading(true);

      const response = await getAllServices();

      const allServices =
        response.services || [];

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
        "Fetch provider services error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load your services"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (user?._id || user?.id) {
      fetchProviderServices();
    }

  }, [user]);

  const handleDeleteService = async (
    serviceId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this service? This action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    try {

      setDeleteLoading(serviceId);

      await deleteService(
        serviceId
      );

      toast.success(
        "Service deleted successfully"
      );

      setServices(
        (previousServices) =>
          previousServices.filter(
            (service) =>
              service._id !== serviceId
          )
      );

    } catch (error) {

      console.error(
        "Delete service error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete service"
      );

    } finally {

      setDeleteLoading(null);

    }
  };

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
            Loading your services...
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

      <section className="relative overflow-hidden bg-gray-950 px-6 py-12 text-white">


        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />


        <div className="relative mx-auto max-w-7xl">

          <Link
            to="/provider/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to Dashboard

          </Link>


          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">

                <BriefcaseBusiness className="h-4 w-4" />

                Provider Workspace

              </div>


              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

                My Services

              </h1>


              <p className="mt-3 max-w-2xl text-gray-400">

                View and manage all the services you have listed on ServiceHub.

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

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">

              Your Listed Services

            </h2>

            <p className="mt-1 text-gray-500">

              {services.length}{" "}
              {services.length === 1
                ? "service"
                : "services"}{" "}
              listed by you

            </p>

          </div>

        </div>

        {services.length === 0 && (

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">

              <BriefcaseBusiness className="h-8 w-8" />

            </div>


            <h3 className="mt-5 text-xl font-bold text-gray-900">

              No Services Listed Yet

            </h3>


            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

              You haven't created any services yet. Add your first service and let customers discover your expertise.

            </p>


            <Link
              to="/services/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >

              <Plus className="h-4 w-4" />

              Create Your First Service

            </Link>

          </div>

        )}

        {services.length > 0 && (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {services.map(
              (service) => {

                const imageUrl =
                  service.image ||
                  (
                    service.images &&
                    service.images.length > 0
                  )
                    ? service.image ||
                      service.images[0]
                    : null;


                const isDeleting =
                  deleteLoading ===
                  service._id;


                return (

                  <article
                    key={service._id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                  >

                    <div className="relative h-52 overflow-hidden bg-gray-100">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={service.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100">

                          <div className="text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">

                              <Sparkles className="h-6 w-6" />

                            </div>

                            <p className="mt-3 text-sm font-medium text-gray-400">

                              No image available

                            </p>

                          </div>

                        </div>

                      )}

                      <div className="absolute left-4 top-4">

                        <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">

                          {service.category}

                        </span>

                      </div>

                    </div>

                    <div className="p-5">


                      <h3 className="line-clamp-1 text-xl font-bold text-gray-900">

                        {service.title}

                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">

                        {service.description}

                      </p>


                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                        <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />

                        <span className="truncate">

                          {service.location}

                        </span>

                      </div>

                      <div className="mt-4">

                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">

                          Starting from

                        </p>

                        <p className="mt-1 text-2xl font-bold text-gray-900">

                          ${service.price}

                        </p>

                      </div>


                      <div className="my-5 h-px bg-gray-100" />


                      <div className="flex gap-3">

                        <Link
                          to={`/services/${service._id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        >

                          <Eye className="h-4 w-4" />

                          View

                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteService(
                              service._id
                            )
                          }
                          disabled={isDeleting}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                          {isDeleting ? (

                            <Loader2 className="h-4 w-4 animate-spin" />

                          ) : (

                            <Trash2 className="h-4 w-4" />

                          )}

                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}

                        </button>

                      </div>

                    </div>

                  </article>

                );

              }
            )}

          </div>

        )}

      </main>

    </div>
  );
};


export default ProviderServices;
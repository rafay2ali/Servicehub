import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import {
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";

import ServiceCard from "../../components/services/ServiceCard";
import ServiceSearch from "../../components/services/ServiceSearch";

import { getAllServices } from "../../services/serviceService";

const Services = () => {

  const routerLocation = useLocation();

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [categoryOptions, setCategoryOptions] =
    useState([]);

  const isFirstRender = useRef(true);

  const hasActiveSearch = search.trim() !== "";

  const hasActiveCategory = category !== "";

  const hasActiveFilters =
    hasActiveSearch || hasActiveCategory;


  const fetchServices = useCallback(
    async ({
      currentSearch = "",
      currentCategory = "",
    } = {}) => {
      try {
        setLoading(true);

        const response = await getAllServices({
          search: currentSearch.trim(),
          category: currentCategory,
          page: 1,
          limit: 1000,
        });

        setServices(response.services || []);
      } catch (error) {
        console.error(
          "Fetch services error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load services"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );


  const fetchCategoryOptions = useCallback(
    async () => {
      try {
        const response = await getAllServices({
          search: "",
          category: "",
          page: 1,
          limit: 1000,
        });

        const allServices =
          response.services || [];

        const uniqueCategories = Array.from(
          new Set(
            allServices
              .map((service) => service.category)
              .filter(
                (value) =>
                  typeof value === "string" &&
                  value.trim() !== ""
              )
          )
        ).sort((a, b) => a.localeCompare(b));

        setCategoryOptions(uniqueCategories);
      } catch (error) {
        console.error(
          "Fetch category options error:",
          error
        );
      }
    },
    []
  );

  useEffect(() => {
    setSearch("");
    setCategory("");

    fetchServices({
      currentSearch: "",
      currentCategory: "",
    });

    fetchCategoryOptions();

    isFirstRender.current = true;
  }, [routerLocation.key]);

  const handleSearch = () => {
    fetchServices({
      currentSearch: search,
      currentCategory: category,
    });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;

    setCategory(newCategory);

    fetchServices({
      currentSearch: search,
      currentCategory: newCategory,
    });
  };

  const handleClearFilters = () => {
    setSearch("");

    setCategory("");

    
    fetchServices({
      currentSearch: "",
      currentCategory: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">


        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-lime-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">

          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-600">

            <Sparkles size={16} />

            <span>
              ServiceHub Marketplace
            </span>

          </div>

          <div className="max-w-4xl">

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">

              Explore all

              <span className="text-emerald-600">
                {" "}services
              </span>

              {" "}in one place.

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">

              Browse all services available on ServiceHub.
              Find a professional for your needs, explore
              different services, and book the right one
              for you.

            </p>

          </div>

          <div className="mt-10 max-w-4xl">

            <div className="rounded-2xl border border-gray-200 bg-[#f7f8f6] p-2 shadow-lg shadow-gray-900/5">

              <ServiceSearch
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
              />

            </div>

          </div>

          <div className="mt-7 flex flex-wrap gap-6">

            <div className="flex items-center gap-2 text-sm text-gray-600">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">

                <BriefcaseBusiness
                  size={15}
                  className="text-emerald-700"
                />

              </div>

              Browse all services

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">

                <Users
                  size={15}
                  className="text-emerald-700"
                />

              </div>

              Professional providers

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">

                <MapPin
                  size={15}
                  className="text-emerald-700"
                />

              </div>

              Services near you

            </div>

          </div>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">

              <SlidersHorizontal size={16} />

              Marketplace

            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">

              Explore all services

            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">

              Browse all available services on ServiceHub.

            </p>

          </div>

          {!loading && services.length > 0 && (

            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm">

              <Search size={16} />

              <span>

                Showing {services.length} services

              </span>

            </div>

          )}

        </div>

        <div className="mt-10">

          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="text-2xl font-bold text-gray-950">

                Available Services

              </h3>

              <p className="mt-1 text-sm text-gray-500">

                Explore services from professionals
                available on ServiceHub.

              </p>

            </div>

            <div className="flex items-center gap-2">

              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-gray-600"
              >

                Category

              </label>

              <select
                id="category-filter"
                value={category}
                onChange={handleCategoryChange}
                className="rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >

                <option value="">
                  All Categories
                </option>

                {categoryOptions.map(
                  (categoryValue) => (

                    <option
                      key={categoryValue}
                      value={categoryValue}
                    >

                      {categoryValue}

                    </option>

                  )
                )}

              </select>

            </div>

          </div>

          {loading && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (

                  <div
                    key={item}
                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                  >

                    <div className="h-56 animate-pulse bg-gray-200" />

                    <div className="space-y-4 p-6">

                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />

                      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-gray-200" />

                    </div>

                  </div>

                )
              )}

            </div>

          )}

          {!loading &&
            services.length === 0 && (

              <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                  <Search
                    size={28}
                    className="text-emerald-700"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-bold text-gray-950">

                  {hasActiveFilters
                    ? "No matching services found"
                    : "No services available yet"}

                </h2>

                <p className="mx-auto mt-3 max-w-md text-gray-500">

                  {hasActiveFilters
                    ? "We couldn't find any services matching your search or category. Try adjusting your criteria."
                    : "There are currently no services listed on ServiceHub. Please check back soon as new professionals and services are added."}

                </p>

                {hasActiveFilters && (

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-7 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
                  >

                    Clear filters

                  </button>

                )}

              </div>

            )}

          {!loading &&
            services.length > 0 && (

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                {services.map(
                  (service) => (

                    <ServiceCard
                      key={service._id}
                      service={service}
                    />

                  )
                )}

              </div>

            )}

        </div>

      </main>

      <section className="border-t border-gray-200 bg-white px-5 py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center md:px-12">

          <div className="mx-auto max-w-2xl">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">

              <Sparkles
                size={21}
                className="text-white"
              />

            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">

              Explore. Compare. Book.

            </h2>

            <p className="mt-4 leading-7 text-gray-400">

              Browse all services available on ServiceHub
              and find the right professional for your needs.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Services;
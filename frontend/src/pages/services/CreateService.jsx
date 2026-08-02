import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createService } from "../../services/serviceService";

const CreateService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image file"
      );

      e.target.value = "";
      return;
    }

    if (
      selectedFile.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image size must be less than 5MB"
      );

      e.target.value = "";
      return;
    }

    setImage(selectedFile);

    const previewUrl =
      URL.createObjectURL(
        selectedFile
      );

    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setImage(null);

    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title =
      formData.title.trim();

    const description =
      formData.description.trim();

    const category =
      formData.category.trim();

    const location =
      formData.location.trim();

    if (
      !title ||
      !description ||
      !category ||
      !formData.price ||
      !location
    ) {
      toast.error(
        "Please fill in all fields"
      );

      return;
    }

    if (!image) {
      toast.error(
        "Please upload a service image"
      );

      return;
    }

    const price =
      Number(formData.price);

    if (
      Number.isNaN(price) ||
      price < 0
    ) {
      toast.error(
        "Please enter a valid price"
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await createService({
          title,
          description,
          category,
          price,
          location,
          image,
        });

      toast.success(
        response.message ||
          "Service created successfully"
      );

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        location: "",
      });

      setImage(null);

      setImagePreview("");

      navigate("/services");

    } catch (error) {

      console.error(
        "Create service error:",
        error
      );


      console.log(
        "Backend response:",
        error.response?.data
      );


      console.log(
        "Backend status:",
        error.response?.status
      );

      if (
        error.response?.status === 401
      ) {
        toast.error(
          "Please login to create a service"
        );

        navigate("/login");

        return;
      }

      if (
        error.response?.status === 403
      ) {
        toast.error(
          "Only providers and admins can create services"
        );

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Failed to create service"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-gray-900 px-6 py-10 text-white">

        <div className="mx-auto max-w-7xl">

          <Link
            to="/provider/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >

            <span className="text-lg">
              ←
            </span>

            Back to Dashboard

          </Link>


          <div className="mt-7">

            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Provider Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Create New Service
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Add a professional service to ServiceHub
              and let customers discover and book your work.
            </p>

          </div>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">


          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">


            <div className="border-b border-gray-100 px-6 py-6 sm:px-8">

              <h2 className="text-xl font-bold text-gray-900">
                Service Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide the details customers need to know
                about your service.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 sm:p-8"
            >


              <div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >

                  Service Title

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Professional Home Plumbing"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                />


                <p className="mt-2 text-xs text-gray-400">
                  Choose a clear and descriptive title.
                </p>

              </div>

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >

                  Service Description

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe your service, experience, what is included, and what customers can expect..."
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                />


                <p className="mt-2 text-xs text-gray-400">
                  Give customers enough information to understand
                  what you provide.
                </p>

              </div>

              <div>

                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >

                  Service Category

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                >

                  <option value="">
                    Select a service category
                  </option>

                  <option value="Plumbing">
                    Plumbing
                  </option>

                  <option value="Electrical">
                    Electrical
                  </option>

                  <option value="Cleaning">
                    Cleaning
                  </option>

                  <option value="Carpentry">
                    Carpentry
                  </option>

                  <option value="Painting">
                    Painting
                  </option>

                  <option value="Home Repair">
                    Home Repair
                  </option>

                  <option value="IT Services">
                    IT Services
                  </option>

                  <option value="Beauty">
                    Beauty
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="grid gap-6 md:grid-cols-2">


                <div>

                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >

                    Starting Price

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                      $
                    </span>


                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                  </div>

                </div>

                <div>

                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >

                    Service Location

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-400">
                      📍
                    </span>


                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Islamabad"
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                  </div>

                </div>

              </div>

              <div>

                <label
                  htmlFor="service-image"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >

                  Service Image

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                {!imagePreview ? (

                  <label
                    htmlFor="service-image"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-900 hover:bg-gray-100"
                  >

                    <div className="text-3xl">
                      📷
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      Click to upload service image
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG, JPEG, WEBP — Maximum 5MB
                    </p>


                    <input
                      id="service-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={loading}
                      className="hidden"
                    />

                  </label>

                ) : (

                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">

                    <img
                      src={imagePreview}
                      alt="Service preview"
                      className="h-64 w-full object-cover"
                    />


                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={loading}
                      className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      Remove Image

                    </button>

                  </div>

                )}

              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <Link
                  to="/provider/dashboard"
                  className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >

                  Cancel

                </Link>


                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Creating Service..."
                    : "Create Service"}

                </button>

              </div>

            </form>

          </div>

          <aside className="space-y-6">

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 p-6">

                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-lg text-white">
                  ✦
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Create a Great Listing
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  A professional service listing helps
                  customers understand your expertise.
                </p>

              </div>


              <div className="space-y-5 p-6">
                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    1
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-gray-900">
                      Use a clear title
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Tell customers exactly what service
                      you provide.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    2
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-gray-900">
                      Add detailed information
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Explain your expertise and what
                      customers will receive.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    3
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-gray-900">
                      Set your price
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Keep your pricing clear and easy
                      for customers to understand.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    4
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-gray-900">
                      Upload a quality image
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Use a clear image that represents
                      your service professionally.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                  ✓
                </div>

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Ready to publish?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your service will become available
                    to customers after successful creation.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default CreateService;
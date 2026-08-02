import {
  MapPin,
  Tag,
  DollarSign,
  ArrowDownUp,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

const ServiceFilters = ({
  category,
  setCategory,
  location,
  setLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  onApplyFilters,
  onClearFilters,
}) => {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

            <SlidersHorizontal size={19} />

          </div>

          <div>

            <h3 className="font-bold text-gray-900">
              Filter Services
            </h3>

            <p className="text-xs text-gray-500">
              Refine your search to find the perfect match.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="flex items-center gap-2 self-start text-sm font-medium text-gray-500 transition hover:text-emerald-700 sm:self-auto"
        >

          <RotateCcw size={15} />

          Reset Filters

        </button>

      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

        <div className="relative">

          <Tag
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            placeholder="Category"
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

        </div>

        <div className="relative">

          <MapPin
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Location"
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

        </div>

        <div className="relative">

          <DollarSign
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            placeholder="Min price"
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

        </div>

        <div className="relative">

          <DollarSign
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            placeholder="Max price"
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

        </div>

        <div className="relative">

          <ArrowDownUp
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          >

            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

          </select>

        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={onApplyFilters}
          className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default ServiceFilters;
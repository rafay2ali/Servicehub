import {
  Search,
  ArrowRight,
} from "lucide-react";

const ServiceSearch = ({
  search,
  setSearch,
  onSearch,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group flex w-full items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-200/40 transition duration-300 focus-within:border-emerald-300 focus-within:shadow-emerald-100/50"
    >

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

        <Search size={20} />

      </div>

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search for a service, profession, or skill..."
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
      />

      <button
        type="submit"
        className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-700 sm:px-6"
      >

        <span className="hidden sm:block">
          Search
        </span>

        <ArrowRight size={18} />

      </button>

    </form>
  );
};

export default ServiceSearch;
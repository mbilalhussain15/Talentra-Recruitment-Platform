import { ChevronDown, Search } from "lucide-react";
import { useFilterStore } from "../../../store/useFilterStore";

export const Filter = ({ searchInput, setSearchInput }) => {
  const { showAdvancedFilters, setShowAdvancedFilters } = useFilterStore();

  return (
    <div className="flex gap-4 items-center bg-white rounded-lg p-4">
      {/*  search text input */}
      <div className={`relative flex-1 border-r border-gray-200`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-[18px] h-[18px] text-blue-300" />
        </div>
        <input
          type="text"
          placeholder="Job title, Keyword..."
          className="w-full focus:ring-0! pl-11 py-3  rounded-lg text-sm placeholder-gray-400 focus:outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>

      {/* Advanced Filter button */}
      <div className="relative flex-1">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`w-full text-left pl-11 py-3  focus:outline-none ${
            showAdvancedFilters ? "text-blue-600" : "text-gray-400"
          }`}
        >
          Advance Filter
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showAdvancedFilters ? "rotate-180 text-blue-600" : "text-gray-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export const FilterWithButton = ({ searchInput, setSearchInput, onFindJob }) => {
  return (
    <div className="flex gap-4 items-center bg-white rounded-lg p-4">
      <Filter searchInput={searchInput} setSearchInput={setSearchInput} />
      <button
        onClick={onFindJob}
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium"
      >
        Find Job
      </button>
    </div>
  );
};

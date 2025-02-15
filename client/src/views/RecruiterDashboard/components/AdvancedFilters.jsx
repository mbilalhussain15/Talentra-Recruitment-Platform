import { Check } from "lucide-react";
import { Filter } from "./Filter";
import { useFilterStore } from "../../../store/useFilterStore";

export const AdvancedFilters = ({ searchQuery, setSearchQuery, onSearchClick }) => {
  const {
    advancedFilters,
    setAdvancedFilters,
    showAdvancedFilters,
    setShowAdvancedFilters,
  } = useFilterStore();

  const isOpen = showAdvancedFilters;
  const onClose = () => setShowAdvancedFilters(false);

  const handleRadioChange = (category, value) => {
    const newFilters = {
      ...advancedFilters,
      [category]: value,
    };
    setAdvancedFilters(newFilters);
  };

  const handleCheckboxChange = (category, value) => {
    const newFilters = {
      ...advancedFilters,
      [category]: (() => {
        const currentValues = advancedFilters[category];
        if (value === "All") {
          return currentValues.includes("All") ? [] : ["All"];
        } else {
          const withoutAll = currentValues.filter((v) => v !== "All");
          return withoutAll.includes(value)
            ? withoutAll.filter((v) => v !== value)
            : [...withoutAll, value];
        }
      })(),
    };
    setAdvancedFilters(newFilters);
  };

  const filters = {
    salary: [
      "$50 - $1000",
      "$1000 - $2000",
      "$3000 - $4000",
      "$4000 - $6000",
      "$6000 - $8000",
      "$8000 - $10000",
      "$10000 - $15000",
      "$15000+",
    ],
    jobType: [
      "All",
      "Full Time",
      "Part Time",
      "Internship",
      "Remote",
      "Temporary",
      "Contract Base",
    ],
    education: [
      "All",
      "High School",
      "Intermediate",
      "Graduation",
      "Master Degree",
      "Bachelor Degree",
    ],
    skills: ["Entry Level", "Mid Level", "Expert Level"],
  };

  const RadioOption = ({ value, category, checked }) => (
    <label
      onClick={() => handleRadioChange(category, value)}
      className="flex items-center gap-3 cursor-pointer group mb-4"
    >
      <div
        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center
          ${
            checked
              ? "border-blue-600 bg-white"
              : "border-gray-200 bg-white group-hover:border-blue-600"
          }`}
      >
        {checked && (
          <div className="w-[10px] h-[10px] rounded-full bg-blue-600" />
        )}
      </div>
      <span className={`${checked ? "text-blue-600" : "text-gray-700"}`}>
        {value}
      </span>
    </label>
  );

  const CheckboxOption = ({ value, category, checked }) => (
    <label
      onClick={() => handleCheckboxChange(category, value)}
      className="flex items-center gap-3 cursor-pointer group mb-4"
    >
      <div
        className={`w-[18px] h-[18px] rounded border flex items-center justify-center
          ${
            checked
              ? "border-blue-600 bg-blue-600"
              : "border-gray-200 bg-white group-hover:border-blue-600"
          }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
      </div>
      <span className={`${checked ? "text-blue-600" : "text-gray-700"}`}>
        {value}
      </span>
    </label>
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`
        fixed left-1/2 top-[200px] w-[calc(100%-48px)] max-w-[1440px] 
        -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-100
        transition-all duration-200 ease-out
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
      `}
      >
        {/* Search Bar Section */}
        <div className="p-4 border-b border-gray-100">
          <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchClick={onSearchClick} />
        </div>

        {/* Advanced Filters Section */}
        <div className="p-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Salary */}
            <div className="border-r border-gray-200">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Salary</h3>
              <div className="space-y-3">
                {filters.salary.map((value) => (
                  <RadioOption
                    key={value}
                    value={value}
                    category="salary"
                    checked={advancedFilters.salary === value}
                  />
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="border-r border-gray-200">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Job Type</h3>
              <div className="space-y-3">
                {filters.jobType.map((value) => (
                  <CheckboxOption
                    key={value}
                    value={value}
                    category="jobType"
                    checked={advancedFilters.jobType.includes(value)}
                  />
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="border-r border-gray-200">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Education
              </h3>
              <div className="space-y-3">
                {filters.education.map((value) => (
                  <CheckboxOption
                    key={value}
                    value={value}
                    category="education"
                    checked={advancedFilters.education.includes(value)}
                  />
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">Skills</h3>
              <div className="space-y-3">
                {filters.skills.map((value) => (
                  <RadioOption
                    key={value}
                    value={value}
                    category="skills"
                    checked={advancedFilters.skills === value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

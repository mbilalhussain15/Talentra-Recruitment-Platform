import { ChevronDown } from "lucide-react";

export const SelectDropdown = ({ value, placeholder, className }) => {
  return (
    <div className={`relative ${className}`}>
      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[15px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        <option value={value}>{value}</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}; 
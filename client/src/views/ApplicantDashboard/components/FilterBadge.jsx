import { X } from "lucide-react";

export const FilterBadge = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-2 pl-4 pr-2 py-1.5 bg-gray-100 rounded-2xl  text-sm text-gray-700">
      {label}
      <button
        className="cursor-pointer text-gray-400 bg-white rounded-full p-0.5 hover:text-gray-600"
        onClick={onRemove}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

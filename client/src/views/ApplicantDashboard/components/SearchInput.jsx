export const SearchInput = ({ icon, placeholder, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[15px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}; 
export const StatsCard = ({ count, label, icon, bgColor }) => {
  return (
    <div className={`p-3 rounded-xl ${bgColor} relative overflow-hidden`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[32px] font-semibold text-gray-900 mb-1">
            {count}
          </p>
          <p className="text-[15px] text-gray-600">{label}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center`}
        >
          <img src={icon} alt={label} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

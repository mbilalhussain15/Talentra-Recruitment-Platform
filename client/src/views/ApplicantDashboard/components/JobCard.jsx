import {
  MapPin,
  DollarSign,
  Bookmark,
  ArrowRight,
  Calendar,
} from "lucide-react";

export const JobCard = ({ job }) => {
  return (
    <div
      className={`rounded-xl p-6 ring-1 ring-gray-200
        transition-all duration-300 ease-in-out
       hover:ring-[#3B82F6] hover:bg-amber-50 `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl  flex items-center justify-center`}
          >
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-[15px] font-medium text-gray-900">
                {job.title}
              </h3>
              <div className="flex items-center gap-2">
                {job.featured && (
                  <span className="px-2 py-0.5 text-[13px] font-medium text-rose-600 bg-rose-50 rounded-full">
                    Featured
                  </span>
                )}
                <span className="px-2 py-0.5 text-[13px] font-medium text-blue-600 bg-blue-50 rounded-full">
                  {job.type}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <Calendar className="w-4 h-4" />
                {job.daysRemaining} Days Remaining
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`p-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
              job.isSaved ? "text-black" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
          <button
            className="cursor-pointer px-4 py-3 font-semibold
           text-blue-600 
          bg-blue-50 
          hover:text-white
          hover:bg-blue-500 rounded-lg flex items-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

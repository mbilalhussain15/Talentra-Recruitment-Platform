import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { JobCard } from "./JobCard";
import { FilterBadge } from "./FilterBadge";
import { SelectDropdown } from "./SelectDropdown";
import { AdvancedFilters } from "./AdvancedFilters";
import { useFilterStore } from "../../../store/useFilterStore";
import { Filter } from "./Filter";
import axios from "axios";

export const RecentJobPosts = () => {
  const [viewType, setViewType] = useState("list"); // 'list' or 'grid'
  const {
    showAdvancedFilters,
    setShowAdvancedFilters,
    selectedFilters,
    removeFilter,
  } = useFilterStore();

  const [recentJobs, setRecentJobs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 12,
    total: 0,
  });

  const fetchRecentJobs = async () => {
    try {
      const response = await axios.get("/api/applicantService/fetchJobs", {
        params: {
          page: pagination.page,
          perPage: pagination.perPage,
        },
        withCredentials: true,
      });
      setRecentJobs(response.data.jobs);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total,
      }));
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
    }
  };

  useEffect(() => {
    fetchRecentJobs();
  }, [pagination.page, pagination.perPage]);

  const finalPage = Math.ceil(pagination.total / pagination.perPage);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowAdvancedFilters(false);
      }
    };

    if (showAdvancedFilters) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAdvancedFilters, setShowAdvancedFilters]);

  return (
    <div className="recent-jobs">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-900 font-medium">Recent Job Posts</div>
        <Link to="/applicant/recent-jobs" className="text-gray-900 font-medium flex items-center gap-2">
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="max-w-[1440px] mx-auto px-6 py-6 bg-gray-100">
          <AdvancedFilters />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {selectedFilters
                .filter((filter) => filter.label !== "Design" && filter.label !== "New York")
                .map((filter) => (
                  <FilterBadge
                    key={filter.type}
                    label={filter.label}
                    onRemove={() => removeFilter(filter)}
                  />
                ))}
            </div>
            <div className="flex items-center gap-4">
              <SelectDropdown value="Latest" className="w-40" />
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
                <button
                  className={`p-2 rounded ${
                    viewType === "grid" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setViewType("grid")}
                >
                  <LayoutGrid className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  className={`p-2 rounded ${
                    viewType === "list" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setViewType("list")}
                >
                  <List className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {recentJobs && recentJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              disabled={pagination.page === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 ${
                pagination.page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            {Array.from({ length: finalPage }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setPagination({ ...pagination, page })}
                  disabled={page === pagination.page}
                  className={`cursor-pointer w-10 h-10 rounded-full text-sm font-medium ${
                    page === pagination.page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-700 hover:border-blue-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              disabled={pagination.page === finalPage}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 ${
                pagination.page === finalPage
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

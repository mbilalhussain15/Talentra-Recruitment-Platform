import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { useState, useEffect } from "react";
import { JobCard } from "./components/JobCard";
import { FilterBadge } from "./components/FilterBadge";
import { SelectDropdown } from "./components/SelectDropdown";
import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { AdvancedFilters } from "./components/AdvancedFilters";
import { useFilterStore } from "../../store/useFilterStore";
import { Filter } from "./components/Filter";
import { Footer } from "./components/Footer";
import axios from "axios";
import { RecentlyAppliedTable } from "./components/RecentlyAppliedTable";
import ApplyJobModel from "./components/ApplyJobModel"; // Import ApplyJobModel
import { useNavigate } from "react-router-dom";
import { FilterWithButton } from "./components/Filter";
import { FindJobsTable } from "./components/FindJobTable";

export const JobsList = () => {
	const [viewType, setViewType] = useState("list"); // 'list' or 'grid'
	const [searchInput, setSearchInput] = useState("");
	const [jobs, setJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null); // State to manage selected job
	const [jobMinSalary, setJobMinSalary] = useState(0);
	const [jobMaxSalary, setJobMaxSalary] = useState(0);
	const [jobType, setJobType] = useState("");
	const navigate = useNavigate();

	const {
		showAdvancedFilters,
		setShowAdvancedFilters,
		selectedFilters,
		removeFilter,
		advancedFilters,
		setAdvancedFilters,
	} = useFilterStore();
	const [savedFilters, setSavedFilters] = useState([]);

	const fetchJobs = async () => {
		try {
			const response = await fetch("http://localhost:5002/api/job/getAllJob", {
				credentials: 'include', // This ensures cookies are sent with the request
			  });
			const data = await response.json();
			console.log("data before setting", data);
			setJobs(data.jobs);
			console.log("jobs=====>", jobs);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};
	useEffect(() => {
		fetchJobs();
	}, []);

	useEffect(() => {
		const fetchFilteredJobs = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5003/api/applicant/filterJobs?title=${searchInput}`, {
						withCredentials: true, // Send cookies with the request
					  });
				setJobs(response.data);
				console.log("response======>", response.data);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			}
		};

		if (searchInput) {
			fetchFilteredJobs();
		} else {
			fetchJobs();
		}
	}, [searchInput]);

	const handleViewDetailsClick = (job) => {
		setSelectedJob(job); // Set the selected job
	};

	const closeApplyJobModel = () => {
		setSelectedJob(null); // Close the ApplyJobModel
	};

	const handleSaveFilters = (filters) => {
		console.log("filters", filters);
		setSavedFilters(filters);
		setAdvancedFilters(filters);

		const minSalary = filters.minSalary || ""; // Ensure it's a string
		const maxSalary = filters.maxSalary || ""; // Ensure it's a string

		const numericMinSalary = parseInt(minSalary.replace(/\D/g, ""), 10);
		const numericMaxSalary = parseInt(maxSalary.replace(/\D/g, ""), 10);

		console.log("Job minimum salary:", numericMinSalary);
		console.log("Job maximum salary:", numericMaxSalary);
		console.log(filters.jobType);

		setJobMinSalary(numericMinSalary);
		setJobMaxSalary(numericMaxSalary);
		setJobType(filters.jobType);
	};

	const handleFindJobClick = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5003/api/applicant/filterJobs?title=${searchInput}&minSalary=${jobMinSalary}&maxSalary=${jobMaxSalary}&jobType=${jobType}`, {
					withCredentials: true, // This ensures cookies are sent with the request
				  });
			console.log("Filtered jobs response:", response.data);

			setJobs(response.data); // Update the jobs state
		} catch (error) {
			console.error("Error fetching filtered jobs:", error);
		}

		console.log("Job minimum salary", jobMinSalary);
		console.log("Job maximum salary", jobMaxSalary);
	};

	useEffect(() => {
		if (jobMinSalary || jobMaxSalary || jobType) {
			handleFindJobClick();
		}
	}, [jobMinSalary, jobMaxSalary, jobType]);

	const [pagination, setPagination] = useState({
		page: 1,
		perPage: 12,
		total: 100,
	});
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
		<AppWrapper>
			<Navbar />
			<div className="flex min-h-screen">
				<main className="flex-1 p-8">
					{/* search and filter section */}
					<div className="bg-white border-b border-gray-100">
						<div className="max-w-[1440px] mx-auto px-6 py-6 bg-gray-100">
							<div className="flex items-center justify-between mb-4">
								<h1 className="text-xl font-medium text-gray-900">Find Job</h1>
								<div className="flex items-center gap-2 text-sm text-gray-500">
									<span>Home</span>
									<span>/</span>
									<span className="text-gray-900">Find job</span>
								</div>
							</div>
							{/* Search Section */}
							<FilterWithButton
								searchInput={searchInput}
								setSearchInput={setSearchInput}
								onFindJob={handleFindJobClick}
							/>
							{/* Display Saved Filters */}
							<div className="flex gap-2 mt-4">
								{Object.entries(savedFilters).map(([key, value]) => (
									<span
										key={key}
										className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
									>
										{key}: {Array.isArray(value) ? value.join(", ") : value}
									</span>
								))}
							</div>
							{/* Advanced Filters */}
							<AdvancedFilters
							 className="max-w-[800px] w-full mx-auto" 
							 onSaveFilters={handleSaveFilters} />
						</div>
					</div>

					{/* Content */}
					<div className="max-w-[1440px] mx-auto px-6 mt-6">
						{/* Selected filters and view type */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-2">
								{selectedFilters.map((filter) => (
									<FilterBadge
										key={filter.type}
										label={filter.label}
										onRemove={() => removeFilter(filter)}
									/>
								))}
							</div>

							<div className="flex items-center gap-4">
								<SelectDropdown value="Latest" className="w-40" />
								<SelectDropdown value="12 per page" className="w-40" />
								<div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 ">
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

						{/* Jobs List */}
						{/* <div className="space-y-4">
              {job.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div> */}

						<FindJobsTable
							onViewDetailsClick={handleViewDetailsClick}
							jobs={jobs}
						/>

						{/* Pagination */}
						<div className="flex items-center justify-center gap-2 mt-8">
							<button
								disabled={pagination.page === 1}
								className={` w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400
                  ${
										pagination.page === 1
											? "cursor-not-allowed"
											: "cursor-pointer"
									}
                  `}
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
								className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700
                  ${
										pagination.page === finalPage
											? "cursor-not-allowed"
											: "cursor-pointer"
									}
                  `}
							>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				</main>
			</div>
			<Footer />
			{selectedJob && <ApplyJobModel />}
		</AppWrapper>
	);
};
export default JobsList; // Ensure this default export

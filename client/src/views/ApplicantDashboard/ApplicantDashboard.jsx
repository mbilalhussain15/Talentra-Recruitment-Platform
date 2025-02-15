import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { StatsCard } from "./components/StatsCard";
import { RecentJobPosts } from "./components/RecentJobPosts";
import { Sidebar } from "./components/Sidebar";
import { ArrowRightIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { RecentlyAppliedTable } from "./components/RecentlyAppliedTable";
import ApplyJobModel from "./components/ApplyJobModel"; // Import ApplyJobModel
import { useSelector } from "react-redux";
import axios from "axios";

export const ApplicantDashboard = () => {
	const { user } = useSelector((state) => state.auth);
	const loggedInUserId = user?.userId;
	console.log("loggedInUserId : ", loggedInUserId);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null); // State to track selected job
	const navigate = useNavigate();
	const closeModal = () => setIsModalOpen(false);
	const [jobData, setJobData] = useState(null);
	const [appliedJobsCount, setAppliedJobsCount] = useState(0);
	const [name, setName] = useState("");
	const [favouriteJobsCount, setFavouriteJobsCount] = useState(0);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await fetch("http://localhost:5002/api/job/getAllJob", {
					credentials: 'include', 
				  });
				const data = await response.json();
				setJobs(data.jobs);
				console.log("data=====>", data.jobs);
				setAppliedJobsCount(data.jobs.length);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			}
		};

		const fetchProfile = async () => {
			try {
				const userId = loggedInUserId;
				const response = await axios.get(
					`http://localhost:5003/api/applicant/getApplicantById/${userId}`, {
						withCredentials: true, // Send cookies with the request
					  });
				console.log("Profile Data:", response.data);
				console.log("name", response.data.name);
				setName(response.data.name);
				//setProfile(response.data); // Assuming you have a state setter for profile
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		const fetchFavouriteJobs = async () => {
			try {
				const userId = loggedInUserId;
				const favouriteJobsResponse = await axios.get(
					`http://localhost:5003/api/applicant/fetchFavouriteJobs/${userId}`, {
						withCredentials: true, // Send cookies with the request
					  });
				console.log("favjobs", favouriteJobsResponse.data.length);
				setFavouriteJobsCount(favouriteJobsResponse.data.length);
			} catch (error) {
				console.error("Error fetching favourite jobs:", error);
			}
		};

		fetchJobs();
		fetchProfile();
		fetchFavouriteJobs();
	}, []);

	const handleViewDetailsClick = (job) => {
		console.log("Selected Job ID:", job._id);
		setSelectedJob(job._id); // Set the selected job
		setJobData(job);
		console.log("jobData=====>", jobData);
	};

	const stats = [
		{
			count: appliedJobsCount,
			label: "Applied jobs",
			icon: "/assets/icons/applied-job-stat.png",
			bgColor: "bg-blue-100/70",
		},
		{
			count: favouriteJobsCount,
			label: "Favorite jobs",
			icon: "/assets/icons/favourite-job-stat.png",
			bgColor: "bg-orange-100/70",
		},
	];

	return (
		<AppWrapper>
			<Navbar showSearch={true} />
			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-8 h-[80vh] overflow-scroll">
					{/* Header Section */}
					<div className="mb-8">
						<div className="text-xl font-medium text-gray-900">
							Hello, {name}
						</div>
						<p className="text-gray-500 mt-2">
							Here is your daily activities and job alerts
						</p>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{stats.map((stat) => (
							<StatsCard key={stat.label} {...stat} />
						))}
					</div>

					{/* Recently Applied Section */}
					<div className="flex justify-between items-center mb-4">
						<div className="text-gray-900 font-medium">Popular Jobs</div>
					</div>

					<RecentlyAppliedTable
						jobs={jobs}
						onViewDetailsClick={handleViewDetailsClick}
					/>
				</div>
			</div>
			<Footer />
			{selectedJob && (
				<ApplyJobModel
					isOpen={!!selectedJob}
					onClose={() => setSelectedJob(null)}
					selectedJob={selectedJob}
					closeModal={closeModal}
					jobData={jobData}
				/>
			)}
		</AppWrapper>
	);
};

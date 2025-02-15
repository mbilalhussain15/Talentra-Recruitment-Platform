import React, { useEffect, useState } from "react";
import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../views/ApplicantDashboard/components/Footer";
import { Sidebar } from "./components/Sidebar";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RecentlyAppliedTable } from "./components/RecentlyAppliedTable";
import { useSelector } from "react-redux";
import axios from "axios";

const AppliedJobs = () => {
	const { user } = useSelector((state) => state.auth);
	const loggedInUserId = user?.userId;
	console.log("Logged in user ID:", loggedInUserId);
	const [allJobs, setAllJobs] = useState([]);
	const [appliedJobs, setAppliedJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [applicants, setApplicants] = useState([]);
	useEffect(() => {
		const fetchJobs = async () => {
			if (!loggedInUserId) return;

			try {
				const allJobsResponse = await axios.get(
					"http://localhost:5003/api/applicant/fetchJobs",
					{
					  withCredentials: true, // Send cookies with the request
					}
				  );
				  const appliedJobsResponse = await axios.get(
					`http://localhost:5003/api/applicant/appliedJobs/${loggedInUserId}`,
					{
					  withCredentials: true, // Send cookies with the request
					}
				  );
				const allJobs = allJobsResponse.data || [];
				const appliedJobs = appliedJobsResponse.data || [];
				setAllJobs(allJobs.jobs);
				setAppliedJobs(appliedJobs);
				console.log("All Jobs:", allJobs.jobs);
				console.log("Applied Jobs==========:", appliedJobs);

			

				const appliedJobIds = new Set(
					appliedJobs.map((appliedJob) => String(appliedJob.jobId).trim())
				);

				console.log("Applied Job IDs Set:", appliedJobIds);

				const filteredJobs = allJobs.jobs.filter((job) =>
					appliedJobIds.has(String(job._id).trim())
				);

				console.log("Filtered Jobs:", filteredJobs);
				setFilteredJobs(filteredJobs);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			}
			
		};

		fetchJobs();
	}, [loggedInUserId]);

	useEffect(() => {
		console.log("Updated filteredJobs:", filteredJobs);
	}, [filteredJobs]);

	return (
		<AppWrapper>
			<Navbar />
			<div className="flex min-h-screen">
				<Sidebar />
				<main className="flex-1 p-8">
					<h2 className="text-xl font-medium text-gray-900 mb-4">
						Applied Jobs
					</h2>

					{/* Recently Applied Section */}
					<div className="flex justify-between items-center mb-4">
						<div className="text-gray-900 font-medium">Recently Applied</div>
						<Link
							to="/"
							className="text-gray-900 font-medium flex items-center gap-2"
						>
							View all
							<ArrowRightIcon className="w-4 h-4" />
						</Link>
					</div>

					<div className="bg-white rounded-lg shadow">
						{/* <RecentlyAppliedTable jobs={applicants} /> */}
						<div className="overflow-x-auto max-h-[500px] overflow-y-auto p-2">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
										<th className="py-3 px-6">Jobs</th>
										<th className="py-3 px-6">Role</th>
										<th className="py-3 px-6">Level</th>
										<th className="py-3 px-6">Experience</th>
										<th className="py-3 px-6">Salary</th>
										<th className="py-3 px-6">Job Type</th>
										<th className="py-3 px-6">Vacancies</th>
									</tr>
								</thead>
								<tbody>
									{appliedJobs.length > 0 ? (
										appliedJobs.map((job, jobIdx) =>
											job.applicants.map((applicant, appIdx) => (
												<tr
													key={`${jobIdx}-${appIdx}`}
													className="border-t border-[#E4E5E8] transition duration-200"
												>
													<td className="py-4 px-6 flex flex-col items-start gap-1 whitespace-nowrap">
														<p className="font-medium text-[#5E6670] text-md">
															{job.title}
														</p>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															<p className="font-normal text-sm">
																{applicant.jobRole}
															</p>
														</div>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															<p className="font-normal text-sm">
																{applicant.jobLevel}
															</p>
														</div>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															<p className="font-normal text-sm">
																{applicant.experience}
															</p>
														</div>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															<p className="font-normal text-sm">
																{applicant.minSalary}
															</p>
														</div>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															{applicant.jobType}
														</div>
													</td>
													<td className="py-4 px-6 text-[#5E6670] space-x-2">
														<div className="flex items-center gap-2">
															{applicant.vacancies}
														</div>
													</td>
												</tr>
											))
										)
									) : (
										<tr>
											<td
												colSpan="6"
												className="py-4 px-6 text-center text-[#5E6670]"
											>
												No applied jobs found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</AppWrapper>
	);
};

export default AppliedJobs;


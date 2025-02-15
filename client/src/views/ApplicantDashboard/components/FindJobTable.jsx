import React from "react";
import { DollarSignIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

export const FindJobsTable = ({ jobs = [], onViewDetailsClick }) => {
	const { user } = useSelector((state) => state.auth);
	const loggedInUserId = user?.userId;
	if (!Array.isArray(jobs)) {
		console.error("Expected an array but received:", jobs);
		return <div>No applied jobs available.</div>;
	}

	const handleApply = async (job) => {
		console.log("Handle Apply");
		console.log("Logged In User ID:", loggedInUserId);
		console.log("JOB ID", job._id);
		console.log("job user id",job.userId)
		try {
			const response = await axios.post(
				"http://localhost:5003/api/applicant/applyForJob",
				{
					jobId: job._id,
					jobUserId:job.userId,
					userId: loggedInUserId,
					withCredentials: true,
				}
			);
			console.log("Application successful:", response.data);
			alert("Application successful");
		} catch (error) {
			console.error("Error applying for job:", error);
			alert("Error applying for job");
		}
	};

	const handleFavourite = async (jobId) => {
		try {
			const response = await axios.post(
				`http://localhost:5003/api/applicant/addFavouriteJob`,
				{ jobId: jobId, userId: loggedInUserId,  credentials: 'include', }	
			);
			console.log("Added to favourites:", response.data);
			alert("Added to favourites");
		} catch (error) {
			console.error("Error adding to favourites:", error);
			alert("Error adding to favourites");
		}
	};

	const JobTypeBadge = ({ type }) => (
		<span className="px-2.5 py-0.5 rounded-full text-[13px] font-medium bg-blue-50/50 text-[#3B82F6]">
			{type}
		</span>
	);

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="overflow-x-auto max-h-[500px] overflow-y-auto p-2">
			<table className="w-full text-left text-sm">
				<thead>
					<tr className="text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
						<th className="py-3 px-6">Jobs</th>
						<th className="py-3 px-6">Role</th>
						<th className="py-3 px-6">Level</th>
						<th className="py-3 px-6">Vacancies</th>
						<th className="py-3 px-6">Expiration Date</th>
						<th className="py-3 px-6">Job Type</th>
						<th className="py-3 px-6">Actions</th>
					</tr>
				</thead>
				<tbody>
					{jobs.length > 0 ? (
						jobs.map((job, idx) => (
							<tr
								key={idx}
								className="border-t border-[#E4E5E8] transition duration-200"
							>
								<td className="py-4 px-6 flex flex-col items-start gap-1 whitespace-nowrap">
									<p className="font-medium text-[#5E6670] text-md">
										{job.title}
									</p>
								</td>
								<td className="py-4 px-6 text-[#5E6670] space-x-2">
									<div className="flex items-center gap-2">
										<p className="font-normal text-sm">{job.jobRole}</p>
									</div>
								</td>
								<td className="py-4 px-6 text-[#5E6670] space-x-2">
									<div className="flex items-center gap-2">
										<p className="font-normal text-sm">{job.jobLevel}</p>
									</div>
								</td>
								<td className="py-4 px-6 text-[#5E6670] space-x-2">
									<div className="flex items-center gap-2">
										<p className="font-normal text-sm">{job.vacancies}</p>
									</div>
								</td>
								<td className="py-4 px-6 text-[#5E6670] space-x-2 whitespace-nowrap">
									<div className="flex items-center gap-2">
										<p className="font-normal text-sm">
											{new Date(job.expirationDate).toLocaleDateString(
												"en-GB",
												{
													day: "2-digit",
													month: "long",
													year: "numeric",
												}
											)}
										</p>
									</div>
								</td>
								<td className="py-4 px-6 text-[#5E6670] space-x-2">
									<div className="flex items-center gap-2">
										<p className="font-normal text-sm">{job.jobType}</p>
									</div>
								</td>
								<td className="py-4 px-6 relative whitespace-nowrap">
									<button
										className="cursor-pointer font-semibold p-2 rounded-sm text-[#0A65CC] bg-[#F1F2F4]"
										onClick={() => handleApply(job)}
									>
										Apply
									</button>
									<button
										className="cursor-pointer font-semibold ml-4 p-2 rounded-sm text-[#0A65CC] bg-[#F1F2F4]"
										onClick={() => handleFavourite(job._id)}
									>
										Add to favourites
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" className="text-center py-4 text-gray-500">
								No applied jobs found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
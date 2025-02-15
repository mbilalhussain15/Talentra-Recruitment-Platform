import React,{ useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";

const ApplyJobModel = ({ onClose, selectedJob, closeModal, jobData }) => {
	console.log("job dataaa 01===>", jobData);
	const [selectedJobUserId, setSelectedJobUserId] = useState(null);
	const { user } = useSelector((state) => state.auth);
	const loggedInUserId = user?.userId;
	const job = {
		title: "Senior UI/UX Designer",
		skills: "Figma, Sketch, Adobe XD",
		salary: "$70,000 - $90,000",
		type: "Full-time",
	};


	useEffect(() => {
		if (jobData.userId) {
			setSelectedJobUserId(jobData.userId);
		}
	  }, [jobData]);


	const handleApply = async () => {
		console.log("Selected Job:", selectedJob);
		console.log("User:", loggedInUserId);
		console.log("Selected Job User ID:", selectedJobUserId);
		try {
			const response = await axios.post(
				"http://localhost:5003/api/applicant/applyForJob",
				{
					jobId: selectedJob,
					userId: loggedInUserId,
					jobUserId: selectedJobUserId,
					withCredentials: true,
				}
			);
			console.log("Application successful:", response.data);
			alert("Application successful");
			onClose();
		} catch (error) {
			console.error("Error applying for job:", error);
			alert("Error applying for job");
		}
	};

	const handleFavourite = async () => {
		console.log("Selected Job:", selectedJob);
		console.log("User:", loggedInUserId);
		try {
			const response = await axios.post(
				`http://localhost:5003/api/applicant/addFavouriteJob`,
				{ jobId: selectedJob, userId: loggedInUserId, withCredentials: true }
			);
			console.log("Added to favourites:", response.data);
			alert("Added to favourites");
			onClose();
		} catch (error) {
			console.error("Error adding to favourites:", error);
			alert("Error adding to favourites");
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-50">
			<div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
				<div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
					<h2 className="text-lg font-semibold text-[#18191C]">
						{jobData.title}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<RxCross2 size={20} />
					</button>
				</div>
				<div className="p-6">
					<p>
						<strong>Role:</strong> {jobData.jobRole}
					</p>
					<p>
						<strong>Salary:</strong> {jobData.minSalary}
					</p>
					<p>
						<strong>Type:</strong> {jobData.jobType}
					</p>
					<button
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
						onClick={() => handleApply()}
					>
						Apply Now
					</button>
					<button
						style={{ backgroundColor: "grey", color: "white" }}
						className="mt-4 px-4 py-2 ml-4 bg-blue-600 text-white rounded-lg"
						onClick={() => handleFavourite()}
					>
						Add to Favourites
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApplyJobModel;

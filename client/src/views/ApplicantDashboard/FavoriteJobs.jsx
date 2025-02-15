import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegCircleCheck, FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { BiDownload } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import { Footer } from "../../views/ApplicantDashboard/components/Footer";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "./components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const FavoriteJobs = () => {
	const { user } = useSelector((state) => state.auth);
	const loggedInUserId = user?.userId;
	console.log("User:", loggedInUserId);
	const [selected, setSelected] = useState(null);
	const [isOpen, setIsOpen] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [favoriteJobs, setFavoriteJobs] = useState([]);
	const dropdownRef = useRef(null);

	const toggleDropdown = (idx) => {
		setIsOpen(isOpen === idx ? null : idx);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
				setIsOpen(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const [filteredJobs, setFilteredJobs] = useState([]);

	useEffect(() => {
		const fetchJobs = async () => {
			if (!loggedInUserId) return;

			try {
				const allJobsResponse = await axios.get(
					"http://localhost:5003/api/applicant/fetchJobs", {
						withCredentials: true, // Send cookies with the request
					  });
				const favoriteJobsResponse = await axios.get(
					`http://localhost:5003/api/applicant/fetchFavouriteJobs/${loggedInUserId}`, {
						withCredentials: true, // Send cookies with the request
					  });

				const allJobs = allJobsResponse.data || [];
				const favoriteJobs = favoriteJobsResponse.data || [];

				console.log("All Jobs:", allJobs.jobs);
				console.log("Favorite Jobs:", favoriteJobs);

				const favoriteJobIds = new Set(
					favoriteJobs.map((favoriteJob) => String(favoriteJob.jobId).trim())
				);

				console.log("Favorite Job IDs Set:", favoriteJobIds);

				const filteredJobs = allJobs.jobs.filter((job) =>
					favoriteJobIds.has(String(job._id).trim())
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
						Favorite Jobs
					</h2>
					<div className="bg-white mb-10 p-6 max-w-7xl">
						<div className="bg-white rounded-lg">
							<div className="p-4 flex justify-between items-center">
								<div className="text-[#767F8C] flex items-center gap-4 text-md font-medium"></div>
							</div>
							<div className="w-full text-left text-sm ">
								{filteredJobs.map((job, idx) => (
									<div
										onClick={() => setSelected(idx)}
										key={job._id}
										className={`${
											selected === idx
												? " rounded-lg tb outline-[#0A65CC] outline"
												: "border-t  border-[#E4E5E8]"
										} transition duration-200 flex items-center justify-between gap-[13vw]`}
									>
										<div className="py-4 px-6 flex items-center gap-2">
											{/* <div className="bg-[#767F8C] w-12 h-12 rounded-sm"></div> */}
											<div>
												<p className="font-medium text-[#18191C] text-md">
													{job.title}
												</p>
												<p className="text-[#767F8C] text-sm font-normal">
													{job.location}
												</p>
												<p className="text-[#767F8C] text-sm font-normal">
													{job.minSalary+" $"}
												</p>
											</div>
										</div>
										<div className="py-4 px-6 relative">
											<div className="text-md flex items-center gap-5 ">
												<div
													className={`${
														selected === idx
															? "bg-[#E7F0FA] p-2 rounded-sm"
															: "p-2"
													}`}
												>
													{job.isFavorite ? (
														<FaBookmark
															color="#0A65CC"
															onClick={() => handleBookmarkToggle(job._id)}
														/>
													) : (
														<FaRegBookmark
															color="#0A65CC"
															onClick={() => handleBookmarkToggle(job._id)}
														/>
													)}
												</div>
												<button className="cursor-pointer font-semibold px-3 py-2 flex items-center gap-2 rounded-sm text-[#0A65CC] bg-[#E7F0FA]">
													Apply Now
													<IoMdArrowForward />
												</button>
												<div
													onClick={() => toggleDropdown(idx)}
													className={`${
														selected === idx
															? "p-2 bg-[#F1F2F4] rounded-sm"
															: "p-2"
													} cursor-pointer`}
												>
													<HiOutlineDotsVertical
														size={20}
														color={`${selected === idx ? "black" : "#767F8C"}`}
													/>
												</div>
											</div>
											{isOpen === idx && (
												<div
													className="absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md"
													style={{
														top: "90%",
														minWidth: "150px",
													}}
												>
													<button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
														<CiMail size={20} />
														View Job
													</button>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</AppWrapper>
	);
};

export default FavoriteJobs;

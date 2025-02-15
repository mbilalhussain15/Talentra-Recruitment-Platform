import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../ApplicantDashboard/components/Footer";
import { Sidebar } from "./components/Sidebar";
import {
	useGetApplicantQuery,
	useUpdateApplicantMutation,
} from "../../redux/slices/api/applicantApi"; // Updated import
import axios from "axios";

const ProfileTab = () => {
	const { user } = useSelector((state) => state.auth);
	const userId = user?.userId;

	const [name, setName] = useState("");
	const [skills, setSkills] = useState([]);
	const [newSkill, setNewSkill] = useState("");
	const [resume, setResume] = useState("");
	const [resumeName, setResumeName] = useState("No resume uploaded");
	const [education, setEducation] = useState([]);
	const [newEducation, setNewEducation] = useState({
		institutionName: "",
		startYear: "",
		endYear: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	// RTK Query hook to fetch applicant data
	const {
		data: applicantData,
		isLoading,
		isError,
		error,
	} = useGetApplicantQuery(userId);

	// RTK Query hook for updating applicant data
	const [updateApplicant, { isLoading: isUpdating, error: updateError }] =
		useUpdateApplicantMutation();

	// Fetch and populate form fields when applicantData changes
	useEffect(() => {
		if (applicantData) {
			setName(applicantData.name || "");
			setSkills(applicantData.skills || []);
			setEducation(applicantData.education || []);
			if (applicantData.resume) {
				setResume(applicantData.resume);
				setResumeName("Uploaded Resume");
			}
		}
	}, [applicantData]);

	// Handle Update
	const handleUpdate = async () => {
		try {
			const updatedData = {
				name,
				skills,
				education: education.length > 0 ? education : undefined, // Send only if education exists
				resume: resume ? resume.name : undefined, // Send resume name if resume exists, otherwise undefined
			};

			// Use RTK query hook to update the applicant
			const response = await updateApplicant({
				userId,
				data: updatedData,
			}).unwrap(); // unwrap gives the response directly

			alert("Profile updated successfully!");
			setIsEditing(false);

			// Update local state with response data
			setName(response.name);
			setSkills(response.skills);
			setEducation(response.education);
			if (response.resume) {
				setResume(response.resume);
				setResumeName("Uploaded Resume");
			}
		} catch (err) {
			console.error("Error updating profile:", err);
			alert("Failed to update profile.");
		}
	};

	const handleResumeUpload = async () => {
		console.log("Resume:", resume);
		console.log("UserId:", userId);

		try {
			if (!resume) {
				alert("Please select a resume file before uploading.");
				return;
			}

			const formData = new FormData();
			formData.append("resume", resume); // Attach the resume file

			// Make the API call using axios
			const response = await axios.post(
				`http://localhost:5003/api/applicant/uploadResume/${userId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						
					},
					withCredentials: true,
					
				}
			);

			// Handle success
			alert("Resume uploaded successfully!");
			console.log("Uploaded Resume:", response.data);
		} catch (error) {
			console.error("Error uploading resume:", error);
			alert("Failed to upload resume. Please try again.");
		}
	};

	const handleViewResume = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5003/api/applicant/fetchResume/${userId}`,
				{
					responseType: "blob", // Get the file as a blob
				}
			);

			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = URL.createObjectURL(blob);
			window.open(url, "_blank"); // Open the PDF in a new tab
		} catch (error) {
			console.error("Error fetching resume:", error);
			alert("Failed to fetch resume. Please try again.");
		}
	};

	// Add new skill
	const addSkill = () => {
		if (newSkill.trim()) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
			console.log("Skills:", skills);
		}
	};

	// Delete a skill
	const deleteSkill = (skillToDelete) => {
		setSkills(skills.filter((skill) => skill !== skillToDelete));
	};

	// const addEducation = () => {
	// 	if (
	// 		newEducation.institutionName.trim() &&
	// 		newEducation.startYear &&
	// 		newEducation.endYear
	// 	) {
	// 		setEducation([...education, newEducation]);
	// 		setNewEducation({ institutionName: "", startYear: "", endYear: "" }); // Reset fields after adding
	// 	}
	// };

	// const deleteEducation = (educationToDelete) => {
	// 	setEducation(education.filter((edu) => edu !== educationToDelete));
	// };

	const addEducation = () => {
		if (
			newEducation.institutionName.trim() &&
			newEducation.startYear &&
			newEducation.endYear
		) {
			const formattedEducation = `${newEducation.institutionName} (${newEducation.startYear} - ${newEducation.endYear})`;
			setEducation([...education, formattedEducation]); // Store as a string
			setNewEducation({ institutionName: "", startYear: "", endYear: "" }); // Reset fields after adding
			console.log("Education:", education);
			console.log("formatted Education:", formattedEducation);
		}
	};

	// Delete an education entry
	const deleteEducation = (educationToDelete) => {
		setEducation(education.filter((edu) => edu !== educationToDelete));
	};

	useEffect(() => {
		console.log("Updated Education State:", education);
	}, [education]); // Runs whenever education updates
	

	// Handle loading/error states
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error loading applicant data: {error.message}</p>;
	}

	return (
		<AppWrapper>
			<Navbar />
			<div className="flex min-h-screen">
				<Sidebar />
				<main className="flex-1 p-8">
					<div className="p-6 bg-blue-50 rounded-lg shadow-lg">
						<h1 className="text-4xl font-bold text-blue-600 mb-6">
							Your Profile
						</h1>

						{/* Name */}
						<div className="mb-6">
							<label className="block text-blue-600 font-semibold text-xl mb-2">
								Name
							</label>
							{isEditing ? (
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full p-3 border border-gray-300 rounded-lg"
								/>
							) : (
								<p className="text-xl text-black">{name}</p>
							)}
						</div>

						{/* Skills */}
						<div className="mb-6">
							<label className="block text-blue-600 font-semibold text-xl mb-2">
								Skills
							</label>
							{isEditing ? (
								<div>
									<input
										type="text"
										value={newSkill}
										onChange={(e) => setNewSkill(e.target.value)}
										className="w-full p-3 border border-gray-300 rounded-lg"
									/>
									<button
										onClick={addSkill}
										className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg"
									>
										Add
									</button>
								</div>
							) : null}

							<div className="flex flex-wrap gap-2 mt-2">
								{skills.map((skill, index) => (
									<div
										key={index}
										className="px-3 py-1 bg-blue-200 rounded-lg flex items-center gap-2"
									>
										{skill}
										<button
											onClick={() => deleteSkill(skill)}
											className="text-red-600"
										>
											&times;
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Education */}
						<div className="mb-6">
							<label className="block text-blue-600 font-semibold text-xl mb-2">
								Education
							</label>
							{isEditing ? (
								<div>
									<input
										type="text"
										value={newEducation.institutionName}
										onChange={(e) =>
											setNewEducation({
												...newEducation,
												institutionName: e.target.value,
											})
										}
										placeholder="Institution Name"
										className="w-full p-3 border border-gray-300 rounded-lg mb-2"
									/>
									<input
										type="text"
										value={newEducation.startYear}
										onChange={(e) =>
											setNewEducation({
												...newEducation,
												startYear: e.target.value,
											})
										}
										placeholder="Start Year"
										className="w-full p-3 border border-gray-300 rounded-lg mb-2"
									/>
									<input
										type="text"
										value={newEducation.endYear}
										onChange={(e) =>
											setNewEducation({
												...newEducation,
												endYear: e.target.value,
											})
										}
										placeholder="End Year"
										className="w-full p-3 border border-gray-300 rounded-lg mb-2"
									/>
									<button
										onClick={addEducation}
										className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg"
									>
										Add
									</button>
								</div>
							) : null}

							<div className="flex flex-wrap gap-2 mt-2">
								{education.map((education, index) => (
									<div
										key={index}
										className="px-3 py-1 bg-blue-200 rounded-lg flex items-center gap-2"
									>
										{education}
										<button
											onClick={() => deleteEducation(education)}
											className="text-red-600"
										>
											&times;
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Resume */}
						<div className="mb-6">
							<label className="block text-blue-600 font-semibold text-xl mb-2">
								Resume
							</label>

							<input
								type="file"
								onChange={(e) => setResume(e.target.files[0])}
								className="w-full p-3 border border-gray-300 rounded-lg"
							/>

							<div className="flex items-center gap-4">
								<p className="text-xl text-black">{resumeName}</p>
								<button
									onClick={handleViewResume}
									className={`px-3 py-2 rounded-lg ${
										resume
											? "bg-blue-500 text-white"
											: "bg-gray-400 text-gray-700 cursor-not-allowed"
									}`}
									disabled={!resume}
								>
									View Resume
								</button>
								<button
									onClick={() => {
										console.log("clicked", resume);
										// document.getElementById("resumeUpload").click();
										handleResumeUpload();
									}}
									className="bg-green-500 text-white px-3 py-2 rounded-lg"
								>
									Upload Resume
								</button>
							</div>
						</div>

						{/* Update Button */}
						{isEditing ? (
							<button
								onClick={handleUpdate}
								disabled={isUpdating}
								className="bg-green-500 text-white px-4 py-2 rounded-lg"
							>
								{isUpdating ? "Updating..." : "Update Profile"}
							</button>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className="bg-blue-500 text-white px-4 py-2 rounded-lg"
							>
								Edit Profile
							</button>
						)}
					</div>
				</main>
			</div>
			<Footer />
		</AppWrapper>
	);
};

export default ProfileTab;

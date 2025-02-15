import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import axios from "axios";
const countries = [
	{ code: "in", name: "India", flag: "https://flagcdn.com/w20/in.png" },
	{ code: "us", name: "United States", flag: "https://flagcdn.com/w20/us.png" },
	{
		code: "uk",
		name: "United Kingdom",
		flag: "https://flagcdn.com/w20/gb.png",
	},
	{ code: "ca", name: "Canada", flag: "https://flagcdn.com/w20/ca.png" },
];

export const Navbar = ({ showSearch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = async (event) => {
		const value = event.target.value;
		setSearchTerm(value);

		if (value) {
			try {
				const response = await axios.get(
					`http://localhost:5003/api/applicant/filterJobs?title=${searchTerm}`,
					{
						params: { title: value },
					}
				);
				console.log(response.data); // Handle the response data as needed
			} catch (error) {
				console.error("Error fetching jobs:", error);
			}
		}
	};

	return (
		<>
			<div className="bg-white">
				{/* Main Navbar - existing code */}
				<nav className="bg-white border-b border-gray-100">
					<div className="max-w-[1440px] mx-auto px-6 py-3.5">
						<div className="flex items-center">
							{/* Logo */}
							<div className="flex items-center gap-2">
								<img
									src="/assets/icons/applied-job-stat.png"
									className="w-6 h-6"
								/>
								<span className="text-[17px] font-semibold text-gray-900">
									Talentra
								</span>
							</div>

							{/* Country selector */}
							{showSearch ? (
								<div className="ml-8 w-[60%] border rounded-lg flex items-center  justify-between border-gray-200 p-2">
									<div className="relative flex-1 border-r border-gray-300 mr-4">
										<button
											onClick={() => setIsOpen(!isOpen)}
											className="flex items-center cursor-pointer gap-2 py-1.5 px-3 rounded-full transition-colors w-[180px]"
										>
											<img
												src={selectedCountry.flag}
												alt={selectedCountry.name}
												className="w-5 h-3.5 object-cover"
											/>
											<span className="text-sm text-gray-700">
												{selectedCountry.name}
											</span>
											<ChevronDown className="w-4 h-4 text-gray-500 stroke-[1.5px]" />
										</button>

										{isOpen && (
											<div className="z-50 absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
												{countries.map((country) => (
													<button
														key={country.code}
														className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-[15px] text-gray-700 hover:bg-gray-50"
														onClick={() => {
															setSelectedCountry(country);
															setIsOpen(false);
														}}
													>
														<img
															src={country.flag}
															alt={country.name}
															className="w-5 h-3.5 object-cover"
														/>
														{country.name}
													</button>
												))}
											</div>
										)}
									</div>

									{/* Search bar */}
									<div className="w-full  relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Search className="h-[18px] w-[18px] text-gray-400 stroke-[1.5px]" />
										</div>
										<input
											type="text"
											placeholder="Job tittle, keyword, company"
											className="w-full pl-10 pr-4 py-2 bg-white  rounded-lg text-[15px] placeholder-gray-400 focus:outline-none"
											onChange={handleSearchChange}
											value={searchTerm}
										/>
									</div>
								</div>
							) : null}
							{/* Profile */}
							<div className="flex items-center ml-auto">
								<div className="w-10 h-10 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
									<svg
										className="w-[22px] h-[22px] text-gray-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

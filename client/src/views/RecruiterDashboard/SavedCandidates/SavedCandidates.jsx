
// import React, { useState, useEffect, useRef } from "react";
// import { IoMdArrowForward } from "react-icons/io";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { RxCrossCircled } from "react-icons/rx";
// import { GoPeople } from "react-icons/go";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { IoEyeOutline } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";
// import { MdAddCircleOutline } from "react-icons/md";
// import { jobData } from "../../../libs/jobsData";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { FaBookmark } from "react-icons/fa";
// import { CiMail } from "react-icons/ci";
// import { BiDownload } from "react-icons/bi";
// import { BsDownload } from "react-icons/bs";
// import { useGetAllShortlistedCandidatesQuery } from "../../../redux/slices/api/recruiterApi";

// const userList = [
//     { name: "Guy Hawkins", role: "Technical Support Specialist" },
//     { name: "Jacob Jones", role: "Product Designer" },
//     { name: "Cameron Williamson", role: "Marketing Officer" },
//     { name: "Robert Fox", role: "Marketing Manager" },
//     { name: "Kathryn Murphy", role: "Junior Graphic Designer" },
//     { name: "Darlene Robertson", role: "Visual Designer" },
//     { name: "Kristin Watson", role: "Senior UX Designer" },
//     { name: "Jenny Wilson", role: "Interaction Designer" },
//     { name: "Marvin McKinney", role: "Networking Engineer" },
//     { name: "Theresa Webb", role: "Software Engineer" }
//   ];
  

// const SavedCandidates = () => {
//       const [selected, setSelected] = useState(null);
//       const [isOpen, setIsOpen] = useState(null);
//       const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//       const dropdownRef = useRef(null);
    
//       const toggleDropdown = (idx) => {
//         setIsOpen(isOpen === idx ? null : idx);
//       };
    
//       const options = ["All Jobs", "Active Jobs", "Expired Jobs"];
    
//       useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (
//             dropdownRef.current &&
//             !dropdownRef.current.contains(event.target)
//           ) {
//             setIsDropdownOpen(false);
//             setIsOpen(null);
//           }
//         };
    
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//           document.removeEventListener("mousedown", handleClickOutside);
//         };
//       }, []);
//   return (
//     <div className="bg-white mb-10 p-6 max-w-7xl">
//     <div className="bg-white rounded-lg">
//       <div className="p-4 flex justify-between items-center">
//         <h2 className="text-md font-medium text-[#18191C]">Saved Cadidates</h2>
//         <div
//           className="text-[#767F8C] flex items-center gap-4 text-md font-medium"
//         >       
//         </div>
//       </div>
//       <div className="w-full text-left text-sm ">
//           {userList.map((job, idx) => (
//             <div
//               onClick={() => setSelected(idx)}
//               key={idx}
//               className={`${
//                 selected === idx
//                   ? " rounded-lg tb outline-[#0A65CC] outline"
//                   : "border-t  border-[#E4E5E8]"
//               } transition duration-200 flex items-center justify-between gap-[13vw]`}
//             >
//               <div className="py-4 px-6 flex items-center gap-2">
//                 <div className="bg-[#767F8C] w-12 h-12 rounded-sm"></div>
//                 <div>
//                 <p className="font-medium text-[#18191C] text-md">
//                   {job.name}
//                 </p>
//                 <p className="text-[#767F8C] text-sm font-normal">
//                   {job.role}
//                 </p>
//                 </div>
               
//               </div>
             
//               <div className="py-4 px-6 relative">
//                 <div className="text-md flex items-center gap-5 ">
//                     <div className={`${selected===idx ? "bg-[#E7F0FA] p-2 rounded-sm" : "p-2"}`}>
//                     <FaBookmark color='#0A65CC'/>
//                     </div>
//                   <button className="cursor-pointer font-semibold px-3 py-2 flex items-center gap-2 rounded-sm text-[#0A65CC] bg-[#E7F0FA]">
//                     View Profile
//                     <IoMdArrowForward />
//                   </button>
//                   <div
//                     onClick={() => toggleDropdown(idx)}
//                     className={`${
//                       selected === idx ? "p-2 bg-[#F1F2F4] rounded-sm" : "p-2"
//                     } cursor-pointer`}
//                   >
//                     <HiOutlineDotsVertical
//                       size={20}
//                       color={`${selected === idx ? "black" : "#767F8C"}`}
//                     />
//                   </div>
//                 </div>

//                 {isOpen === idx && (
//                   <div
//                     className="absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md"
//                     style={{
//                       top: "90%",
//                       minWidth: "150px",
//                     }}
//                   >
//                     <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
//                     <CiMail size={20}/>
//                       Send Email
//                     </button>
//                     <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
//                     <BsDownload size={20}/>
//                       Download Cv
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   </div>
//   )
// }

// export default SavedCandidates


// import React, { useState, useEffect, useRef } from "react";
// import { IoMdArrowForward } from "react-icons/io";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { RxCrossCircled } from "react-icons/rx";
// import { GoPeople } from "react-icons/go";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { IoEyeOutline } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";
// import { MdAddCircleOutline } from "react-icons/md";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { FaBookmark } from "react-icons/fa";
// import { CiMail } from "react-icons/ci";
// import { BiDownload } from "react-icons/bi";
// import { BsDownload } from "react-icons/bs";
// import { useGetAllShortlistedCandidatesQuery } from "../../../redux/slices/api/recruiterApi.js";

// const SavedCandidates = () => {
//   const [selected, setSelected] = useState(null);
//   const [isOpen, setIsOpen] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const { data: shortlistedCandidates, error, isLoading } = useGetAllShortlistedCandidatesQuery();

//   console.log(shortlistedCandidates);
//   const toggleDropdown = (idx) => {
//     setIsOpen(isOpen === idx ? null : idx);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//         setIsOpen(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading shortlisted candidates</div>;
//   }

//   return (
//     <div className="bg-white mb-10 p-6 max-w-7xl">
//       <div className="bg-white rounded-lg">
//         <div className="p-4 flex justify-between items-center">
//           <h2 className="text-md font-medium text-[#18191C]">Saved Candidates</h2>
//           <div className="text-[#767F8C] flex items-center gap-4 text-md font-medium"></div>
//         </div>
//         <div className="w-full text-left text-sm">
//           {shortlistedCandidates?.shortlistedApplications.map((application, idx) => (
//             <div
//               onClick={() => setSelected(idx)}
//               key={idx}
//               className={`${
//                 selected === idx
//                   ? " rounded-lg tb outline-[#0A65CC] outline"
//                   : "border-t  border-[#E4E5E8]"
//               } transition duration-200 flex items-center justify-between gap-[13vw]`}
//             >
//               <div className="py-4 px-6 flex items-center gap-2">
//                 <div className="bg-[#767F8C] w-12 h-12 rounded-sm"></div>
//                 <div>
//                   <p className="font-medium text-[#18191C] text-md">
//                     {application.applicantId.name}
//                   </p>
//                   <p className="text-[#767F8C] text-sm font-normal">
//                     {application.applicantId.role}
//                   </p>
//                 </div>
//               </div>
//               <div className="py-4 px-6 relative">
//                 <div className="text-md flex items-center gap-5">
//                   <div className={`${selected === idx ? "bg-[#E7F0FA] p-2 rounded-sm" : "p-2"}`}>
//                     <FaBookmark color='#0A65CC'/>
//                   </div>
//                   <button className="cursor-pointer font-semibold px-3 py-2 flex items-center gap-2 rounded-sm text-[#0A65CC] bg-[#E7F0FA]">
//                     View Profile
//                     <IoMdArrowForward />
//                   </button>
//                   <div
//                     onClick={() => toggleDropdown(idx)}
//                     className={`${
//                       selected === idx ? "p-2 bg-[#F1F2F4] rounded-sm" : "p-2"
//                     } cursor-pointer`}
//                   >
//                     <HiOutlineDotsVertical
//                       size={20}
//                       color={`${selected === idx ? "black" : "#767F8C"}`}
//                     />
//                   </div>
//                 </div>

//                 {isOpen === idx && (
//                   <div
//                     className="absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md"
//                     style={{
//                       top: "90%",
//                       minWidth: "150px",
//                     }}
//                   >
//                     <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
//                       <CiMail size={20}/>
//                       Send Email
//                     </button>
//                     <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
//                       <BsDownload size={20}/>
//                       Download Cv
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SavedCandidates;

import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BiDownload } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import { useGetAllShortlistedCandidatesQuery } from "../../../redux/slices/api/recruiterApi";
import { useSelector } from "react-redux";

const SavedCandidates = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

   const { user } = useSelector((state) => state.auth);
    const jobUserId = user?.userId 

  const { data: shortlistedCandidates, error, isLoading } = useGetAllShortlistedCandidatesQuery(jobUserId);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shortlisted candidates</div>;
  }

const applications = shortlistedCandidates?.shortlistedApplicants || [];
console.log("application",applications);
console.log("shortlist",shortlistedCandidates?.shortlistedApplicants);
  return (
    <div className="bg-white mb-10 p-6 max-w-7xl">
      <div className="bg-white rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-md font-medium text-[#18191C]">Saved Candidates</h2>
          <div className="text-[#767F8C] flex items-center gap-4 text-md font-medium"></div>
        </div>
        <div className="w-full text-left text-sm">
          {applications.length > 0 ? (
            applications.map((application, idx) => (
              <div
                onClick={() => setSelected(idx)}
                key={idx}
                className={`${
                  selected === idx
                    ? " rounded-lg tb outline-[#0A65CC] outline"
                    : "border-t  border-[#E4E5E8]"
                } transition duration-200 flex items-center justify-between gap-[13vw]`}
              >
                <div className="py-4 px-6 flex items-center gap-2">
                  <div className="bg-[#767F8C] w-12 h-12 rounded-sm"></div>
                  <div>
                    <p className="font-medium text-[#18191C] text-md">
                      {application.jobTitle}
                    </p>
                    <p className="text-[#767F8C] text-sm font-normal">
                      Application Id: {application._id}
                    </p>
                    
                    <div className="flex space-x-4 overflow-x-auto whitespace-nowrap">
                      <p className="bg-[#F1F3F5] text-[#767F8C] text-sm font-normal px-3 py-1 rounded-full">{application.status}</p>
                      <p className="bg-[#F1F3F5] text-[#767F8C] text-sm font-normal px-3 py-1 rounded-full">{application.jobType}</p>
                      <p className="bg-[#F1F3F5] text-[#767F8C] text-sm font-normal px-3 py-1 rounded-full">{application.jobRole}</p>
                      <p className="bg-[#F1F3F5] text-[#767F8C] text-sm font-normal px-3 py-1 rounded-full">{application.jobLevel}</p>

                    </div>
                  </div>
                </div>
                <div className="py-4 px-6 relative">
                 

                  {isOpen === idx && (
                    <div
                      className="absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md"
                      style={{
                        top: "90%",
                        minWidth: "150px",
                      }}
                    >
                      <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
                        <CiMail size={20}/>
                        Send Email
                      </button>
                      <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
                        <BsDownload size={20}/>
                        Download Cv
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No shortlisted candidates available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCandidates;

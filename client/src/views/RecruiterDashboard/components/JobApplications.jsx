// import React, { useState, useEffect } from "react";
// import { FaEllipsisV, FaPlus, FaSort } from "react-icons/fa";
// import { FiDownload } from "react-icons/fi";
// import { BiEditAlt } from "react-icons/bi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { IoAddCircleOutline } from "react-icons/io5";
// import ApplicationModel from "./ApplicationModel";
// import ChangeStatusPopup from "./ChangeStatusPopup";
// import Modal from "react-modal";
// import { useGetJobApplicationsQuery } from "../../../redux/slices/api/recruiterApi.js";
// import { useLocation } from "react-router-dom";
 
// const JobApplications = () => {
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [isColumnOpen, setIsColumnOpen] = useState(false);
//   const [columnStates, setColumnStates] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);
//   const [statusPopupOpen, setStatusPopupOpen] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
 
//   const location = useLocation();
//   const jobData = location.state?.jobData;
//   const jobId = jobData._id;
//   const userId = jobData.userId;
 
//   const { data: getJobApplications, error, isLoading } = useGetJobApplicationsQuery(jobId);
 
//   const [applicationsData, setApplicationsData] = useState([]);
 
//   useEffect(() => {
//     if (getJobApplications) {
//       setApplicationsData(getJobApplications);
//     }
//   }, [getJobApplications]);
 
//   const handleColumnToggle = (index) => {
//     setColumnStates((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };
 
//   const handleStatusChange = (newStatus) => {
//     if (!selectedApplicant) return;
 
//     let updatedApplicationsData = applicationsData.map((column) => {
//       if (column.applicants.includes(selectedApplicant)) {
//         return {
//           ...column,
//           count: column.count - 1,
//           applicants: column.applicants.filter(applicant => applicant !== selectedApplicant),
//         };
//       }
//       return column;
//     });
 
//     updatedApplicationsData = updatedApplicationsData.map((column) => {
//       if (column.title === newStatus) {
//         return {
//           ...column,
//           count: column.count + 1,
//           applicants: [...column.applicants, { ...selectedApplicant, status: newStatus }],
//         };
//       }
//       return column;
//     });
 
//     setApplicationsData(updatedApplicationsData);
//     setStatusPopupOpen(false);
//   };
 
//   const handleStatusChangeInList = (newStatus) => {
//     if (!selectedApplicant) return;
 
//     let updatedDummyData = getJobApplications.map((item) => {
//       item.applicants = item.applicants.map((applicant) => {
//         if (applicant._id === selectedApplicant._id) {
//           return { ...applicant, status: newStatus };
//         }
//         return applicant;
//       });
//       return item;
//     });
 
//     setApplicationsData(updatedDummyData);
//     setStatusPopupOpen(false);
//   };
 
//   return (
//     <div className="bg-white mb-5 p-6 max-w-7xl mx-auto">
//       <div className="flex flex-wrap items-center justify-between">
//         <h1 className="text-[#18191C] text-xl font-medium mt-4">
//           Job Applications
//         </h1>
 
//         <div className="flex items-center gap-3 mt-4 sm:mt-0">
//           <p>Filter</p>
//           <div className="relative">
//             <button
//               className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[#0A65CC] text-white rounded-sm"
//               onClick={() => setIsSortOpen(!isSortOpen)}
//             >
//               Sort
//             </button>
//             {isSortOpen && (
//               <div className="absolute right-0 mt-2 w-48 border border-[#E9EAED] bg-white shadow-lg rounded-lg">
//                 <p className="text-[#9199A3] text-xs font-medium px-4 py-2 pt-4">
//                   SORT APPLICATION
//                 </p>
//                 <div className="px-4 pb-2">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="sortOrder"
//                       value="newest"
//                       className="form-radio text-[#0A65CC] w-5 h-5"
//                     />
//                     <span className="ml-2">Newest</span>
//                   </label>
//                 </div>
//                 <div className="px-4 pb-2">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="sortOrder"
//                       value="oldest"
//                       className="form-radio text-[#0A65CC] w-5 h-5"
//                     />
//                     <span className="ml-2">Oldest</span>
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-medium text-[#18191C] mb-4">Job Application - Update</h2>
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
//               <th className="py-3 px-6">Name</th>
//               <th className="py-3 px-6">Role</th>
//               <th className="py-3 px-6">Status</th>
//               <th className="py-3 px-6">Submitted at</th>
//               <th className="py-3 px-6">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getJobApplications.map((item, index) => (
//               item.applicants.map((applicant, idx) => (
//                 <tr key={idx} className="border-t border-[#E4E5E8]">
//                   <td className="py-4 px-6">{applicant.name}</td>
//                   <td className="py-4 px-6">{applicant.jobRole}</td>
//                   <td className="py-4 px-6">{applicant.status}</td>
//                   <td className="py-4 px-6">{applicant.applied}</td>
//                   <td className="py-4 px-6">
//                     <button
//                       className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
//                       onClick={() => {
//                         setSelectedApplicant(applicant);
//                         setStatusPopupOpen(true);
//                       }}
//                     >
//                       Change Status
//                     </button>
//                     <button
//                       className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
//                       onClick={() => {
//                         setModalOpen(true);
//                         setApplicationData(applicant);
//                       }}
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ))}
//           </tbody>
//         </table>
//       </div>
 
//       <ChangeStatusPopup
//         isOpen={statusPopupOpen}
//         onClose={() => setStatusPopupOpen(false)}
//         onSave={(newStatus) => {
//           handleStatusChange(newStatus);
//           handleStatusChangeInList(newStatus);
//         }}
//         userId={selectedApplicant?.userId}
//         jobId={jobId}
//       />
//       <ApplicationModel
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         candidate={applicationData?.userId}
//       />
//     </div>
//   );
// };
 
// export default JobApplications;
 
 







import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaPlus, FaSort } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import ApplicationModel from "./ApplicationModel";
import ChangeStatusPopup from "./ChangeStatusPopup";
import Modal from "react-modal";
import { useGetJobApplicationsQuery, useUpdateApplicationStatusMutation } from "../../../redux/slices/api/recruiterApi.js"; // Assuming you have a mutation for status update
import { useLocation } from "react-router-dom";

const JobApplications = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [columnStates, setColumnStates] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const location = useLocation();
  const jobData = location.state?.jobData;
  const jobId = jobData._id;
  const userId = jobData.userId;

  const { data: getJobApplications, error, isLoading, refetch } = useGetJobApplicationsQuery(jobId);
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation(); // Assuming you have a mutation for updating the status
  const [applicationsData, setApplicationsData] = useState([]);

  useEffect(() => {
    if (getJobApplications) {
      setApplicationsData(getJobApplications);
    }
  }, [getJobApplications]);

  const handleColumnToggle = (index) => {
    setColumnStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedApplicant) return;

    // Optimistic UI Update: Update the state immediately
    let updatedApplicationsData = applicationsData.map((column) => {
      if (column.applicants.includes(selectedApplicant)) {
        return {
          ...column,
          count: column.count - 1,
          applicants: column.applicants.filter(applicant => applicant !== selectedApplicant),
        };
      }
      return column;
    });

    updatedApplicationsData = updatedApplicationsData.map((column) => {
      if (column.title === newStatus) {
        return {
          ...column,
          count: column.count + 1,
          applicants: [...column.applicants, { ...selectedApplicant, status: newStatus }],
        };
      }
      return column;
    });

    setApplicationsData(updatedApplicationsData);

    // Call API to persist the status change
    updateApplicationStatus({ applicantId: selectedApplicant._id, newStatus, jobId })
      .then(() => {
        refetch(); // Re-fetch to get updated data from the server
        setStatusPopupOpen(false); // Close the status popup
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setStatusPopupOpen(false); // Close the popup in case of an error
      });
  };

  return (
    <div className="bg-white mb-5 p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-[#18191C] text-xl font-medium mt-4">Job Applications</h1>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <p>Filter</p>
          <div className="relative">
            <button
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[#0A65CC] text-white rounded-sm"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Sort
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 border border-[#E9EAED] bg-white shadow-lg rounded-lg">
                <p className="text-[#9199A3] text-xs font-medium px-4 py-2 pt-4">SORT APPLICATION</p>
                <div className="px-4 pb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sortOrder"
                      value="newest"
                      className="form-radio text-[#0A65CC] w-5 h-5"
                    />
                    <span className="ml-2">Newest</span>
                  </label>
                </div>
                <div className="px-4 pb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sortOrder"
                      value="oldest"
                      className="form-radio text-[#0A65CC] w-5 h-5"
                    />
                    <span className="ml-2">Oldest</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-medium text-[#18191C] mb-4">Job Application - Update</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Submitted at</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((column, index) =>
              column.applicants.map((applicant, idx) => (
                <tr key={idx} className="border-t border-[#E4E5E8]">
                  <td className="py-4 px-6">{applicant.name}</td>
                  <td className="py-4 px-6">{applicant.jobRole}</td>
                  <td className="py-4 px-6">{applicant.status}</td>
                  <td className="py-4 px-6">{applicant.applied}</td>
                  <td className="py-4 px-6">
                    <button
                      className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setStatusPopupOpen(true);
                      }}
                    >
                      Change Status
                    </button>
                    <button
                      className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
                      onClick={() => {
                        setModalOpen(true);
                        setApplicationData(applicant);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ChangeStatusPopup
        isOpen={statusPopupOpen}
        onClose={() => setStatusPopupOpen(false)}
        onSave={(newStatus) => handleStatusChange(newStatus)}
        userId={selectedApplicant?.userId}
        jobId={jobId}
        refetch={refetch}
      />
      <ApplicationModel
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        candidate={applicationData?.userId}
        jobId={jobId}
      />
    </div>
  );
};

export default JobApplications;


















// import React, { useState, useEffect } from "react";
// import { FaEllipsisV, FaPlus, FaSort } from "react-icons/fa";
// import { FiDownload } from "react-icons/fi";
// import { BiEditAlt } from "react-icons/bi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { IoAddCircleOutline } from "react-icons/io5";
// import ApplicationModel from "./ApplicationModel";
// import ChangeStatusPopup from "./ChangeStatusPopup";
// import Modal from "react-modal";
// import { useGetJobApplicationsQuery } from "../../../redux/slices/api/recruiterApi.js";
// import { useLocation } from "react-router-dom";

// const JobApplications = () => {
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [isColumnOpen, setIsColumnOpen] = useState(false);
//   const [columnStates, setColumnStates] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);
//   const [statusPopupOpen, setStatusPopupOpen] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);

//   const location = useLocation();
//   const jobData = location.state?.jobData;
//   const jobId = jobData._id;
//   const userId = jobData.userId;

//   const { data: getJobApplications, error, isLoading, refetch:refetch} = useGetJobApplicationsQuery(jobId);

//   const [applicationsData, setApplicationsData] = useState([]);

//   useEffect(() => {
//     if (getJobApplications) {
//       setApplicationsData(getJobApplications);
//     }
//   }, [getJobApplications]);

//   const handleColumnToggle = (index) => {
//     setColumnStates((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   const handleStatusChange = (newStatus) => {
//     if (!selectedApplicant) return;

//     let updatedApplicationsData = applicationsData.map((column) => {
//       if (column.applicants.includes(selectedApplicant)) {
//         return {
//           ...column,
//           count: column.count - 1,
//           applicants: column.applicants.filter(applicant => applicant !== selectedApplicant),
//         };
//       }
//       return column;
//     });

//     updatedApplicationsData = updatedApplicationsData.map((column) => {
//       if (column.title === newStatus) {
//         return {
//           ...column,
//           count: column.count + 1,
//           applicants: [...column.applicants, { ...selectedApplicant, status: newStatus }],
//         };
//       }
//       return column;
//     });

//     setApplicationsData(updatedApplicationsData);
//     setStatusPopupOpen(false);
//   };

//   const handleStatusChangeInList = (newStatus) => {
//     if (!selectedApplicant) return;

//     let updatedDummyData = getJobApplications.map((item) => {
//       item.applicants = item.applicants.map((applicant) => {
//         if (applicant._id === selectedApplicant._id) {
//           return { ...applicant, status: newStatus };
//         }
//         return applicant;
//       });
//       return item;
//     });

//     setApplicationsData(updatedDummyData);
//     setStatusPopupOpen(false);
//     refetch();
//   };

//   return (
//     <div className="bg-white mb-5 p-6 max-w-7xl mx-auto">
//       <div className="flex flex-wrap items-center justify-between">
//         <h1 className="text-[#18191C] text-xl font-medium mt-4">Job Applications</h1>

//         <div className="flex items-center gap-3 mt-4 sm:mt-0">
//           <p>Filter</p>
//           <div className="relative">
//             <button
//               className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[#0A65CC] text-white rounded-sm"
//               onClick={() => setIsSortOpen(!isSortOpen)}
//             >
//               Sort
//             </button>
//             {isSortOpen && (
//               <div className="absolute right-0 mt-2 w-48 border border-[#E9EAED] bg-white shadow-lg rounded-lg">
//                 <p className="text-[#9199A3] text-xs font-medium px-4 py-2 pt-4">SORT APPLICATION</p>
//                 <div className="px-4 pb-2">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="sortOrder"
//                       value="newest"
//                       className="form-radio text-[#0A65CC] w-5 h-5"
//                     />
//                     <span className="ml-2">Newest</span>
//                   </label>
//                 </div>
//                 <div className="px-4 pb-2">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="sortOrder"
//                       value="oldest"
//                       className="form-radio text-[#0A65CC] w-5 h-5"
//                     />
//                     <span className="ml-2">Oldest</span>
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-medium text-[#18191C] mb-4">Job Application - Update</h2>
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
//               <th className="py-3 px-6">Name</th>
//               <th className="py-3 px-6">Role</th>
//               <th className="py-3 px-6">Status</th>
//               <th className="py-3 px-6">Submitted at</th>
//               <th className="py-3 px-6">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applicationsData.map((column, index) =>
//               column.applicants.map((applicant, idx) => (
//                 <tr key={idx} className="border-t border-[#E4E5E8]">
//                   <td className="py-4 px-6">{applicant.name}</td>
//                   <td className="py-4 px-6">{applicant.jobRole}</td>
//                   <td className="py-4 px-6">{applicant.status}</td>
//                   <td className="py-4 px-6">{applicant.applied}</td>
//                   <td className="py-4 px-6">
//                     <button
//                       className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
//                       onClick={() => {
//                         setSelectedApplicant(applicant);
//                         setStatusPopupOpen(true);
//                       }}
//                     >
//                       Change Status
//                     </button>
//                     <button
//                       className="ml-4 bg-[#0A65CC] text-white text-xs px-2 py-1 rounded-sm"
//                       onClick={() => {
//                         setModalOpen(true);
//                         setApplicationData(applicant);
//                       }}
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <ChangeStatusPopup
//         isOpen={statusPopupOpen}
//         onClose={() => setStatusPopupOpen(false)}
//         onSave={(newStatus) => {
//           handleStatusChange(newStatus);
//           handleStatusChangeInList(newStatus);
//         }}
//         userId={selectedApplicant?.userId}
//         jobId={jobId}
//         refetch={refetch}
//       />
//       <ApplicationModel
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         candidate={applicationData?.userId}
//       />
//     </div>
//   );
// };

// export default JobApplications;

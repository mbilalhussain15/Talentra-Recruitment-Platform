import React, { useState } from "react";
import Modal from "react-modal";
import { useUpdateApplicationStatusMutation } from "../../../redux/slices/api/recruiterApi.js";

const ChangeStatusPopup = ({ isOpen, onClose, onSave, userId, jobId, refetch }) => {
 
  const [status, setStatus] = useState("");
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation(); 

  const handleSave = async () => {
    if (!userId || !status) {
      console.error("User ID ya status missing hai!");
      return;
    }

    try {
      console.log("c-userId: ", userId);
      console.log("c-status: ", status);
      console.log("c-jobId: ", jobId);
      await updateApplicationStatus({ userId,jobId, status }).unwrap(); 
      console.log(`Application ${userId} ka status ${status} pe update ho gaya`);
      onSave(status); 
      onClose();
      refetch();
    } catch (error) {
      console.error("Application status update karne mein error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-transparent"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Change Status</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="" disabled>Select Status</option>
          <option value="All Applications">All Applications</option>
          <option value="Accept">Accept</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-sm"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#0A65CC] text-white px-4 py-2 rounded-sm"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeStatusPopup;
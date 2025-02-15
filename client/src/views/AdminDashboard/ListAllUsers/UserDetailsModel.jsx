import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const UserDetailsModel = ({isOpen, onClose, user}) => {
    if (!isOpen) return null;
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-50">
          <div className="relative w-full max-w-xl p-10 bg-white rounded-2xl shadow-lg overflow-hidden">
          <p className="font-bold text-lg">{user.name || "Unknown"}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Type: {user.type}</p>

            {user.type === "admin" && (
                ""
            )}

            {user.type === "applicant" && (
                <div className="mt-2">
                <p className="text-green-600">Skills: {user.skills.length > 0 ? user.skills.join(", ") : "None"}</p>
                <p className="text-green-600">Education: {user.education.length > 0 ? user.education.join(", ") : "None"}</p>
                </div>
            )}

            {user.type === "recruiter" && (
              ""  // <p className="text-purple-600 font-semibold">Recruiter Dashboard Access</p>
            )}

    
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-20">
              <RxCross2 size={30} color="#333" />
            </button>
          </div>
        </div>
  )
}

export default UserDetailsModel
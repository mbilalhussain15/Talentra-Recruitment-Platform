import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery, useUpdateUserPasswordMutation, useUpdateUserProfileMutation } from "../../../redux/slices/api/authApi";
import LoadingAnimation from "../../../components/LoadingUI";

const AdminProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const loggedinUserId = user.userId;
  const { data, isError, isLoading, error, refetch } =
    useGetCurrentUserQuery(loggedinUserId);
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [updateUserPassword] = useUpdateUserPasswordMutation();
    const role = data?.userDetails.role;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      name,
      email,
      role
    };
    
    setIsSaving(true); 
    
    try {
      await updateUserProfile({ userId: loggedinUserId, data }).unwrap();
      refetch()
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false); 
    }
  };
  
  
  const handleChangePassword = async(e) => {
    e.preventDefault();
    if(newPassword!==confirmNewPassword)
    {
      alert("New Password and Confirm New Password should be same")
    }
    const data = {
      oldPassword: currentPassword,
      newPassword
    }

    try {
      setIsUpdating(true)
      await updateUserPassword({ userId: loggedinUserId, data }).unwrap();
      alert('Password updated successfully!');
      setNewPassword('')
      setConfirmNewPassword('')
      setCurrentPassword('')
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || 'Failed to update Password. Please try again.';
      alert(errorMessage);
    } finally {
      setIsUpdating(false); 
    }
   
  };
  useEffect(()=>{
    if(data)
    {
      setName(data.userDetails.name)
      setEmail(data.userDetails.email)
    }

  },[data])
  
  return (
    <>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <div className="p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
               {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        <h2 className="text-xl font-bold text-gray-900 mt-8">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isUpdating ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
      )
    }
    </>
  );
};

export default AdminProfile;

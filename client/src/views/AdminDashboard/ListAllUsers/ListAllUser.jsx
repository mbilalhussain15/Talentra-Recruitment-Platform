import React, { useState, useEffect, useRef } from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import ApplicationModel from '../../RecruiterDashboard/components/ApplicationModel'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery
} from '../../../redux/slices/api/authApi'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import LoadingAnimation from '../../../components/LoadingUI'
import NoDataComponent from '../../../components/admin/NoDataUI'
import UserDetailsModel from './UserDetailsModel'

const ListAllUsers = () => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(null)
  const [openViewJob, setIsOpenViewJob] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { isError, data, isLoading, error } = useGetAllUsersQuery()

  console.log("us",data)
  const [
    deleteUser,
    {
      isError: isDeletingFailed,
      isLoading: isDeletingUser,
      error: DeletingError
    }
  ] = useDeleteUserMutation()

  if (isError) {
    console.log({ error: error })
  }
  if (isDeletingFailed) {
    console.log({ DeletingError: DeletingError })
  }

  const toggleDropdown = idx => {
    setIsOpen(isOpen === idx ? null : idx)
  }

  const options = ['All Jobs', 'Active Jobs', 'Expired Jobs']

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
        setIsOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const HandleView = user => {
    setIsOpenViewJob(true)
    setUserData(user)
  }

  const handleDeleteUser = async userId => {
    try {
      const response = await deleteUser(userId)

      if (!response?.data?.success) {
        throw new Error('An unexpected error occurred.')
      }

      toast.success('User deleted successfully')
      console.log('User deleted successfully:', response)
    } catch (error) {
      if (error.message === 'Network Error') {
        console.error('Network error: Please check your internet connection.')
        toast.error('Network error: Please check your internet connection.')
      } else {
        console.error('Error occurred while deleting user:', error.message)
        toast.error('Error occurred while deleting user:', error.message)
      }
    }
  }

  return (
    <div className='bg-white mb-10 p-6 max-w-7xl'>
      <div className='bg-white rounded-lg'>
        <div className='p-4 flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-[#18191C]'>
            List Of All Users
          </h2>
          <div className='flex items-center justify-between gap-4 text-md font-medium border border-[#E4E5E8] p-3 box rounded-lg'>
            <div className='flex items-center gap-2 justify-center pl-3'>
              <BiSearch color='#0066FF' size={30} />
              <input
                type='text'
                placeholder='Name...'
                className=' focus:outline-none w-full h-full'
              />
            </div>
            <div className='flex items-center justify-center gap-3'>
              <hr className='border-[#E4E5E8] border w-5 rotate-90' />
              <button className='bg-[#0A65CC] px-4 py-3 rounded-sm cursor-pointer text-white'>
                Find User
              </button>
            </div>
          </div>
        </div>
        {data?.length > 0 && !isLoading && (
          <div className='w-full text-left text-sm '>
            {data?.map((user, idx) => (
              <div
                onClick={() => setSelected(idx)}
                key={idx}
                className={`${
                  selected === idx
                    ? ' rounded-lg tb outline-[#0A65CC] outline'
                    : 'border-t  border-[#E4E5E8]'
                } transition duration-200 flex items-center justify-between gap-[13vw]`}
              >
                <div className='py-4 px-6 flex items-center gap-2'>
                  <div className='bg-[#767F8C] w-12 h-12 rounded-sm'></div>
                  <div>
                    <p className='font-medium text-[#18191C] text-md'>
                      {user?.name || 'No Name'}
                    </p>
                    <p className='text-[#767F8C] text-sm font-normal'>
                      {user?.type || 'Google Company'}
                    </p>
                  </div>
                </div>

                <div className='py-4 px-6 relative'>
                  <div className='text-md flex items-center gap-5 '>
                    <button
                      className='cursor-pointer font-semibold px-3 py-2 flex items-center gap-2 rounded-sm text-[#0A65CC] bg-[#E7F0FA]'
                      onClick={() => HandleView(user)}
                    >
                      View Profile
                      <IoMdArrowForward />
                    </button>
                    <div
                      onClick={() => toggleDropdown(idx)}
                      className={`${
                        selected === idx ? 'p-2 bg-[#F1F2F4] rounded-sm' : 'p-2'
                      } cursor-pointer`}
                    >
                      <HiOutlineDotsVertical
                        size={20}
                        color={`${selected === idx ? 'black' : '#767F8C'}`}
                      />
                    </div>
                  </div>

                  {isOpen === idx && (
                    <div
                    ref={dropdownRef}
                      className='absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md'
                      style={{
                        top: '90%',
                        minWidth: '150px'
                      }}
                    >
                      <button
                        className='flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md'
                        onClick={() => {
                          handleDeleteUser(user?.userId)
                        }}
                      >
                        {isDeletingUser ? (
                          <>
                            <ClipLoader size={18} color={'red'} />
                            <span className='text-red-500'>Deleting</span>
                          </>
                        ) : (
                          <>
                            <MdDeleteOutline size={20} />
                            Delete Profile
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {data?.length == 0 && !isLoading && <NoDataComponent text={'Users'} />}

        {isError && (
          <>
            <div className='flex flex-col items-center justify-center h-60 text-center'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/564/564619.png'
                alt='Error'
                className='w-20 h-20 opacity-60'
              />
              <h2 className='text-lg font-semibold text-red-600 mt-4'>
                Error While Loading Users
              </h2>
              <p className='text-sm text-gray-500'>
                Please try again later or refresh the page.
              </p>
            </div>
          </>
        )}
        {isLoading && <LoadingAnimation />}
      </div>
      <UserDetailsModel
        isOpen={openViewJob}
        onClose={() => {
          setIsOpenViewJob(false)
          setUserData(null)
        }}
        user={userData}
      />
    </div>
  )
}

export default ListAllUsers;
import React, { useState, useEffect, useRef } from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { BiDownload, BiSearch } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import ApplicationModel from '../../RecruiterDashboard/components/ApplicationModel'
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery
} from '../../../redux/slices/api/adminApi'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import LoadingAnimation from '../../../components/LoadingUI'
import NoDataComponent from '../../../components/admin/NoDataUI'
import UserDetailsModel from '../ListAllUsers/UserDetailsModel'

const AdminAccounts = () => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(null)
  const [openViewJob, setIsOpenViewJob] = useState(false)
  const [adminData, setAdminData] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { data: admins, isError, isLoading, error } = useGetAllAdminsQuery()
  const [
    deleteAdmin,
    {
      isError: isDeletingFailed,
      isLoading: isDeletingAdmin,
      error: DeletingError
    }
  ] = useDeleteAdminMutation()

  console.log({ admins })

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

  const HandleView = data => {
    setIsOpenViewJob(true)
    setAdminData(data)
  }

  const handleDeleteAdmin = async adminId => {
    console.log({ adminId })
    try {
      const response = await deleteAdmin(adminId)

      console.log({ response })

      if (!response?.data?.success) {
        throw new Error('An unexpected error occurred.')
      }

      console.log('Admin deleted successfully:', response)
      toast.success('Admin deleted successfully')
    } catch (error) {
      if (error.message === 'Network Error') {
        console.error('Network error: Please check your internet connection.')
        toast.error('Network error: Please check your internet connection.')
      } else {
        console.error('Error occurred while deleting admin:', error.message)
        toast.error('Error occurred while deleting admin:', error.message)
      }
    }
  }

  return (
    <div className='bg-white mb-10 p-6 max-w-7xl'>
      <div className='bg-white rounded-lg'>
        <div className='p-4 flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-[#18191C]'>
            List Of All Admins
          </h2>
          <div className='flex items-center justify-between gap-4 text-md font-medium border border-[#E4E5E8] p-3 box rounded-lg'>
            <div className='flex items-center gap-2 justify-center pl-3'>
              <BiSearch color='#0066FF' size={30} />
              <input
                type='text'
                placeholder='Job title, Keyword...'
                className=' focus:outline-none w-full h-full'
              />
            </div>
            <div className='flex items-center justify-center gap-3'>
              <hr className='border-[#E4E5E8] border w-5 rotate-90' />
              <button className='bg-[#0A65CC] px-4 py-3 rounded-sm cursor-pointer text-white'>
                Find Admin
              </button>
            </div>
          </div>
        </div>
        {/* IF ADMINS EXISTS! */}
        {admins?.length > 0 && (
          <div className='w-full text-left text-sm '>
            {admins?.map((admin, idx) => (
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
                      {admin?.name || 'Admin Name'}
                    </p>
                    <p className='text-[#767F8C] text-sm font-normal'>
                      {admin?.company || 'Admins Company'}
                    </p>
                  </div>
                </div>

                <div className='py-4 px-6 relative'>
                  <div className='text-md flex items-center gap-5 '>
                    <button
                      className='cursor-pointer font-semibold px-3 py-2 flex items-center gap-2 rounded-sm text-[#0A65CC] bg-[#E7F0FA]'
                      onClick={() => HandleView(admin)}
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
                          handleDeleteAdmin(admin?.userId)
                        }}
                      >
                        {isDeletingAdmin ? (
                          <>
                            <ClipLoader size={18} color={'red'} />
                            <span className='text-red-500'>Deleting</span>
                          </>
                        ) : (
                          <>
                            <MdDeleteOutline size={20} />
                            Delete Admin
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

        {/* IF ADMINS EMPTY! */}
        {!isLoading && admins?.length == 0 && (
          <>
            <NoDataComponent text={'Admin'} />
          </>
        )}

        {/* IF ADMINS ARE LOADING! */}
        {isLoading && (
          <>
            <LoadingAnimation />
          </>
        )}

        {/* IF ANY ERROR OCCURRED! */}
        {isError && (
          <>
            <div className='flex flex-col items-center justify-center h-60 text-center'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/564/564619.png'
                alt='Error'
                className='w-20 h-20 opacity-60'
              />
              <h2 className='text-lg font-semibold text-red-600 mt-4'>
                Error While Loading Admins
              </h2>
              <p className='text-sm text-gray-500'>
                Please try again later or refresh the page.
              </p>
            </div>
          </>
        )}
      </div>
      <UserDetailsModel
        isOpen={openViewJob}
        onClose={() => {
          setIsOpenViewJob(false)
          setAdminData(null)
        }}
        user={adminData}
      />
    </div>
  )
}

export default AdminAccounts
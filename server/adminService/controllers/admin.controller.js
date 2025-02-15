import axios from 'axios'
export const getAllAdmins = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5001/api/auth/all-users',{
      withCredentials: true, // Ensure cookies are sent with this request
    })
    // IF NO DATA!
    if (response?.data.length === 0) {
      res.status(200).json([])
    }

    const admins = response.data.filter(user => user.type === 'admin')
    res.status(200).json(admins)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching all users', error: error.message })
  }
}

export const deleteAdminById = async (req, res) => {
  try {
    const Id = req.params.id

    console.log({Id})

    if (!Id) {
      res.status(400).json({ message: 'No id provided!' })
    }

    const response = await axios.delete(
      `http://localhost:5001/api/auth/delete-user/${Id}`,{
        withCredentials: true, // Ensure cookies are sent with this request
      }
    )

    console.log({response:response?.data?.success})

    if (response?.data?.success) {
      res.status(200).json({success:true,message:"Admin deleted successfully"})
    } else {
      res.status(500).json({ message: response?.message })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error Deleting user', error: error.message })
  }
}

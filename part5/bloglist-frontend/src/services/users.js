import axios from 'axios'

const baseUrl = '/api/users'

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const createUser = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data
}

export default { getUser, createUser, }
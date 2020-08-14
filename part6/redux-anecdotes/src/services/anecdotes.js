import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {getAnecdotes}
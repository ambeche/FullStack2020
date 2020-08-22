import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const resetValue = () => setValue('')

  return {
    type,
    value,
    onChange,
    resetValue,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect( () => {
    axios.get(baseUrl)
    .then( (res) => setResources(res.data))
  }, [baseUrl])
  
  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources([...resources, res.data])
  }

  const service = {
    create,
  }

  return [
    resources, service
  ]
}

export {useField, useResource}

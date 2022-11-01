import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = () => {
        setValue('')
    }

    return {
        field: {
            type,
            value,
            onChange
        },
        value,
        clear
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        const newResource = response.data
        setResources(resources.concat(newResource))
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}


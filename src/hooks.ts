import { useState } from 'react'
import { request } from './utils/index'
import { Message } from '@alifd/next'

interface ParamsProps {
  keyword?:string;
  url?: string;
}

const useHooks = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false)

  const formatString = (data: any) => {
    const arr: Array<string> = []

    Object.keys(data).forEach(key => {
      data[key] && arr.push(`${key}=${data[key]}`)
    })

    return arr.length > 0 ? `?` + arr.join('&') : ''
  } 

  const fetchData = async (params: ParamsProps) => {
    const { keyword, url } = params

    if (!keyword && !url) return

    const search = formatString(params)

    setLoading(true)

    // execute
    const data = await request({ url: `/fetchData${search}` })

    !data.success && Message.error(data.message)
    setDataSource(data.data || [])
    setLoading(false)
  }

  const download = async () => {
    const data = await request({
      url: `/download`,
      method: 'POST',
      body: { data: dataSource }
    })

    const type = data.success ? 'success' : 'error'

    Message[type](data.message)
  }

  return {
    loading,
    dataSource,
    actions: {
      fetchData,
      download
    }
  }
}

export default useHooks
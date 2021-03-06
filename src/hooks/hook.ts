import { useState } from 'react'
import { request } from '../utils/index'
import { Message } from '@alifd/next'

interface ParamsProps {
  keyword?:string;
  url?: string;
}

const useHook = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async (params: ParamsProps) => {
    const { keyword, url } = params

    if (!keyword && !url) return

    setLoading(true)

    // execute
    const data = await request({
      url: '/fetchData',
      method: 'POST',
      data: params
    })

    !data.success && Message.error(data.message)
    setDataSource(data.data || [])
    setLoading(false)
  }

  const download = async (tenant: string) => {
    const data = await request({
      url: `/download`,
      method: 'POST',
      data: {
        data: dataSource,
        tenant
      }
    })

    const type = data.success ? 'success' : 'error'

    Message[type](data.message)
  }

  return {
    loading,
    dataSource,
    actions: {
      fetchData,
      download,
      setDataSource
    }
  }
}

export default useHook
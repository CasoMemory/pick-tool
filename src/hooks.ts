import { useState } from 'react'
import { request } from './utils/index'

interface ParamsProps {
  keyword?:string;
  url?: string;
}

const useHooks = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async (params: ParamsProps) => {
    const { keyword, url } = params

    if (!keyword && !url) return

    // execute
    const data = await request({
      url: '/fetchData'
    })

    setDataSource(data)
  }

  return {
    dataSource,
    actions: {
      fetchData
    }
  }
}

export default useHooks
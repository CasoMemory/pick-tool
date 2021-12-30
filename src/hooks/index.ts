import { useState } from 'react'
import { request } from '../utils/index'
import { Message } from '@alifd/next'

interface ParamsProps {
  keyword?: string;
  url?: string;
}

const useIndex = () => {
  const [activeKey, setActiveKey] = useState('amazon')

  return {
    activeKey,
    setActiveKey
  }
}

export default useIndex
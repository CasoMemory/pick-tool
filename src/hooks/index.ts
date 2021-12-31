import { useState } from 'react'

const useIndex = () => {
  const [activeKey, setActiveKey] = useState('amazon')

  return {
    activeKey,
    setActiveKey
  }
}

export default useIndex
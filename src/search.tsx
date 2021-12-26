import React, { useState } from 'react'
import { Input, Button, Form } from '@alifd/next'

const { Item } = Form

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

interface DataProps {
  keyword?: string;
  url?: string;
}

const defaultData = {
  keyword: '',
  url: ''
}

const Search = () => {
  const [data, setData] = useState<DataProps>(defaultData)

  // input change
  const handleInput = (val: any, key: string) => {
    setData({
      ...data,
      [key]: val
    })
  }

  // reset
  const handleReset = () => {
    setData(defaultData)
  }

  // search data
  const handleSearch = () => {
    console.log('data', data)
  }

  return (
    <div className='box search-form'>
      <Form {...formItemLayout}>
        <Item label='Url'>
          <Input
            hasClear
            value={data.url}
            onChange={val => { handleInput(val, 'url') }}
            placeholder='please input url'
          />
        </Item>
        <Item label='Keyword'>
          <Input
            hasClear
            value={data.keyword}
            onChange={val => { handleInput(val, 'keyword') }}
            placeholder='please input keyword'
          />
        </Item>
      </Form>
      <div className='search-form-bar'>
        <Button type='primary' onClick={handleSearch}>Search</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}

export default Search
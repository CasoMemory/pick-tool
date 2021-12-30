import React, { useState } from 'react'
import { Input, Button, Form } from '@alifd/next'
import { Actions } from './interface'

const { Item } = Form

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

interface DataProps {
  keyword?: string;
  url?: string;
  cookie?: string;
}

const defaultData = {
  keyword: '',
  url: '',
  cookie: '',
}

const Search = (props: { actions: Actions, state: any }) => {
  const { actions } = props
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
    const { keyword, url, cookie } = data

    actions.fetchData({
      url,
      keyword: keyword?.trim().replace(' ', '+'),
      cookie
    })
  }

  return (
    <div className='box search-form'>
      <Form {...formItemLayout}>
        <Item label='Cookie'>
          <Input.TextArea
            value={data.cookie}
            onChange={val => { handleInput(val, 'cookie') }}
            placeholder='please input Cookie'
          />
        </Item>
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
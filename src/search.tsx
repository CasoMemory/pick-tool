import React, { useState } from 'react'
import { Input, Button, Form } from '@alifd/next'
import { Actions } from './interface'

const { Item } = Form

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const defaultData = {
  keyword: '',
  url: '',
  cookie: '',
}

const COMP_MAP: any = {
  input: Input,
  textarea: Input.TextArea
}

const Search = (props: {
  actions: Actions,
  state: any,
  tenant: string,
  items: Array<any>
}) => {
  const { actions, items, tenant } = props
  const [data, setData] = useState<any>(defaultData) 

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
      cookie,
      tenant
    })
  }

  const renderItems = () => items.map(item => {
    const { type, key, label, placeholder } = item
    const Component = COMP_MAP[type]

    return (
      <Item label={label} key={key}>
        <Component
          value={data[key]}
          placeholder={placeholder}
          onChange={(val: string) => { handleInput(val, key) }}
        />
      </Item>
    )
  })

  const formItems = renderItems()

  return (
    <div className='box search-form'>
      <Form {...formItemLayout}>{formItems}</Form>
      <div className='search-form-bar'>
        <Button type='primary' onClick={handleSearch}>Search</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}

export default Search
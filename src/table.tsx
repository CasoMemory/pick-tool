import React from 'react'
import { Table, Button, Icon } from '@alifd/next'
import { Actions, State } from './interface'

const { Column } = Table

const List = (props: { actions: Actions, state: State }) => {
  const { actions, state } = props

  const handleDownload = () => {
    actions.download()
  }

  return (
    <div className='box has-top'>
      <div className='box-operate'>
        <Button disabled={!state.dataSource.length} onClick={handleDownload}>download <Icon type='download' /></Button>
      </div>
      <Table dataSource={state.dataSource} loading={state.loading}>
        <Column title='Image' dataIndex='image' />
        <Column title=' Asin' dataIndex='asin' />
        <Column title='Title' dataIndex='title' />
        <Column title='Review' dataIndex='review' />
        <Column title='Price' dataIndex='price' />
        <Column title='Shipping Cost' dataIndex='shipping' />
        <Column title='Detail Desc' dataIndex='desc' />
      </Table>
    </div>
  )
}

export default List
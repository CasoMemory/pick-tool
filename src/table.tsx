import React from 'react'
import { Table, Button, Icon } from '@alifd/next'
import { Actions, State } from './interface'

const { Column } = Table

const List = (props: { actions: Actions, state: State }) => {
  const { actions, state } = props

  const handleDownload = () => {
    actions.download()
  }

  const renderCellImage = (val: string, index: number) => {
    return <img src={val} key={index} style={{ width: 80 }} />
  }

  return (
    <div className='box has-top'>
      <div className='box-operate'>
        <Button disabled={!state.dataSource.length} onClick={handleDownload}>download <Icon type='download' /></Button>
      </div>
      <Table dataSource={state.dataSource} loading={state.loading}>
        <Column title='Image' dataIndex='image' cell={renderCellImage} />
        <Column title=' Asin' dataIndex='asin' width={120} />
        <Column title='Title' dataIndex='title' />
        <Column title='Review' dataIndex='review' width={100} />
        <Column title='Price' dataIndex='price' width={100} />
        <Column title='Shipping Cost' dataIndex='shipping' width={120} />
        <Column title='Detail Desc' dataIndex='desc' />
      </Table>
    </div>
  )
}

export default List
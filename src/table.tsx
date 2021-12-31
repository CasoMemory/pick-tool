import React from 'react'
import { Table, Button, Icon } from '@alifd/next'
import { Actions, State } from './interface'

const { Column } = Table

const List = (props: {
  actions: Actions,
  state: State,
  tenant: string;
  items: Array<any>
}) => {
  const { actions, state, items, tenant } = props

  const renderCellImage = (val: string, index: number, record: any) => {
    return (
      <a href={record.detailUrl} target='_blank' key={index}>
        <img className='product-image' src={val} key={index} style={{ width: '100%' }} />
      </a>
    )
  }

  const renderCellLink = (val: string, index: number) => <a key={index} target='_blank' href={val}>{val}</a>

  const renderMethod: any = {
    renderCellImage,
    renderCellLink
  }

  const handleDownload = () => {
    actions.download(tenant)
  }

  const renderColumns = () => items.map(item => {
    return (
      <Column
        key={item.dataIndex}
        {...item}
        cell={renderMethod[item.cell]}
      />
    )
  })

  const columns = renderColumns()

  return (
    <div className='box has-top'>
      <div className='box-operate'>
        <Button
          disabled={!state.dataSource.length}
          onClick={handleDownload}
        >
          download <Icon type='download' />
        </Button>
      </div>
      <Table
        loading={state.loading}
        dataSource={state.dataSource}>
        {columns}
      </Table>
    </div>
  )
}

export default List
import React from 'react'
import { Table } from '@alifd/next'

const { Column } = Table

const List = () => {
  return (
    <div className='box has-top'>
      <Table>
        <Column title='Image' />
        <Column title=' Asin' />
        <Column title='Title' />
        <Column title='Review' />
        <Column title='Price' />
        <Column title='Shipping Cost' />
        <Column title='Detail Desc' />
      </Table>
    </div>
  )
}

export default List
import * as React from 'react'
import * as ReactDom from 'react-dom'
import Search from './search'
import List from './table'
import useHooks from './hooks/hook'
import useIndex from './hooks/index'
import { Tab } from '@alifd/next'
import calculate from './model/constant'

import './index.scss'

const { Item } = Tab

const App = () => {
  const { actions, ...others } = useHooks()
  const { activeKey, setActiveKey } = useIndex()

  const handleChangeTab = (val: string) => {
    setActiveKey(val)
    actions.setDataSource([])
  }

  const { search, list } = calculate(activeKey)

  return (
    <div>
      <Tab
        shape='wrapped'
        className='search-tab'
        activeKey={activeKey}
        onChange={handleChangeTab}>
        <Item title='Amazon Pick' key='amazon' />
        <Item title='Giga Pick' key='giga' />
      </Tab>
      <Search
        tenant={activeKey}
        items={search}
        actions={actions}
        state={{ ...others }}
      />
      <List
        items={list}
        actions={actions}
        state={{ ...others }}
      />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
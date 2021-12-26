import * as React from 'react'
import * as ReactDom from 'react-dom'
import Search from './search'
import List from './table'

import './index.scss'

const App = () => {
  return (
    <div>
      <Search />
      <List />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
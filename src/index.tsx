import * as React from 'react'
import * as ReactDom from 'react-dom'
import Search from './search'
import List from './table'
import useHooks from './hooks'

import './index.scss'

const App = () => {
  const { actions, ...others } = useHooks()

  return (
    <div>
      <Search
        actions={actions}
        state={{ ...others }}
      />
      <List
        actions={actions}
        state={{ ...others }}
      />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
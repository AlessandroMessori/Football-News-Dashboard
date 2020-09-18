import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Search from './containers/Search'
import NotFound from './components/NotFound'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/category/teams' component={Home} />
    <Route path='/category/players' component={Home} />
    <Route path='/search' component={Search} />
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
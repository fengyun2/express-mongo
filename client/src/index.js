// 在应用中其它任何代码执行前调用一次
import 'babel-polyfill'
import FastClick from 'fastclick'
import 'weui'

import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

// import { syncHistoryWithStore } from 'react-router-redux'

// import configureStore from './configureStore'
import routes from 'ROUTES'

// import './assets/scss/variables.scss'
// import './assets/scss/base.scss'

// `__INITIAL_STATE__` 来自服务器端渲染
// const initialState = window.__INITIAL_STATE__
// const store = configureStore(initialState)

// const store = configureStore()
// const history = syncHistoryWithStore(browserHistory, store)

// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}


render(
  <Router history={browserHistory} routes={routes}>
  </Router>,
  document.getElementById('app')
  )

/**
 * old router
 * @type {Object}
 */
/* render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Brand} />
        <Route path="brand" component={Brand} />
        <Route path="note" component={Note} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
  ) */

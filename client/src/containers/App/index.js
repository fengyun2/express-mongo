import React from 'react'
import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import BarNav from 'COMPONENTS/BarNav'
// import BarTab from 'COMPONENTS/BarTab'
// import NavLink from 'COMPONENTS/NavLink'

import styles from './style.less'
// class App extends Component {
//   render () {
//     const pageClassNames = classNames(styles.page, styles.pageCurrent)
//     return (
//       <div className={pageClassNames}>
//         <BarNav {...this.props} />
//         <BarTab {...this.props} />

//         <div className="content">
//           {this.props.children}
//         </div>
//       </div>
//     )
//   }
// }

const pageClassNames = classNames(styles.page, styles.pageCurrent)

// 无状态(stateless) 组件, 一个简单的容器,react-router会根据 route规则匹配到的组件作为 `props.children` 传入
const App = (props) => {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="page"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      style={{height: '100%'}}
    >
      <div className={pageClassNames}>
        <h1>APP</h1>
        <div className="content">
          {props.children}
        </div>
      </div>
    </ReactCSSTransitionGroup>
  )
}

export default App

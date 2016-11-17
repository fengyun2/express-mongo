import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import {fetchRequest} from '../../utils/fetch'
import {Panel, PanelHeader, PanelBody, PanelFooter, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription, Cell, Cells, CellBody, CellFooter, ButtonArea, Button} from 'react-weui'

class userList extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      userInfos: []
    }
  }

  handleSubmit (e) {
    browserHistory.push('/add_user')
  }

  componentWillMount () {
    fetchRequest('http://localhost:3000/user/lists', {
      mode: 'cors'
    }).then(data => {
      console.log('获取数据成功', data.data)
      this.setState({userInfos: data.data})
    }).catch(err => {
      console.error('err >>>', err)
    })

    this.forceUpdate()
  }

  render () {
    let userItem = ''
    if (!!this.state.userInfos) {
      const {userInfos} = this.state
      window.state = this.state
      userItem = userInfos.map(item => <CardItem item={item} key={item._id} />)
    } else {
      userItem = ''
    }

    return (
      <div>
        <Panel>
          <PanelBody>
            {userItem}
          </PanelBody>
          <PanelFooter href="javascript:void(0);">
            <AddMore />
          </PanelFooter>
        </Panel>
        <ButtonArea>
          <Button type="primary" onClick={this.handleSubmit}>添加用户</Button>
        </ButtonArea>
      </div>
    )
  }
}

const CardItem = (props) => {
  const {item} = props
  return (
    <MediaBox type="appmsg" href="javascript:void(0);">
      <MediaBoxHeader>{getNickImg(item)}</MediaBoxHeader>
      <MediaBoxBody>
        <MediaBoxTitle>{item.nick_name || '匿名'}</MediaBoxTitle>
        <MediaBoxDescription>
          科比是一位伟大的篮球运动员
        </MediaBoxDescription>
      </MediaBoxBody>
    </MediaBox>
  )
}

const AddMore = (props) => {
  return (
    <Cell>
      <CellBody>More</CellBody>
      <CellFooter />
    </Cell>
  )
}

const getNickImg = (item) => {
  if (!!item && !!item.img_url) {
    return <img src={item.img_url}/>
  } else {
    return <img src="http://img15.3lian.com/2015/f2/111/d/68.jpg" />
  }
}

const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />

const smallIcon =
<img
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
style={{
    width: '20px',
    marginRight: '5px',
    display: 'block'
}}/>

export default userList
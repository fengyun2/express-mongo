import React, {Component} from 'react'
import {TabBar, TabBarItem, TabBarIcon, TabBarLabel} from 'react-weui'

import IconHome from '../../assets/iconfonts/home.png'
import IconUser from '../../assets/iconfonts/user.png'
import IconCart from '../../assets/iconfonts/cart.png'
import IconSettings from '../../assets/iconfonts/settings.png'

class BarTab extends Component {
  state = {
    tab: 1
  }
  render () {
    return (
      <TabBar>
        <TabBarItem active={this.state.tab == 0} icon={<img src={IconHome}/>} onClick={e => {this.setState({tab: 0})}} label="tab1">
        </TabBarItem>
        <TabBarItem active={this.state.tab == 1} icon={<img src={IconUser}/>} onClick={e => {this.setState({tab: 1})}} label="tab2">
        </TabBarItem>
        <TabBarItem active={this.state.tab == 2} icon={<img src={IconCart}/>} onClick={e => {this.setState({tab: 2})}} label="tab3">
        </TabBarItem>
        <TabBarItem active={this.state.tab == 3} icon={<img src={IconSettings}/>} onClick={e => {this.setState({tab: 3})}} label="tab4">
        </TabBarItem>
      </TabBar>
    )
  }
}

export default BarTab
import React, {Component} from 'react'
import {Button, ActionSheet} from 'react-weui'
import Page from 'COMPONENTS/page'

export default class ActionSheetDemo extends Component {
  state = {
    auto_show: false,
    ios_show: false,
    android_show: false,
    menus: [
      {
        label: '拍照',
        onClick: () => {
          console.log('click 拍照')
        }
      }, {
        label: '从手机相册选择',
        onClick: () => {
          console.log('从手机相册选取')
        }
      }
    ],
    actions: [
      {
        label: '取消',
        onClick: this
          .hide
          .bind(this)
      }
    ]
  };

  hide() {
    this.setState({auto_show: false, ios_show: false, android_show: false})
  }

  render() {
    return (
      <Page className="actionsheet" title="ActionSheet" subTitle="弹出式菜单" spacing>
        <Button type="default" onClick={e => this.setState({auto_show: true})}>Auto Detect ActionSheet</Button>
        <ActionSheet
          menus={this.state.menus}
          actions={this.state.actions}
          show={this.state.auto_show}
          onRequestClose={e => this.setState({auto_show: false})}/>

        <br/>

        <Button type="default" onClick={e => this.setState({ios_show: true})}>IOS ActionSheet</Button>
        <ActionSheet
          menus={this.state.menus}
          actions={this.state.actions}
          show={this.state.ios_show}
          type="ios"
          onRequestClose={e => this.setState({ios_show: false})}/>

        <br/>

        <Button type="default" onClick={e => this.setState({android_show: true})}>Android ActionSheet</Button>
        <ActionSheet
          menus={this.state.menus}
          actions={this.state.actions}
          show={this.state.android_show}
          type="android"
          onRequestClose={e => this.setState({android_show: false})}/>
      </Page>
    );
  }
}
import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {fetchRequest} from '../../utils/fetch'
import {
  Form,
  FormCell,
  CellHeader,
  CellBody,
  CellFooter,
  Input,
  Label,
  Button,
  Agreement,
  ButtonArea
} from 'react-weui'

class AddUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nick_name: '',
      account: '',
      password: '',
      email: ''
    }

    this.handleSubmit = this
      .handleSubmit
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
  }

  handleSubmit(e) {
    console.log(`this.state >>>`, this.state)
    fetchRequest('http://localhost:3000/user/add', {
      method: 'POST',
      mode: 'cors',
      data: this.state
    }).then(data => {
      console.log('添加用户成功')
      setTimeout(() => {
        // browserHistory.push('/user_list')
      }, 3000)
    }).catch(err => {
      console.error('err >>>', err)
    })
  }

  handleChange(event) {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val)
      if (index > -1) {
        this.splice(index, 1)
      }
    }

    const inputType = event.target.type
    const inputName = event.target.name
    const inputValue = event.target.value

    console.log(inputType, inputName, inputValue)
    this.setState({
      [inputName]: inputValue
    })

    // const {type} = event.target.dataset
    // console.log(`event.target: `, event.target.dataset)
    // const _this = ReactDOM.findDOMNode(this.refs[type])
    // let {employed} = this.state.user_info
    // if (_this.checked) { // 选中
    //   if (!employed.includes(type)) {
    //     employed.push(type)
    //     this.setState({
    //       user_info: Object.assign({}, this.state.user_info, {employed})
    //     })
    //   }
    // } else {
    //   if (employed.includes(type)) {
    //     // employed.push(type)
    //     employed.remove(type)
    //     this.setState({
    //       user_info: Object.assign({}, this.state.user_info, {employed})
    //     })
    //   }
    // }

    // this.forceUpdate()
  }

  render() {
    return (
      <div>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>NickName:
              </Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                name="nick_name"
                placeholder="Enter you nickName"
                value={this.state.nick_name}
                onChange={this.handleChange}/>
            </CellBody>
          </FormCell>

          <FormCell vcode>
            <CellHeader>
              <Label>Phone:
              </Label>
            </CellHeader>
            <CellBody>
              <Input type="tel" name="account" placeholder="Enter you tellphone" onChange={this.handleChange}/>
            </CellBody>
            <CellFooter>
              <Button type="default">Send</Button>
            </CellFooter>
          </FormCell>

          <FormCell>
            <CellHeader>
              <Label>Email:
              </Label>
            </CellHeader>
            <CellBody>
              <Input type="email" name="email" placeholder="Enter you email" onChange={this.handleChange} />
            </CellBody>
          </FormCell>

          <FormCell>
            <CellHeader>
              <Label>PassWord:
              </Label>
            </CellHeader>
            <CellBody>
              <Input type="password" name="password" placeholder="Enter you password" onChange={this.handleChange} />
            </CellBody>
          </FormCell>

          <FormCell>
            <CellHeader>
              <Label>RePassWord:
              </Label>
            </CellHeader>
            <CellBody>
              <Input type="password" name="repassword" placeholder="Enter you repassword" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
        </Form>

        <ButtonArea>
          <Button type="primary" onClick={this.handleSubmit}>注册</Button>
        </ButtonArea>
      </div>
    )
  }
}

export default AddUser
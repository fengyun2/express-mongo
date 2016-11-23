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

class AddComment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article_id: null,
      content: ''
    }

    this.article_id = props.location.state.article_id

    this.handleSubmit = this
      .handleSubmit
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
  }

  componentWillMount () {
    this.setState({
      article_id: this.article_id
    })
  }

  handleSubmit(e) {
    console.log(`this.state >>>`, this.state)
    fetchRequest('http://localhost:3000/comment/add', {
      method: 'POST',
      mode: 'cors',
      data: this.state
    }).then(data => {
      if (data.success) {
        console.log('success', data.message)
      } else {
        console.log('error', data.message)
      }
      setTimeout(() => {
        // browserHistory.push('/comment_list')
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
  }

  render() {
    return (
      <div>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>Content:
              </Label>
            </CellHeader>
            <CellBody>
              <Input type="text" name="content" placeholder="Enter Content" onChange={this.handleChange} />
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

export default AddComment

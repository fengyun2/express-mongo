import {ADD_CATE, SHOW_CATE, REQUEST_ADD_CATE, RECEIVE_ADD_CATE } from 'CONSTANTS/actionTypes'

const initialItems = [{
  name: '婚纱摄影',
  author: 'ly'
}, {
  name: '婚庆服务',
  author: 'ly'
}]

export default function filter (state = initialItems, action) {
  switch (action.type) {
    case ADD_CATE:
      console.log(`action: `, action)
      return state
    case SHOW_CATE:
      return state
    case REQUEST_ADD_CATE:
      console.log('reducer-REQ')
      return state
    case RECEIVE_ADD_CATE:
      console.log('reducer-REC')
      console.log(`action: `, action)
      return state
    default:
      return state
  }
}

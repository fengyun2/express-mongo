import fetch from 'isomorphic-fetch'

import {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_ALL,
  FILTER_ITEM,
  ADD_CATE,
  REQUEST_ADD_CATE,
  RECEIVE_ADD_CATE
} from 'CONSTANTS/actionTypes'

// Item

/**
 * addItem
 */
export const addItem = () => {
  return dispatch => {
    setTimeout(() => dispatch({type: ADD_ITEM}), 1000)
  }
}

/**
 * deleteItem
 */
export const deleteItem = (item) => {
  return dispatch => {
    console.log(`deleteItem: `, item)
    dispatch({type: DELETE_ITEM, payload: item})
  }
  // return { type: DELETE_ITEM, item }
}

/**
 * deleteAll
 */
export const deleteAll = () => {
  return dispatch => {
    dispatch({type: DELETE_ALL, payload: null})
  }
  // return { type: DELETE_ALL }
}

// filter

export const filterItem = e => {
  let item = e.target.value
  // console.log(`filter item: `, item)
  return dispatch => {
    dispatch({type: FILTER_ITEM, payload: item})
  }
  // return {type: FILTER_ITEM, filterItem}
}

/**
 * cate
 *
 *
 */

function requestAddCategory(data) {
  return dispatch => {
    dispatch({type: REQUEST_ADD_CATE, payload: data})
  }
  // return {type: REQUEST_ADD_CATE, data}
}

function receiveAddCategory(json) {
    return dispatch => {
    dispatch({type: RECEIVE_ADD_CATE, payload: json})
  }
  // return {type: RECEIVE_ADD_CATE, json}
}

export const addCategory = data => {
  return (dispatch) => {
    console.log(`actions: ${data}`)
    dispatch(requestAddCategory(data))

    return fetch(`https://api.github.com/repos/typecho-fans/plugins/contents/`)
      .then(response => response.json())
      .then(json => {
        console.log('receive json', json)
        return dispatch(receiveAddCategory(json))
      })
  }

  // return new Promise((resolve, reject) => {   setTimeout(() => {
  // console.log('add category successfull')     resolve()   }, 500) })
}

export const showCategory = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('get category successfull')
      resolve()
    }, 500)
  })
}

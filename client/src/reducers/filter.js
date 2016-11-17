import {FILTER_ITEM} from 'CONSTANTS/actionTypes'

const initialItems = ''

export default function filter (state = initialItems, action) {
  switch (action.type) {
    case FILTER_ITEM:
      console.log(`filter payload: `, action.payload)
      return action.payload
      // return action.filterItem
    default:
      return state
  }
}

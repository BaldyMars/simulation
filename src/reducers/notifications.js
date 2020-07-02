import actionTypes from "../actions/actionTypes";

const initState = {
  isLoding : false,
  list : []
}
const reducer = (state = initState, action) => {
  switch(action.type){
      case actionTypes.GET_NOTIFICATIONS:
        return {
          ...state,
          list:action.payload.list
        }
      case actionTypes.START_NOTIFICTIONS_POST:
        return {
          ...state,
          isLoding:true
        }
      case actionTypes.END_NOTIFICTIONS_POST:
        return {
          ...state,
          isLoding:false
        }
      case actionTypes.MARK_NOTIFICATIONS_BY_ID:
          return{
            ...state,
            list:state.list.map(item => {
              if(item.id === action.payload.id){
                item.hasRead = true
              }
              return item
            })
          }
      case actionTypes.MARK_NOTIFICATIONS_ALL:
          return{
            ...state,
            list:state.list.map(item => {
              item.hasRead = true
              return item
            })
          }
    default:
      return state
  }
}
export default reducer
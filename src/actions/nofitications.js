import actionTypes from './actionTypes'
import {getNotifications} from '../request'

export const actionTypesById = id => {
  return dispatch => {
    dispatch(startNotifictionsPost())
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_NOTIFICATIONS_BY_ID,
        payload:{
          id
        }
      })
      dispatch(endNotifictionsPost())
    }, 500);
  }
} 



export const actionTypesAll = () => {
  return dispatch => {
    dispatch(startNotifictionsPost())
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_NOTIFICATIONS_ALL,
      })
      dispatch(endNotifictionsPost())
    }, 500);
  }
}


export const startNotifictionsPost = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type:actionTypes.START_NOTIFICTIONS_POST,
      })
    }, 500);
  }
} 


export const endNotifictionsPost = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type:actionTypes.END_NOTIFICTIONS_POST,
      })
    }, 500);
  }
} 


export const getNotificationsData = () => {
  return dispatch => {
    getNotifications().then(res => {
      dispatch({
        type:actionTypes.GET_NOTIFICATIONS,
        payload:{
          list:res.list
        }
      })
    })
  }
}
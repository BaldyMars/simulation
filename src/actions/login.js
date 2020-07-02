import actionTypes from './actionTypes';
import { login } from "../request";

const loginSuccess = (userInfo) => {
  return {
    type:actionTypes.LOGIN_SUCCESS,
    payload:{
      userInfo
    }
  }
}


const loginFail = () => {
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
  sessionStorage.removeItem("authToken")
  sessionStorage.removeItem("user")
  return {
    type:actionTypes.LOGIN_FAIL
  }
}

const startLoding = () => {
  return {
    type:actionTypes.START_LOGIN
  }
}

//退出的方法
export const exit = () => {
  return dispatch => {
    dispatch(loginFail())
  }
}

export const userLogin = (userInfo) => {
  return dispatch => {
    //开始登录
    dispatch(startLoding())
    login(userInfo).then(res => {
      if(res.data.code === 200){
        let {authToken, ...user} = res.data.data
        console.log(user)
        if(userInfo.remember){//记住了
          localStorage.setItem("authToken", res.data.data.authToken)
          localStorage.setItem("user", JSON.stringify(user))
        }else{
          sessionStorage.setItem("authToken", res.data.data.authToken)
          sessionStorage.setItem("user", JSON.stringify(user))
        }
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(loginFail())
      }
    })
  }
}




import React, { Component } from 'react';
import {adminRoute} from './routes';
import {Switch, Route, Redirect} from 'react-router-dom';
import Frame from './components/Frame';
import {connect} from 'react-redux'


const menu = adminRoute.filter(item => item.isNav === true)

const mapState = state => {
  return {
    isLogin:state.login.isLogin,
    role:state.login.role
  }
}


@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <>
        <Frame menu = {menu}>
          <Switch>
            {
              adminRoute.map(item=>{
                return <Route
                  path={item.pathname}
                  key={item.pathname}
                  exact={item.exact}  //article   /article/edit/3  都是指向ArticleList组件
                  render={(routerProps)=>{
                    const hasPermission = item.roles.includes(this.props.role)
                    return hasPermission ? <item.component {...routerProps}/> : <Redirect to = "/admin/noauth"/>
                  }}
                />
              })
            }
            <Redirect to = {adminRoute[1].pathname} from = "/admin" exact/>
            <Redirect to = "/404"/>
          </Switch>
        </Frame>
      </>
      :
      <Redirect to = "/login"/>
    )
  }
}


export default App

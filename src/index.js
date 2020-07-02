import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {mainRoute} from './routes';
import './index.less'
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store = {store}>
    <ConfigProvider locale = {zhCN}>
      <Router>
        <Switch>
            <Route path = "/admin" render = {(routerProps) => {
              return <App {...routerProps}/>
            }}/>
            {
              mainRoute.map(item => {
                return <Route key = {item.pathname} path = {item.pathname} component = {item.component}></Route>
              })
            }
            <Redirect to = "/admin" from = "/"/>
            <Redirect to = "/404"/>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>
    , document.getElementById('root'));



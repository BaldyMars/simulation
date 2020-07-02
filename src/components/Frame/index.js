import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Icon, Badge, Avatar } from 'antd';
import Logo from './logo.png';
import './index.less';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {getNotificationsData} from '../../actions/nofitications'
import {exit} from '../../actions/login'


const { Header, Content, Sider } = Layout;

const mapState = (state) => {
  return {
    notifications:state.notifications.list.filter(item => item.hasRead === false).length,
    avatar:state.login.avatar, //用户头像
    displayName:state.login.displayName //用户名
  }
}
@connect(mapState, {getNotificationsData, exit})
@withRouter


class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationsData()
  }
  menu = () => (
    <Menu
      onClick = {this.handleClick}
    >
      <Menu.Item key = "/admin/notifications">
        <Badge dot = {Boolean(this.props.notifications)}>
          消息中心
        </Badge>
      </Menu.Item>
      <Menu.Item key = "/admin/settings">
          个人设置
      </Menu.Item>
      <Menu.Item key = "/exit">
          退出
      </Menu.Item>
    </Menu>
  )
  handleClick = ({key}) => {
    if(key === "/exit"){//如果是退出
      this.props.exit()
    }else{
      this.props.history.push(key)
    }
  }
  render() {
    return (
      <div className = "title">
        <Layout>
          <Header className="header giao-header">
            <div className="logo">
              <img src = {Logo} className = "title" alt = ""/>
            </div>
            <Dropdown overlay={this.menu}>
              <span className = "ant-dropdown-link">
              <Badge
                count={this.props.notifications}
                offset = {[0, -2]}
              >
                <Avatar src={this.props.avatar} />
              </Badge>
                <span>欢迎您</span>
                ，{this.props.displayName} <Icon type="down" />
              </span>
            </Dropdown>
          </Header>
          <Layout>
            <Sider style={{ background: '#fff' }}>
              <Menu
                onClick = {this.handleClick}
                mode="inline"
                selectedKeys = {this.props.location.pathname}
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {
                  this.props.menu.map(item => {
                    return <Menu.Item key = {item.pathname}>{item.title}</Menu.Item>
                  })
                }
              </Menu>
            </Sider>
            <Layout style={{ height:'100%', padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <Content
                style={{
                  background: '#fff',
                  minHeight: 280
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Frame

import React, { Component } from 'react'
import {Card, Button, List, Avatar, Badge, Spin } from 'antd';
import {connect} from 'react-redux'
import {actionTypesById, actionTypesAll} from '../../actions/nofitications'

const mapState = state => {
  // console.log(state)
  return {
    list:state.notifications.list,
    notifications:state.notifications.list.filter(item => item.hasRead === false).length,
    isLoding:state.notifications.isLoding
  }
}
@connect(mapState, {actionTypesById, actionTypesAll})
class Notifications extends Component {
  render() {
    return (
      <div>
        <Card
          title = {"通知中心"}
          extra = {<Button onClick = {this.props.actionTypesAll} disabled = {this.props.list.every(item => item.hasRead === true)}>全部标记为已读</Button>}
        >
          <Spin spinning = {this.props.isLoding}>
            <List
                itemLayout="horizontal"
                dataSource={this.props.list}
                renderItem={item => (
                    <List.Item
                      extra = {item.hasRead ? null : <Button onClick = {this.props.actionTypesById.bind(this, item.id)}>标记为已读</Button>}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Badge dot = {!item.hasRead}>{item.title}</Badge>}
                        description = {item.desc}
                      />
                    </List.Item>
                )}
              />
          </Spin>
        </Card>
      </div>
    )
  }
}


export default Notifications
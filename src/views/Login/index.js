import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, Col} from 'antd'
import {connect} from 'react-redux'
import {userLogin} from '../../actions/login'
import {Redirect} from 'react-router-dom'
import './login.less'


const mapState = state => {
  return {
    isLogin:state.login.isLogin,
    isLoading:state.login.isLoading
  }
}

@connect(mapState, {userLogin})
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userLogin(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
      ?
      <Redirect to="/admin"/>
      :
      <div>
        <Col span = {7}>
          <Card
            title = "登录"
            className = "giaolu"
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名！' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    disabled = {this.props.isLoading}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    disabled = {this.props.isLoading}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox disabled = {this.props.isLoading}>是否</Checkbox>)}
                  记住密码
                <Button loading = {this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div>
    )
  }
}



export default Login
import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin, message  } from 'antd';
import moment from 'moment'
import {getArticleDetailById,saveEditArticle} from '../../request'
import E from 'wangeditor';
import './index.less'

const formItemLayout = {
  labelCol : { span: 4 },
  wrapperCol : { span: 16 } 
}
const formTailLayout = {
  labelCol : { span: 4 },
  wrapperCol : { span: 8, offset : 4 } 
}
@Form.create()
class Edit extends Component {
  constructor(){
    super()
    this.createRef = createRef()
  }
  state = {
    titileValueDate:"",
    titleHelpDate:"",
    isLoading:false
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.currentAt = values.currentAt.valueOf()
        // console.log(values.currentAt)
        saveEditArticle(this.props.match.params.id, values).then(res => {
          // console.log(res)
          message.success(res.msg)
          this.props.history.push("/admin/article")
        })
      }
    });
  };
  initEditor = () => {
    this.editor = new E(this.createRef.current)
    /* 
      点击提交按钮，发现content这个字段始终是空的，
      原因是因为表单他不会将这个字段进行主动设置，
      所以我们需要手动的获取编辑器里面的内容，
      然后将conent这个表单字段进行设置
      当父文本编辑器里面的内容发生改变的时候，onChange函数就会执行，
      html就可以获取编辑器里面的内容
    */
    this.editor.customConfig.onchange =  (html) => {
      // html 即变化之后的内容
      this.props.form.setFieldsValue({
        content:html
      })
    }
    this.editor.create()
  }
  componentDidMount(){
    this.initEditor()
    this.setState({isLoading : true})
    // console.log("id===> " + this.props.match.params.id)
    //根据id请求编辑页面的详细信息
    getArticleDetailById(this.props.match.params.id).then(res => {
      // console.log(this.props)
      // w.log("this===> " + this.props.match.params.id)
      //设置表单字段
        this.editor.txt.html(res.content)
        const {id, ...data} = res
        data.currentAt = moment(res.currentAt)
        this.props.form.setFieldsValue(data)
        // this.props.form.setFieldsValue({
        //   title:res.title,
        //   amout:res.amout,
        //   author:res.author,
        //   currentAt:moment(res.currentAt),
        // })
    }).finally(() => {
      this.setState({isLoading:false})
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
          <Card title = {"文章编辑"} extra={<Button onClick = {this.props.history.goBack}>返回</Button>}>
            <Spin spinning = {this.state.isLoading}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                  label="标了个题"
                  placeholder="unavailable choice" htmlFor="error2"
                >
                  {getFieldDecorator('title', {
                    rules: [ {required: true, message: '内容不能为空！！'} ],
                  })(<Input />)}
                </Form.Item>


                <Form.Item
                  label="阅读量"
                  placeholder="unavailable choice" htmlFor="error2"
                >
                  {getFieldDecorator('amout', {
                    rules: [ {required: true, message: '内容不能为空！！'} ],
                  })(<Input />)}
                </Form.Item>


                <Form.Item
                  label="作者"
                  placeholder="unavailable choice" htmlFor="error2"
                >
                  {getFieldDecorator('author', {
                    rules: [ {required: true, message: '内容不能为空！！'} ],
                  })(<Input />)}
                </Form.Item>


                <Form.Item
                  label="发布时间"
                  placeholder="unavailable choice" htmlFor="error2"
                >
                  {getFieldDecorator('currentAt', {
                    rules: [ {required: true, message: '内容不能为空！！'} ],
                  })( <DatePicker
                      mode={this.state.mode}
                      showTime
                      onOpenChange={this.handleOpenChange}
                      onPanelChange={this.handlePanelChange}
                    />)}
                </Form.Item>


                <Form.Item
                  label="文章内容"
                  placeholder="unavailable choice" htmlFor="error2"
                >
                  {getFieldDecorator('content', {
                    rules: [ {required: true, message: '内容不能为空！！'} ],
                  })(
                      <div className = "article" ref = {this.createRef}></div>
                  )}
                </Form.Item>
                <Form.Item {...formTailLayout}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>

            </Spin>
          </Card>
      </div>
    )
  }
}


export default Edit
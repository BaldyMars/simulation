import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography } from 'antd';
import {getArticleList, deleteArticleById} from '../../request';
import moment from 'moment';
import XLSX from 'xlsx';

const ButtonGroup = Button.Group;
const { Text } = Typography;
const displayColumn = {
  id:"id",
  title:"标题",
  author:"作者",
  amount:"阅读量",
  currentAt:"发布时间",
}
export default class ArticleList extends Component {
  state = {
    dataSource : [],
    columns :[],
    total : 0,
    isLoading : false,
    offset:0,
    limited:10,
    isDeleteModel:false,
    isDeleteTitle:"",
    isDeleteBtn: false,
    isDeleteConnent : "",
    deleteArticleId : null
  }
  createColumn = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if(item === "currentAt"){
        return{
          title:displayColumn[item],
          render : (record) => {
            let {currentAt} = record
            return moment(currentAt).format("YYY年MM月DD日 HH时mm分ss秒")
          },
          key:item
        }
      }
      if(item === "amount"){
        return {
          title:displayColumn[item],
          /* 
            这边根据阅读量的大小去做条件渲染，
            如果对于某一列里面的数据进行单独处理的话，
            需要用到render，不需要用到dataIndex
          */
          render(record){
            return <Tag color={record.amount >= 100 ? "#f50" : "#108ee9"}>{record.amount}</Tag>
          }
        }
      }  
      return {
        title:displayColumn[item],
        dataIndex:item,
        key:item
      }
    })
    columns.push({
      title:"操作",
      render : (text, record) => {
        return (
          <ButtonGroup>
            <Button onClick = {this.deldetArticleList.bind(this, record)} type="danger">删除</Button>
            <Button  type="primary" onClick = {this.toEdit.bind(this, record)}>编辑</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  toEdit = (record)=>{
    // console.log(this.props);
    this.props.history.push(`/admin/article/edit/${record.id}`)
  }
    deldetArticleList = (record) => {
      this.setState({
        isDeleteModel : true,//显示弹出框
        isDeleteTitle : <Text strong = {true} type="danger">注意！！操作不可逆！！</Text>,
        isDeleteConnent : <Text>确定要删除<Text strong = {true} type="danger">{record.author}</Text>的文章吗？</Text>,
        deleteArticleId : record.id,
        isDeleteBtn : false
      })
    }
  getData = () => {
    this.setState({isLoading : true})
    getArticleList(this.state.offset, this.state.limited).then(res => {
      // console.log(res.Object.keys(res.list));
      if(!res) return false;
      const columnKeys = Object.keys(res.list[0])
      const columns = this.createColumn(columnKeys)
      //更改状态
      this.setState({
        columns,
        dataSource:res.list,
        total:res.total,
        isLoading : false
      })
    })
  }
  componentDidMount(){
    this.getData()
  }
  handleChange = (page, pageSize) => {
    this.setState({
      offset : pageSize * (page - 1),
      limited : pageSize
    }, () => {
      this.getData()
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      offset : 0,
      limited : size
    }, () => {
      this.getData()
    })
  }
  toExcel = () => {
    //实际项目中，前端发送ajax请求，后端传来一个文件下载地址
    /* convert state to workbook */
    const data = [Object.keys(this.state.dataSource[0])];
    for(var i = 0; i < this.state.dataSource.length; i++){
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].currentAt).format("YYY年MM月DD日 HH时mm分")
      ])
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* 生成XLSX文件并发送到客户端 */
    XLSX.writeFile(wb, `第${this.state.offset / this.state.limited + 1}页列表.xlsx`)
  }
  onConcle = () => {
    this.setState({
      isDeleteModel : false,
      isDeleteConnent : ""
    })
  }
  onOk = () => {
    this.setState({isDeleteBtn:true})
    deleteArticleById(this.state.deleteArticleId).then(res => {
      // console.log(res)
      this.setState({
        offset:0
      }, () => {
        this.getData()
      })
    }).finally(() => {this.setState({isDeleteBtn : false, isDeleteModel : false})})
  }
  render() {
    return (
      <div>
        <Card title="文章列表" extra={<Button onClick = {this.toExcel}>导出Excel</Button>}>
          <Table
            dataSource={this.state.dataSource}   //数据
            columns={this.state.columns}         //列
            rowKey = {(recored) => recored.id}   //行需要一个key
            loading = {this.state.isLoading}
            pagination = {{
              position : "both",
              hideOnSinglePage : true,           //第一页隐藏
              onChange : this.handleChange,
              showSizeChanger:true,
              showQuickJumper : true,
              pageSizeOptions : ["10", "15", "20", "25"],
              onShowSizeChange : this.onShowSizeChange,
              current : this.state.offset / this.state.limited + 1 // 强势刷新当前页
            }}
            />
            <Modal
              title = {this.state.isDeleteTitle}
              visible = {this.state.isDeleteModel}
              maskClosable = {false}
              destroyOnClose = {true}
              confirmLoading = {this.state.isDeleteBtn}
              cancelText = {"否"}
              okText = {"是"}
              onCancel = {this.onConcle}
              onOk = {this.onOk}
            >
              {this.state.isDeleteConnent}
            </Modal>

        </Card>
      </div>
    )
  }
}
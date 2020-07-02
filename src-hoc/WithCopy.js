import React, { Component } from 'react'
/* 
  高阶组件，本质上是一个函数  内部接收一个组件  返回新的组件
  高阶组件内部可以对传入进来的组件传递一些新的属性过去，
  那样的话Comp组件就可以通过this.props获取属性了
  组件：函数式组件（无状态组件）  类组件
*/

const WithCopy = (Comp) => {
  return class WithCopy extends Component {
    render (){
      return (
        <div>
          <Comp {...this.props}></Comp>
          &copy;
        </div>
      )
    }
  }
}

export default WithCopy

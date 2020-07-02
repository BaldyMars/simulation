import React,{Component} from 'react'

//loadable是一个函数，内部接收一个对象，返回一个组件
const Loadable = ({loader, loading:Loading}) => {
  return class LoadableComponent extends Component{
    state = {
      loadComp : null
    }
    componentDidMount(){
      loader().then(res => {
        console.log(res);//name
        this.setState({
          LoadComp : res.default
        })
      })
    }
    render(){
      let {LoadComp} = this.state;
      return LoadComp ? <LoadComp/> : <Loading/>
    }
  }
}

export default Loadable
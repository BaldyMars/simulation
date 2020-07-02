//引入所有的视图
import {
  ArticleList,
  ArticleEdit,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth
} from '../views'


//这个路由不需要登录就可以访问
export const mainRoute = [
  {
    pathname:"/login",
    component:Login
  },
  {
    pathname:"/404",
    component:NotFound
  }
]


//这个路由需要登录才可以访问
export const adminRoute = [
  {
    pathname:"/admin/dashboard",
    component:Dashboard,
    title:"仪表盘",
    isNav:true,
    roles:["1", "2", "3"]
  },
  {
    pathname:"/admin/article",
    component:ArticleList,
    exact:true,
    title:"文章列表",
    isNav:true,
    roles:["1", "2"]
  },
  {
    pathname:"/admin/article/edit/:id",
    component:ArticleEdit,
    roles:["1", "2"]
  },
  {
    pathname:"/admin/settings",
    component:Settings,
    title:"设置",
    isNav:true,
    roles:["1"]
  },
  {
    pathname:"/admin/notifications",
    component:Notifications,
    roles:["1", "2", "3"]
  },
  {
    pathname:"/admin/noauth",
    component:NoAuth,
    roles:["1", "2", "3"]
  },
]



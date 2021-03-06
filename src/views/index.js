// import ArticleList from './Article';
// import ArticleEdit from './Article/Edit';
// import Dashboard from './Dashboard';
// import Login from './Login';
// import NotFound from './NotFound';
// import Settings from './Settings';
import {Loading} from '../components';
import Loadable from 'react-loadable';
// import Loadable from './lodable';


const ArticleList = Loadable({
  loader : () => import ("./Article"),
  loading:Loading
})
const ArticleEdit = Loadable({
  loader : () => import ('./Article/Edit'),
  loading:Loading
})
const Dashboard = Loadable({
  loader : () => import ("./Dashboard"),
  loading:Loading
})
const Login = Loadable({
  loader : () => import ("./Login"),
  loading:Loading
})
const NotFound = Loadable({
  loader : () => import ("./NotFound"),
  loading:Loading
})
const Settings = Loadable({
  loader : () => import ("./Settings"),
  loading:Loading
})
const Notifications = Loadable({
  loader : () => import ("./Notifications"),
  loading:Loading
})
const NoAuth = Loadable({
  loader : () => import ("./NoAuth"),
  loading:Loading
})


export {
  ArticleList,
  ArticleEdit,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth
}
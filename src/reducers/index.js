import {combineReducers} from "redux"
import notifications from "./notifications"
import login from "./login"
const reducer = combineReducers({
    notifications,
    login
})
export default reducer
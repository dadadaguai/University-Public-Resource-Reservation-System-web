import VueRouter  from "vue-router"
import Login from '../pages/Login.vue'
import HomePage from '../pages/HomePage.vue'
import Empty  from "../pages/Empty.vue"
import Notice from '../pages/Notice.vue'
import UserInfo from '../pages/UserInfo.vue'
import ChangePasswd from '../pages/ChangePasswd.vue'
export default new VueRouter({
    routes: [
        {
            path:'/',
            component: Login
        },
        {
            name:'Home',
            path:'/HomePage',
            component: HomePage,
            children:[
                {
                    path:'',
                    component:Empty
                },
                {
                    path:'Notice',
                    component:Notice
                },
                {
                    path:'User',
                    component:UserInfo
                },
                {
                    path:'ChangePasswd',
                    component:ChangePasswd
                }
            ]
        },
    ]
})
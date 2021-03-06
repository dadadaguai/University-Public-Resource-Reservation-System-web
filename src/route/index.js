import VueRouter  from "vue-router"
import Login from '../pages/Login.vue'
import HomePage from '../pages/HomePage.vue'
import Empty  from "../pages/Empty.vue"
import Notice from '../pages/Notice.vue'
import UserInfo from '../pages/UserInfo.vue'
import ChangePasswd from '../pages/ChangePasswd.vue'
import Resource from '../pages/Resource.vue'
import Feedback from '../pages/Feedback.vue'
import Audit from '../pages/Audit.vue'
import IndexPage from '../pages/IndexPage.vue'
import Chat from '../pages/Chat.vue'
import UserApply from '../pages/UserApply.vue'
import Revert from '../pages/Revert.vue'
import Credit from '../pages/Credit.vue'
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
                    component:IndexPage
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
                },
                {
                    path:'Resource',
                    component:Resource
                },
                {
                    path:'Feedback',
                    component:Feedback
                },
                {
                    path:'Audit',
                    component:Audit
                },
                {
                    path:'Chat',
                    component:Chat
                },
                {
                    path:'UserApply',
                    component:UserApply
                },
                {
                    path:'Revert',
                    component:Revert
                },
                {
                    path:'Credit',
                    component:Credit
                }
            ]
        },
    ]
})
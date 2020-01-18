import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from "./components/NoteDashboard.vue" 
// import Login from "./components/Login.vue"
import Registration from "./components/Register.vue"
import ForgetPassword from "./components/ForgetPassword.vue"
import ResetPassword from "./components/ResetPassword.vue"
import Toolbar from "./components/Toolbar.vue"
import CreateNote from "./components/CreateNote.vue"
import Signout from "./components/SignOut.vue"

Vue.use(Router)

export default new Router({
    routes:[
    // {path:'/dashboard',name:'dashboard',component:Dashboard},
    {path:'/register',name:'register',component:Registration},
    {path:'/toolbar',name:'toolbar',component:Toolbar},

    // {path:'/',name:'login',component:Login},
        {path:'/',name:'dashboard',component:Dashboard},

    {path:'/forgetpassword',name:'forgetpassword',component:ForgetPassword},
    {path:'/resetpassword/:token',name:'resetpassword',component:ResetPassword},
    {path:'/createnote',name:'createnote',component:CreateNote},
    {path:'/signout',name:'signout',component:Signout}

    
    
]})
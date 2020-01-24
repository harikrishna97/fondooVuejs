import Vue from "vue";
import Router from "vue-router";

import NoteComponent from "./components/NoteComponent.vue";
import Login from "./components/Login.vue";
import Registration from "./components/Register.vue";
import ForgetPassword from "./components/ForgetPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Toolbar from "./components/Toolbar.vue";
import TrashNote from "./components/TrashNote.vue";

// import Signout from "./components/SignOut.vue"

Vue.use(Router);

export default new Router({
  routes: [
    // {path:'/note',name:'dashboard',component:Dashboard},
    { path: "/register", name: "register", component: Registration },
    
    // { path: "/trash", name: "trash", component: TrashNote},
    {
      path: "/toolbar",
      name: "toolbar",
      component: Toolbar,

      children: [
        {
          name: "",
          path: "",
          component: NoteComponent
        },
        {
          name: "note",
          path: "note",
          component: NoteComponent
        },
        {
          name: "remainders",
          path: "remainders",
          component: NoteComponent
        },
        {
          name: "archive",
          path: "archive",
          component: NoteComponent
        },
        {
          name: "trash",
          path: "trash",
          component: TrashNote
        }
      ]
    },

    { path: "/", name: "login", component: Login },
    // {path:'/dashboard',name:'dashboard',component:Dashboard},

    {
      path: "/forgetpassword",
      name: "forgetpassword",
      component: ForgetPassword
    },
    {
      path: "/resetpassword/:token",
      name: "resetpassword",
      component: ResetPassword
    },
    // {path:'/signout',name:'signout',component:Signout}
  ]
});

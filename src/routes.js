import Vue from "vue";
import Router from "vue-router";

import NoteComponent from "./components/NoteComponent.vue";
import Login from "./components/Login.vue";
import Registration from "./components/Register.vue";
import ForgetPassword from "./components/ForgetPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Dashboard from "./components/Toolbar.vue";
import CreateNote from "./components/CreateNote.vue";
import DisplayNotes from "./components/DisplayNotes.vue";

import Icons from "./components/Icons.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {path:'/note',name:'note',component:NoteComponent},
    { path: "/register", name: "register", component: Registration },
    
    { path: "/icon", name: "icon", component: Icons},
    { path: "/createnote", name: "createnote", component: CreateNote},
    { path: "/displaynotes", name: "displaynotes", component: DisplayNotes},
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,

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
        // {
        //   name: "trash",
        //   path: "trash",
        //   component: TrashNote
        // }
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

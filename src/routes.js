import Vue from "vue";
import Router from "vue-router";

import NoteComponent from "./components/NoteComponent.vue";
import TrashNote from "./components/TrashNote.vue";
import Login from "./components/Login.vue";
import Registration from "./components/Register.vue";
import ForgetPassword from "./components/ForgetPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Dashboard from "./components/Toolbar.vue";
import CreateNote from "./components/CreateNote.vue";
import DisplayNotes from "./components/DisplayNotes.vue";
import ArchiveNotes from "./components/ArchiveNotes.vue";
import Remainders from "./components/Remainders.vue";
import ProfileUpload from "./components/ProfileUpload.vue";


import Icons from "./components/Icons.vue"
import Collaborator from "./components/Collaborator.vue"
import NoteLabel from "./components/NoteLabel.vue"



Vue.use(Router);

export default new Router({
  routes: [
    {path:'/collaborator',name:'collaborator',component:Collaborator},
    { path: "/register", name: "register", component: Registration },
    { path: "/image", name: "image", component: ProfileUpload },

    { path: "/icon", name: "icon", component: Icons},
    { path: "/createnote", name: "createnote", component: CreateNote},
    { path: "/displaynotes", name: "displaynotes", component: DisplayNotes},
    {
      path: "/dashboard",
      component: Dashboard,

      children: [
        {
          path: "",
          component: NoteComponent
        },
        // {path:'', redirectTo:'/dashboard', pathMatch:'full'},
        {
          path: "note",
          component: NoteComponent
        },
        {
          path: "remainders",
          component: Remainders
        },
        {
          path: "archive",
          component: ArchiveNotes
        },
        {
          path: "label",
          component: NoteLabel
        },
        {
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

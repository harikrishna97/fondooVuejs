<template>
  <!-- <div class="page-container"> -->
  <md-app class="MainApp" md-waterfall md-mode="fixed" id="app">
    <md-app-toolbar class="toolbar">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
          <md-tooltip md-direction="bottom">Main menu</md-tooltip>
        </md-button>
        <div class="md-icon-button">
          <img src="../assets/icon_128.png" alt="icon" />
        </div>
        <div><h2>{{fundoo}}</h2></div>
      </div>

      <!-- <div class="search-bar md-layout">  <search-bar></search-bar></div> -->

      <div id="searchId">
        <form class="search-bar md-layout">
          <!-- <md-button class="md-icon-button md-layout-item">
              <md-icon>search</md-icon>
              <md-tooltip md-direction="bottom">Search</md-tooltip>
            </md-button> -->
          <search-bar></search-bar>
        </form>
      </div>

      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <md-icon>refresh</md-icon>
          <!-- <md-progress-spinner :md-diameter="18" :md-stroke="3" md-mode="indeterminate" style="color:black"></md-progress-spinner> -->
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>

        <md-button
          class="md-icon-button"
          v-if="toggleListGrid == false"
          @click="listGrid()"
        >
          <img src="../assets/list_view_24px.svg" alt="List" />
          <md-tooltip md-direction="bottom">List view</md-tooltip>
        </md-button>
        <md-button
          class="md-icon-button"
          v-if="toggleListGrid == true"
          @click="listGrid"
        >
          <img src="../assets/grid.svg" alt="Grid" />
          <md-tooltip md-direction="bottom">Grid view</md-tooltip>
        </md-button>

        <md-button class="md-icon-button">
          <img src="../assets/settings_24px.svg" alt="Setting" />
          <md-tooltip md-direction="bottom">Settings</md-tooltip>
        </md-button>

        <!-- <div> -->
        <md-menu md-size="medium" md-align-trigger @click.stop="stopTheEvent">
          <!-- <md-card> -->
          <!-- <md-button md-menu-trigger>Align with trigger</md-button> -->
          <md-button class="md-icon-button" md-menu-trigger>
            <md-avatar>
              <img :src="imageUrl" alt="Avatar" />
              <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
            </md-avatar>
          </md-button>

          <md-menu-content>
            <div class="profile">
              <!-- <md-badge class="" md-position="bottom" md-content="*"> -->
              <div class="avatar md-icon-button" @click="profileUpload1()">
                <img :src="imageUrl" alt="Avatar" />
                <!-- <input type="file"> -->
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
              </div>
               
              <!-- </md-badge> -->
            </div>

            <!-- </md-button> -->
            <div class="signOuts">
              <div class="user">
                <div>
                  <md-menu-item :v-model="user">{{ user }}</md-menu-item>
                </div>
              </div>
              <div class="email">
                <md-menu-item :v-model="email">{{ email }}</md-menu-item>
              </div>
            </div>

            <md-divider></md-divider>
            <md-button v-on:click="signout()">Sign Out</md-button>
          </md-menu-content>
          <div v-if="profileUpload == true">
            <ProfileUpload @update="update"></ProfileUpload>
          </div>
          <!-- </md-card> -->
        </md-menu>
        <!-- </div> -->
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-list>
        <md-list-item class="Focus" v-switching-color="['purple','gold','pink','brown']" @click="navigateTo('note');fundoo='Fundoo'">
          <md-icon>emoji_objects</md-icon>
          <span class="md-list-item-text">Notes</span>
          <!-- <router-link :to="{ path: '/dashboard/note' } " replace>Notes</router-link> -->

          <!-- <router-link to="trash">Notes</router-link> -->
        </md-list-item>
        <!-- <router-link to="/toolbar/trash">Home</router-link> -->

        <md-list-item class="Focus" @click="navigateTo('remainder');fundoo='Reminders'">
          <md-icon>notifications_none</md-icon>
          <span class="md-list-item-text">Remainders</span>
          <!-- <router-link :to="{ path: '/dashboard/remainders' } " replace>Remainders</router-link> -->
        </md-list-item>

        <md-divider></md-divider>

        <div v-for="label in AllLabels" :key="label._id">
          <md-list-item class="Focus" @click="showCurrentLabel(label)">
            <md-icon>label</md-icon>
            <span class="md-list-item-text">{{ label.label }}</span>
          </md-list-item>
        </div>

        <div v-if="showEditLabel === true">
          <md-dialog :md-active.sync="showEditLabel" class="md-scrollbar mainD">
            <md-dialog-title>Edit labels</md-dialog-title>
            <div class="scrollbar">
              <md-field class="">
                <md-button class="md-icon-button" @click="labelName=null">
                  <md-icon class="menu_vert" style="padding:1px">clear</md-icon>
                </md-button>
                <md-input
                  type="text"
                  placeholder="Create Your Label.."
                  v-model="labelName"
                />
                <md-button class="md-icon-button" @click="createLabel()">
                  <md-icon class="menu_vert" style="padding:1px">done</md-icon>
                </md-button>
              </md-field>
            </div>
            <md-dialog-content
              v-for="label in AllLabels"
              :key="label._id"
              class="editLabel1 md-scrollbar"
            >
              <div>
                <md-button
                  class="md-icon-button"
                  @click="deleteLabel(label._id)"
                >
                  <md-icon>delete</md-icon>
                </md-button>
              </div>

              <div>
                <input v-model="label.label" />
                <md-icon @click="editLabel(label._id,label.label)">edit</md-icon>
              </div>
              <!-- <div>
                <md-button class="md-icon-button">
                  <md-icon>edit</md-icon>
                </md-button>
              </div> -->
            </md-dialog-content>

            <md-divider></md-divider>

            <md-dialog-actions>
              <md-button class="" @click="showEditLabel = false"
                >Done
              </md-button>
            </md-dialog-actions>
          </md-dialog>
        </div>

        <md-list-item class="Focus" @click="editLabelToggle()">
          <md-icon>edit</md-icon>
          <span class="md-list-item-text">Edit label</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item class="Focus" @click="navigateTo('archive');fundoo='Archive'">
          <md-icon>archive</md-icon>
          <span class="md-list-item-text">Archive</span>
        </md-list-item>

        <md-list-item class="Focus" @click="navigateTo('trash');fundoo='Trash'">
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content class="appContent">
      <router-view></router-view>
    </md-app-content>
  </md-app>
  <!-- </div> -->
</template>

<script>
// import NoteComponent from "./NoteComponent";
import SearchBar from "./SearchBar";
import ProfileUpload from "./ProfileUpload";

import { listGridService, labelService,labelNoteService } from "../services/messageService";
import { HTTP } from "../services/http-common";

export default {
  data: () => ({
    fundoo:"Fundoo",
    // component:CreateNote1,
    showDialog: false,
    profileUpload: false,
    fileName: null,
    menuVisible: false,
    // searchbar: false,
    AllLabels: [],
    // AllLabels:[{"label":"dfd",'i':0},{"label":"dfd",'i':1},{"label":"dfd",'i':2},{"label":"dfd",'i':3},{"label":"dfd",i:4},],
    user: "",
    firstName: "",
    lastName: "",
    email: "",
    single: null,
    imageUrl: "",
    trash: false,
    note: true,
    toggleListGrid: false,
    showEditLabel: false,
    label: "",
    labelName: null
  }),

  components: {
    SearchBar,
    ProfileUpload
    // NoteComponent
  },

  mounted() {
    this.created();
    this.getAllLabels();
    // alert("mounted");
  },
  beforeUpdate() {
    // alert("before updated");
  },
  updated() {
    // alert("updated");
    // this.toggleListGrid=this.toggleListGrid;
    // this.createLabel();
    // this.getAllLabels();
  },
  methods: {
    sendLabelNote(label){
      labelNoteService.sendLabelNote(label);
    },
    showCurrentLabel(label){
      this.$log.info(" Current Label From Toolbar:",label);
      this.sendLabelNote(label);
    },
    update(e) {
      this.$log.info(" Profile changed...:: ", e);
      this.created();
      this.getAllLabels();
    },
    stopTheEvent: event => event.stopPropagation(),
    sendListViewTrue(value) {
      // send message to subscribers via observable subject
      listGridService.sendListView(value);
    },

    sendLabelToIcon(value) {
      // send message to subscribers via observable subject
      labelService.sendLabelToIcon(value);
    },

    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    signout() {
      localStorage.clear();
      // localStorage.removeItem('token');
      // this.$log.info(" sinOut..............:: ");
      this.$router.push("/");
    },
    changeComponent() {
      this.note = !this.note;
      this.trash = true;
    },
    listGrid() {
      this.toggleListGrid = !this.toggleListGrid;
      this.sendListViewTrue(this.toggleListGrid);
    },
    created() {
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      this.user = (this.firstName + " " + this.lastName).toUpperCase();
      this.email = localStorage.getItem("email");
      // this.$log.info(" sinOut..:: " + localStorage.getItem("firstName"));
      this.imageUrl = localStorage.getItem("imageUrl");
    },
    navigateTo(value) {
      switch (value) {
        case "note":
          this.$router.replace("/dashboard/note");

          break;
        case "remainder":
          this.$router.replace("/dashboard/remainders");
          break;
        case "label":
          this.$router.replace("/dashboard/label");
          break;
        case "archive":
          this.$router.replace("/dashboard/archive");
          break;
        case "trash":
          this.$router.replace("/dashboard/trash");
          break;
      }
    },
    editLabelToggle() {
      this.showEditLabel = !this.showEditLabel;
    },
    profileUpload1() {
      this.profileUpload = !this.profileUpload;
      // this.$log.info("profileUpload :: " + this.profileUpload);
    },



    createLabel() {
      if (this.labelName !== null) {
        const labelData = {};
        labelData.label = this.labelName;
        this.labelName=null;
        // this.$log.info("labelData :: " + JSON.stringify(labelData));
        const token = localStorage.getItem("token");
        //this.$log.info("token :: " + typeof token);
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        const auth = { headers: { token: token } };
        HTTP.post("label", labelData, auth)
          .then(response => {
            this.$log.info(
              "createLabel:toolbar:response :: " +
                JSON.stringify(response.data.data.label)
                
            );this.getAllLabels()
            // this.$emit("updateNote", "note added");
          })
          .catch(err => {
            this.$log.info("createLabel : toolbar:error :: " + err);
          });
      }
    },

    getAllLabels() {
      // alert("created");
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("label", auth)
        .then(response => {
          this.$log.info(
            " getaLLLabels:toolbar:response :: " +
              JSON.stringify(response.data.data)
          );

          // this.$log.info("get color :: " + JSON.stringify(response.data.data.color));

          this.AllLabels = response.data.data;
          this.sendLabelToIcon(this.AllLabels);
          // this.$log.info("AllLabels :: " + JSON.stringify(this.AllLabels));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },
    deleteLabel(labelId) {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.delete("label/"+labelId,auth)
        .then(response => {
          this.$log.info(
            " DeleteLabel:toolbar:response :: " +
              JSON.stringify(response.data.data)
          );

          // this.$log.info("get color :: " + JSON.stringify(response.data.data.color));

          this.getAllLabels()
          
          // this.$log.info("AllLabels :: " + JSON.stringify(this.AllLabels));
        })
        .catch(err => {
          this.$log.info("DeleteLabel:toolbar:error :: " + err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/dashboard.css";
// .toolbar{
//   background-color: white;
// }
// .avatar {
//     width: 40px;
//     min-width: 40px;
//     height: 40px;
//     margin: auto;
//     display: inline-flex;
//     justify-content: center;
//     align-items: center;
//     overflow: hidden;
//     -webkit-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//     position: relative;
//     border-radius: 40px;
//     transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//     transition-property: color, background-color;
//     will-change: color, background-color;
//     font-size: 24px;
//     letter-spacing: -0.05em;
//     vertical-align: middle;
//   }
.mainD {
  width: 300px;
}
// .md-list-item:hover {
//   box-shadow:none;
//   background-color: rgb(247, 229, 130);
//   border-top-right-radius: 25px;
//     border-bottom-right-radius: 25px;
// }
.Hover:hover{
  background-color: #fbefc3;
  border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;

}

.md-list-item.Focus :focus {
  // background-color: yellow;
   background-color: rgb(247, 229, 130);
  border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

.md-list-item.Focus:hover{
  // background-color: yellow;
   background-color: rgb(247, 229, 130);
  border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}
</style>

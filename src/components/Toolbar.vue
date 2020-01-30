<template>
  <!-- <div class="page-container"> -->
  <md-app class="MainApp" md-mode="fixed">
    <md-app-toolbar class="">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
          <md-tooltip md-direction="bottom">Main menu</md-tooltip>
        </md-button>
        <div class="md-icon-button">
          <img src="../assets/icon_128.png" alt="icon" />
        </div>
        <div><h2>Fundoo</h2></div>
      </div>

      <!-- <div class="search-bar md-layout">  <search-bar></search-bar></div> -->

      <div id="searchId">
        <form class="search-bar md-layout">
          <!-- <md-button class="md-icon-button md-layout-item">
              <md-icon>search</md-icon>
              <md-tooltip md-direction="bottom">Search</md-tooltip>
            </md-button> -->
          <search-bar></search-bar>

          <!-- <input :@click="searchbar"
                type="search"
                id="search"
                required
                style="outline:none"
               autocomplete="off" 
                placeholder="Search..."
                
              /> -->

          <!-- <md-button class="md-icon-button md-layout-item">
            <md-icon>close</md-icon>
          </md-button>   -->
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
          v-if="toggleListGrid"
          @click="
            listGrid();
            sendMessage();
          "
        >
          <img src="../assets/list_view_24px.svg" alt="List" />
          <md-tooltip md-direction="bottom">List view</md-tooltip>
        </md-button>
        <md-button
          class="md-icon-button"
          v-if="toggleListGrid == false"
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
            <!-- <md-button> -->

            <!-- <div v-if="profileUpload === true"> -->
            <!-- <ProfileUpload @update="mounted"></ProfileUpload> -->
            <!-- </div> -->
            <div class="profile">
              <!-- <md-badge class="" md-position="bottom" md-content="<md-icon>menu</md-icon>"> -->
              <div class="avatar md-icon-button" @click="profileUpload1()">
                <img :src="imageUrl" alt="Avatar" />
                <!-- <input type="file"> -->
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
              </div>
              <!-- <md-button class="md-fab md-primary md-fab-bottom-right badge">
                <md-icon>camera_alt</md-icon>
              </md-button> -->
              <!-- </md-badge> -->
            </div>

            <!-- </md-button> -->
            <div class="signOuts">
              <div class="user">
                <div>
                  <md-menu-item :v-model="user">{{ user }}</md-menu-item>
                </div>
                <!-- <div><md-menu-item :v-model="lastName">{{ lastName }}</md-menu-item></div> -->
              </div>
              <!-- <div :v-model="user"> {{user}} </div> -->
              <div class="email">
                <md-menu-item :v-model="email">{{ email }}</md-menu-item>
              </div>
            </div>

            <!-- <div v-model="email"> {{email}} </div> -->
            <md-divider></md-divider>
            <md-button v-on:click="signout()">Sign Out</md-button>

            <!-- <md-dialog :md-active.sync="profileUpload" md-click-outside-to-close="true"> -->
            <!-- <md-dialog-title>Preferences</md-dialog-title> -->
            <!-- <ProfileUpload @update="mounted"></ProfileUpload> -->

            <!-- <md-dailog-content> -->
            <!-- <ProfileUpload @update="mounted"></ProfileUpload></div> -->
            <!-- </md-dailog-content> -->
            <!-- </md-dialog> -->
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
        <md-list-item @click="navigateTo('note')">
          <md-icon>emoji_objects</md-icon>
          <span class="md-list-item-text">Notes</span>
          <!-- <router-link :to="{ path: '/dashboard/note' } " replace>Notes</router-link> -->

          <!-- <router-link to="trash">Notes</router-link> -->
        </md-list-item>
        <!-- <router-link to="/toolbar/trash">Home</router-link> -->

        <md-list-item @click="navigateTo('remainder')">
          <md-icon>notifications_none</md-icon>
          <span class="md-list-item-text">Remainders</span>
          <!-- <router-link :to="{ path: '/dashboard/remainders' } " replace>Remainders</router-link> -->
        </md-list-item>

        <md-divider></md-divider>

        <div v-for="label in AllLabels" :key="label._id">
          <md-list-item>
            <md-icon>label</md-icon>
            <span class="md-list-item-text">{{ label.label }}</span>
          </md-list-item>
        </div>

        <div v-if="showEditLabel == true">
          <md-dialog
            :md-active.sync="showEditLabel"
            style="width:200px;height:200px;"
          >
            <div>
              <div>Edit labels</div>
              <div sytle="display:flex;justify-content:space-around">
                <!-- <button class="md-icon-button">
                   <md-icon class="menu_vert">more_vert</md-icon> -->
                <!-- </button> -->

                <md-field style="width:200px;height:20px;">
                  <md-input
                    type="text"
                    placeholder="Create Your Label.."
                    v-model="labelName"
                  />

                  <!-- <button class="md-icon-button"> -->
                  <!-- <md-icon class="menu_vert">more_vert</md-icon> -->
                  <!-- </button> -->
                </md-field>
              </div>
              {{ label }}
              <md-divider></md-divider>
              <button @click="createLabel()">Done</button>
            </div>

            <!-- <EditLabel
          :note="note"
          @closeEdit="noteEdit"
          @updateNote="updateNotes"
        ></EditLabel> -->
          </md-dialog>
        </div>

        <md-list-item @click="editLabelToggle()">
          <md-icon>edit</md-icon>
          <span class="md-list-item-text">Edit label</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item @click="navigateTo('archive')">
          <md-icon>archive</md-icon>
          <span class="md-list-item-text">Archive</span>
        </md-list-item>

        <md-list-item @click="navigateTo('trash')">
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

import { messageService } from "../services/messageService";
import { HTTP } from "../services/http-common";

export default {
  data: () => ({
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
    toggleListGrid: true,
    showEditLabel: false,
    label: "",
    labelName: null
  }),

  components: {
    SearchBar,
    ProfileUpload
    // NoteComponent
  },
  // mounted(){
  // this.created();
  // },
  beforeCreate() {
    // alert("before create");
  },
  created() {
    // alert("created");
  },
  beforeMount() {
    // alert("before Mount");
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

    this.createLabel();
  },
  methods: {
    update(e) {
      this.$log.info(" Profile changed...:: ",e);
      this.created();
      this.getAllLabels();
    },
    stopTheEvent: event => event.stopPropagation(),
    sendMessage() {
      // send message to subscribers via observable subject
      messageService.sendMessage("Message from toolbar listview");
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    signout() {
      localStorage.clear();
      // localStorage.removeItem('token');
      this.$log.info(" sinOut..............:: ");
      this.$router.push("/");
    },
    changeComponent() {
      this.note = !this.note;
      this.trash = true;
    },
    listGrid() {
      this.toggleListGrid = !this.toggleListGrid;
    },
    created() {
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      this.user = (this.firstName + " " + this.lastName).toUpperCase();
      this.email = localStorage.getItem("email");
      this.$log.info(" sinOut..:: " + localStorage.getItem("firstName"));
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
      this.$log.info("profileUpload :: " + this.profileUpload);
    },

    createLabel() {
      if (this.labelName !== null) {
        const labelData = {};
        labelData.label = this.labelName;
        this.$log.info("labelData :: " + JSON.stringify(labelData));
        const token = localStorage.getItem("token");
        this.$log.info("token :: " + typeof token);
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        const auth = { headers: { token: token } };
        HTTP.post("label", labelData, auth)
          .then(response => {
            this.$log.info(
              "createLabel:toolbar:response :: " + JSON.stringify(response)
            );
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
          this.$log.info("AllLabels :: " + JSON.stringify(this.AllLabels));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    }
  }

  // destroyed: function(){
  //   alert('Destroyed');
  //   }
};
</script>

<style lang="scss" scoped>
.badge:after {
  content: "";
  position: absolute;
  background: rgba(255, 0, 0, 0.85);
  height: 1rem;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1rem;
  border-radius: 50%;
  color: white;
}
.profile {
  display: flex;
  justify-content: center;
}
.md-app {
  // height: 500px;
  // height:600px;
  border: 1px solid rgba(#000, 0.12);
  overflow: hidden;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  margin-top: 4.615em;
}

#search {
  width: 631px;
  background-color: lightgrey;
  border: ridge;
  margin: 5px 0px;
}

form.search-bar.md-layout {
  background-color: lightgrey;
  border-radius: 8px;
}
.content {
  display: flexbox;
}
.appContent {
  margin-left: 250px;
  outline: none;
  border: none;
}
.email {
  color: #5f6368;
  font: 400 14px/19px Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  letter-spacing: normal;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
}
.user {
  display: flex;
  justify-content: space-evenly;
  color: #202124;
  font: 500 16px/22px Google Sans, Roboto, RobotoDraft, Helvetica, Arial,
    sans-serif;
  // letter-spacing: .29px;
  // margin: 0;
  // text-align: center;
  // text-overflow: ellipsis;
  // overflow: hidden;
}
.signOuts {
  display: flex;
  justify-content: center;
  flex-direction: column;
  display: block;
  // vertical-align: top;
  // text-align: center;
}
.searchId {
  border-radius: 8px;
}
.md-icon-button {
  opacity: 0.85;
  // background-size: 120px 120px;
  //   height: 120px;
  //   margin: 20px;
  //   opacity: .1;
  //   width: 120px;
}
//  md-app{
//   height: 570px;
// }
// .md-menu-content{
// background-color:#F5F5F5;
// width:300px;
// height:500px;
// }
/deep/ .md-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* z-index: 5; */
  overflow: hidden;
  background: no-repeat;
  transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: opacity;
  will-change: opacity;
}
.MainApp {
  height: 100vh;
}

.avatar {
  width: 40px;
  min-width: 40px;
  height: 40px;
  margin: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  border-radius: 40px;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color;
  will-change: color, background-color;
  font-size: 24px;
  letter-spacing: -0.05em;
  vertical-align: middle;
}
</style>

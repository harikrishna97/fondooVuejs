<template>
  <!-- <div class="page-container"> -->
  <md-app class="MainApp" md-waterfall  md-mode="fixed" >
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
          <md-dialog :md-active.sync="showEditLabel" class="Dialog1">
            <div>
              <div>Edit labels</div>
              <div sytle="display:flex;justify-content:space-around">
                <!-- <button class="md-icon-button">
                   <md-icon class="menu_vert">more_vert</md-icon> -->
                <!-- </button> -->

                <md-field class="Field1">
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
              <div>
                <md-dialog-content
                  v-for="label in AllLabels"
                  :key="label._id"
                  class="editLabel1"
                >
                  <div>
                    <button class="md-icon-button">
                      <md-icon>label</md-icon>
                    </button>
                  </div>

                  <div>{{ label.label }}</div>
                  <div>
                    <button class="md-icon-button">
                      <md-icon>edit</md-icon>
                    </button>
                  </div>
                </md-dialog-content>
              </div>
              <md-divider></md-divider>
              <button class="md-primary" @click="createLabel()">Done</button>
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

import { listGridService, labelService } from "../services/messageService";
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
    // this.toggleListGrid=this.toggleListGrid;

    this.createLabel();
    this.getAllLabels();
  },
  methods: {
    update(e) {
      this.$log.info(" Profile changed...:: ", e);
      // this.created();
      // this.getAllLabels();
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
            );
            this.$emit("updateNote", "note added");
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/dashboard.css";

</style>

<template>

  <!-- <div class="page-container"> -->
  <md-app class="MainApp"
    
    md-mode="fixed"
  >
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
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>

        <md-button
          class="md-icon-button"
          v-if="toggleListGrid"
          @click="listGrid"
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
        <md-menu md-size="medium" md-align-trigger>
          <!-- <md-card> -->
          <!-- <md-button md-menu-trigger>Align with trigger</md-button> -->
          <md-button class="md-icon-button" md-menu-trigger>
            <md-avatar>
              <img :src="imageUrl" alt="Avatar" />
              <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
            </md-avatar>
          </md-button>

          <md-menu-content>
            <md-button>
              <md-avatar class="md-icon-button">
                <img :src="imageUrl" alt="Avatar" />
                <!-- <input type="file"> -->
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
              </md-avatar>
            </md-button>
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
          </md-menu-content>
          <!-- </md-card> -->
        </md-menu>
        <!-- </div> -->
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" >
      <md-list>
        <md-list-item @click="navigateTo('note')">
          <md-icon>emoji_objects</md-icon>
          <span class="md-list-item-text">Notes</span>
          <!-- <router-link to="trash">Notes</router-link> -->
        </md-list-item>
        <!-- <router-link to="/toolbar/trash">Home</router-link> -->

        <md-list-item @click="navigateTo('remainder')">
          <md-icon>notifications_none</md-icon>
          <span class="md-list-item-text">Remainders</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item @click="navigateTo('label')">
          <md-icon>label</md-icon>
          <span class="md-list-item-text">label</span>
        </md-list-item>

  

      <div v-if="showEditLabel == true" >
      <md-dialog :md-active.sync="showEditLabel" style="width:200px;height:200px;">
        editLabel
        <input type="text" placeholder="Create Your Label.." v-model="label">
        {{label}}
        <md-divider></md-divider>
        <button>Done</button>
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
export default {
  data: () => ({
    // component:CreateNote1,
    fileName: null,
    menuVisible: false,
    // searchbar: false,
    user: "",
    firstName: "",
    lastName: "",
    email: "",
    single: null,
    imageUrl: null,
    trash: false,
    note: true,
    toggleListGrid: true,
    showEditLabel:false,
    label:"",
  }),

  components: {
    SearchBar,
    // NoteComponent
  },
// mounted(){
// this.created();
// },
beforeCreate(){
      // alert("before create");
    },
    created(){
      // alert("created");
    },
    beforeMount(){
      // alert("before Mount");
    },
    mounted(){
      this.created();
      // alert("mounted");
    },
    beforeUpdate(){
      // alert("before updated");
    },
    updated(){
      alert("updated");
    },
  methods: {
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
      this.imageUrl =localStorage.getItem("imageUrl");
    },
    navigateTo(value){
      switch(value){
        case "note":this.$router.push('note');break;
        case "remainder":this.$router.push('dashboard/remainders');break;
        case "label":this.$router.push('labels');break;
        case "archive":this.$router.push('archive');break;
        case "trash":this.$router.push('trash');break;
      }
    },
    editLabelToggle(){
        this.showEditLabel=!this.showEditLabel;
      }
  }
  // destroyed: function(){
  //   alert('Destroyed');
  //   }
};
</script>

<style lang="scss" scoped>
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
.md-icon-button{
  opacity: .85;
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
    transition: .35s cubic-bezier(.4,0,.2,1);
    transition-property: opacity;
    will-change: opacity;
}
.MainApp{
   height: 100vh;

}
</style>

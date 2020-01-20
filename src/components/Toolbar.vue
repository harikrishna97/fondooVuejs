<template>
  <!-- <div class="page-container"> -->
  <md-app>
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

      <div id="serchId">
        <form class="search-bar md-layout">
          <md-button class="md-icon-button md-layout-item">
            <md-icon>search</md-icon>
            <md-tooltip md-direction="bottom">Search</md-tooltip>
          </md-button>
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

        <md-button class="md-icon-button">
          <img src="../assets/list_view_24px.svg" alt="List" />
          <md-tooltip md-direction="bottom">List view</md-tooltip>
        </md-button>

        <md-button class="md-icon-button">
          <img src="../assets/settings_24px.svg" alt="Setting" />
          <md-tooltip md-direction="bottom">Settings</md-tooltip>
        </md-button>

        <div>
          <md-menu md-size="medium" md-align-trigger>
            <md-card >
              <!-- <md-button md-menu-trigger>Align with trigger</md-button> -->
              <md-button class="md-icon-button" md-menu-trigger @click="created">
                <md-avatar>
                  <img src="../assets/profile.jpg" alt="Avatar" />
                  <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
                </md-avatar>
              </md-button>

              <md-menu-content >
                <md-button style="flex:center">
                  <md-avatar class="md-icon-button">
                    <img src="../assets/profile.jpg" alt="Avatar" />
                    <!-- <input type="file"> -->
                    <md-tooltip md-direction="bottom"
                      >Shailesh Borase</md-tooltip
                    >
                  </md-avatar>
                </md-button>

                <div>
                  <md-menu-item :v-model="user">{{ user }}</md-menu-item>
                </div>
                <!-- <div :v-model="user"> {{user}} </div> -->
                <div>
                  <md-menu-item :v-model="email">{{ email }}</md-menu-item>
                </div>
                <!-- <div v-model="email"> {{email}} </div> -->
                <md-button v-on:click="signout()">Sign Out</md-button>
              </md-menu-content>
            </md-card>
          </md-menu>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="null">
      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Notes</span>
        </md-list-item>

        <md-list-item>
          <md-icon>notifications_none</md-icon>
          <span class="md-list-item-text">Remainders</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item>
          <md-icon>label</md-icon>
          <span class="md-list-item-text">label</span>
        </md-list-item>

        <md-list-item>
          <md-icon>edit</md-icon>
          <span class="md-list-item-text">Edit label</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item>
          <md-icon>archive</md-icon>
          <span class="md-list-item-text">Archive</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-content>
      <create-note></create-note>
      <!-- Used Selector of create NoteHere -->
      <!-- <create-note1></create-note1> -->

      <!-- <component :is="component" ></component>
      <button @click="component=create-note1">one</button>
      <button @click="component=create-note">two</button> -->
    </md-app-content>
  </md-app>
  <!-- </div> -->
</template>

<script>
import CreateNote from "./CreateNote";
// import CreateNote1 from './CreateNote1'

import SearchBar from "./SearchBar";
export default {
  name: "PersistentFull",
  data: () => ({
    // component:CreateNote1,
    fileName: null,
    menuVisible: false,
    // searchbar: false,
    user: "",
    firstName: "hari",
    lastName: "",
    email: "",
    single: null
  }),

  components: {
    CreateNote,
    // "create-note1":CreateNote1,
    SearchBar
  },

    
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    signout() {
      this.$log.info(" sinOut..............:: ");
      this.$router.push("/");
    },

    created () {
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      this.user=this.firstName+this.lastName
      this.email = localStorage.getItem("email");
       this.$log.info(" sinOut..:: " + localStorage.getItem("firstName"));
    },
    
  }
  // destroyed: function(){
  //   alert('Destroyed');
  //   }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 350px;
  // height:630px;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  margin-top: 4.615em;
}

#search {
  width: 631px;
  background-color: lightgrey;
  border: none;
  margin: 5px 0px;
}

form.search-bar.md-layout {
  background-color: lightgrey;
}
// div.md-content.md-app-content.md-flex.md-theme-default {
//   height: 570px;
// }
.md-menu-content{
background-color:#F5F5F5;
width:300px;
height:500px;
}
</style>

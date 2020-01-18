<template>
  <!-- <div class="page-container"> -->
    <md-app>
      <md-app-toolbar class="">
          <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu" >
          <md-icon>menu</md-icon>
           <md-tooltip md-direction="bottom">Main menu</md-tooltip>

        </md-button>
        <div class="md-icon-button">
          <img src="../assets/icon_128.png" alt="icon">
          </div>
          <div><h2>Fundoo</h2></div>
        </div>

        <div id="serchId">
            <form class="search-bar md-layout">
              
          <md-button class="md-icon-button md-layout-item">
            <md-icon>search</md-icon>
            <md-tooltip md-direction="bottom">Search</md-tooltip>

          </md-button> 
                  <input 
                type="search"
                id="search"
                required
               autocomplete="off" 
                placeholder="Search"
                
              />

            <md-button class="md-icon-button md-layout-item">
            <md-icon>close</md-icon>
          </md-button>  
              <!-- </md-field> -->
              <!-- </> -->
            </form>
          </div>
    
    <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>refresh</md-icon>
             <md-tooltip md-direction="bottom">Refresh</md-tooltip>
          </md-button>

        <md-button class="md-icon-button">
            <img src="../assets/list_view_24px.svg" alt="List">
             <md-tooltip md-direction="bottom">List view</md-tooltip>

        </md-button>

        <md-button class="md-icon-button">
            <img src="../assets/settings_24px.svg" alt="Setting">
             <md-tooltip md-direction="bottom">Settings</md-tooltip>

          </md-button>

    <div >
        <md-menu md-size="medium" md-align-trigger>
        <!-- <md-button md-menu-trigger>Align with trigger</md-button> -->
        <md-card>
              <md-button md-menu-trigger class="md-icon-button" >
            <md-avatar>
                <img src="../assets/profile.jpg" alt="Avatar">
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
            </md-avatar>
        </md-button>

        <md-menu-content>
          <md-button md-menu-trigger class="md-icon-button" style="display:flex; flex:center" >
            <md-avatar>
                <img src="../assets/profile.jpg" alt="Avatar">
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
            </md-avatar>
        </md-button>
          <md-menu-item :v-model="user">{{user}}</md-menu-item>
          <md-menu-item v-model="email">{{email}}</md-menu-item>
          <md-menu-item>My Item 3</md-menu-item>
        </md-menu-content>
        </md-card>
     
      </md-menu>

    </div>
       
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="null" >
        
        
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
        <!-- Used Selector of create NoteHere -->
       <create-note></create-note>
       
      </md-app-content>

    </md-app>
  <!-- </div> -->
</template>

<script>
import CreateNote from './CreateNote'
  export default {
    name: 'PersistentFull',
    data: () => ({
      menuVisible: false,
      signout:false,
      user:"Shailesh Borase",
      email:"adhokshaj108@gmail.com"
    }),

    components:{
        CreateNote,
    },

    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      signout(){
        this.signout = !this.signout

      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    // height:630px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
    margin-top:4.615em;
  }

  #search {
    width: 631px;
    background-color: lightgrey;
    border: none;
    margin:5px 0px
;
}

form.search-bar.md-layout {
    background-color: lightgrey;
}

</style>
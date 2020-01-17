<template>
  <!-- <div class="page-container"> -->
    <md-app>
      <md-app-toolbar class="">
          <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu" >
          <md-icon>menu</md-icon>
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
          </md-button>

        <md-button class="md-icon-button">
            <img src="../assets/list_view_24px.svg" alt="List">
        </md-button>

        <md-button class="md-icon-button">
            <img src="../assets/settings_24px.svg" alt="Setting">
          </md-button>

        <md-button class="md-icon-button">
            <md-avatar>
                <img src="../assets/profile.jpg" alt="Avatar">
            </md-avatar>
        </md-button>
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
       Harikrishna
      </md-app-content>
    </md-app>
  <!-- </div> -->
</template>

<script>
  export default {
    name: 'PersistentFull',
    data: () => ({
      menuVisible: false
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
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
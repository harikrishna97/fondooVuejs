<template>
  <div>
    <md-toolbar>
         <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
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
        
      </div>

     
    </md-toolbar>


    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>


      </md-app-drawer>
    

    
  </div>
</template>



<script>
export default {
  name: 'ContentActions',
//   name: 'PersistentFull',
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
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }

  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
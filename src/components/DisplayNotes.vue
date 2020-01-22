<template>
  <div class="elevation-demo">
    <div v-for="note in AllNotes" :key="note">
      <md-card class="md-elevation-1">
        <!-- <md-ripple> -->
        <md-card-content class="content">
          <div class="title">
            <div class="title1">{{ note.title }}</div>

            <div>
              <md-button class=" md-icon-button">
                <img src="../assets/pin.svg" alt="pin" />
                <md-tooltip md-direction="bottom">Pin note</md-tooltip>
              </md-button>
            </div>
          </div>

          <div class="description">{{ note.description }}</div>
        </md-card-content>
        <md-card-toolbar class="searchtoolbar">
          <div class=" icon-toolbar md-toolbar-section">
            <md-button class="md-icon-button">
              <!-- <md-icon>add_alert</md-icon> -->
              <img src="../assets/remainder.svg" alt="remainder" />
              <md-tooltip md-direction="bottom">Remind me</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img src="../assets/collaborator.svg" alt="colaborator" />
              <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <!-- <md-icon>color_lens</md-icon> -->
              <img src="../assets/colorPalet.svg" alt="colorpalet" />
              <md-tooltip md-direction="bottom">Change color</md-tooltip>
            </md-button>

            <!-- <md-button class="md-icon-button"> -->
            <!-- <md-icon>image</md-icon> -->
            <!-- <img src="../assets/addImage.svg" alt="image" />
              <md-tooltip md-direction="bottom">Add image</md-tooltip>
            </md-button> -->

            <md-button class="md-icon-button">
              <!-- <md-icon>archive_none</md-icon> -->
              <img src="../assets/archive.svg" alt="archive" />
              <md-tooltip md-direction="bottom">Archive</md-tooltip>
            </md-button>

            <md-menu md-size="small" md-align-trigger>
              <!-- <md-button >Small</md-button> -->

              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
                <!-- <img src="../assets/threedot.svg" alt="more_vert"> -->
                <md-tooltip md-direction="bottom">more</md-tooltip>
              </md-button>

              <md-menu-content>
                <md-menu-item ><md-button @click="$emit('remove',note._id)">Delete Note</md-button></md-menu-item>
                <md-menu-item><md-button>Add Label </md-button> </md-menu-item>
                <!-- <md-menu-item><md-button>Add Label </md-button></md-menu-item> -->
              </md-menu-content>
            </md-menu>

            <!-- <md-button>close</md-button> -->
          </div>
        </md-card-toolbar>
        <!-- </md-ripple> -->
      </md-card>
      <!-- <display-notes></display-notes> -->
    </div>
  </div>
</template>

<script>
// import DisplayNotes from "./DisplayNotes";
// import { HTTP } from "../services/http-common";

export default {
  name: "CreateNote",
  props: ["AllNotes"],

  data: () => ({
    open: false,
    title: "",
    description: "",
    // colorPlate:[]
  }),

  components: {},

  mounted() {
    this.$log.info("Hari:" +this.note._id);
    // this.title = this.AllNotes;
    // this.description = this.AllNotes;
  }
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 250px;
  margin: 4px;
  //   height:200px;
  display: inline-block;
  vertical-align: top;
}

.inputClass {
  width: 166px;
  border: none;
  outline: none;
}
.description {
  justify-content: flex-start;
  display: flex;
}
.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.title1 {
  margin-top: 4%;
  position: relative;
}

.md-elevation-1 :hover .md-icon-button {
  //.icon-toolbar{
  visibility: visible;
}
.md-icon-button {
  visibility: hidden;
}
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}

.md-content {
  width: 100px;
  // height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// style="border:none;outline:none"
</style>

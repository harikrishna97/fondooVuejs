<template>
  <div>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content class="content">
          <div class="title">
            <div class="title1">{{ title }}</div>

            <div>
              <md-button class="md-icon-button">
                <img src="../assets/pin.svg" alt="pin" />
                <md-tooltip md-direction="bottom">Pin note</md-tooltip>
              </md-button>
            </div>
          </div>

          <div class="description">{{ description }}</div>
        </md-card-content>
        <md-card-toolbar class="searchtoolbar">
          <div class="md-toolbar-section">
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

            <md-button class="md-icon-button">
              <!-- <md-icon>image</md-icon> -->
              <img src="../assets/addImage.svg" alt="image" />
              <md-tooltip md-direction="bottom">Add image</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <!-- <md-icon>archive_none</md-icon> -->
              <img src="../assets/archive.svg" alt="archive" />
              <md-tooltip md-direction="bottom">Archive</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
              <!-- <img src="../assets/threedot.svg" alt="more_vert"> -->
              <md-tooltip md-direction="bottom">more</md-tooltip>
            </md-button>
            <!-- <md-button>close</md-button> -->
          </div>
        </md-card-toolbar>
      </md-ripple>
    </md-card>
    <!-- <display-notes></display-notes> -->
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
    getallnotes: []
  }),

  components: {},

  mounted() {
    this.$log.info("Hari:" + JSON.stringify(this.AllNotes[0]));
    this.title = this.AllNotes[0].title;
    this.description = this.AllNotes[0].description;
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

.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.title1 {
  margin-top: 4%;
  position: relative;
}

// style="border:none;outline:none"
</style>

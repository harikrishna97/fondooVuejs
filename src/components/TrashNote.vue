<template>
  <div class="elevation-demo">
    <div v-for="note in trashNotes" :key="note">
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
          <div class=" icon-toolbar md-toolbar-section-start">
            <md-button class="md-icon-button">
              <img src="../assets/deleteForever.svg" alt="deleteForever" />
              <md-tooltip md-direction="bottom">Delete Forever</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="restoreNote(note._id)">
              <!-- <md-icon>add_alert</md-icon> -->
              <img src="../assets/restore.svg" alt="restore" />
              <md-tooltip md-direction="bottom">Restore Note</md-tooltip>
            </md-button>
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
import { HTTP } from "../services/http-common";

export default {
  name: "CreateNote",
//   props: ["AllNotes"],

  data: () => ({
    open: false,
    trashNotes: []
  }),

  components: {},

  mounted() {
    // this.$log.info("Hari:" + this.note._id);
    this.getAllTrashNotes();
    // this.title = this.AllNotes;
    // this.description = this.AllNotes;
  },

  methods: {
    getAllTrashNotes() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("trash", auth)
        .then(response => {
        //   this.$log.info("response :: " + JSON.stringify(response.data.data));
          this.trashNotes = response.data.data;
        //   this.title=this.trashNotes.title;
        //   this.description=this.trashNotes.description;


          this.$log.info("trashNotes :: " + JSON.stringify(this.trashNotes));

        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },
    restoreNote(noteId) {
      const token = localStorage.getItem("token");
      const trashData={}
      this.flagValue=false
      const auth = { headers: { token: token } };
      HTTP.put("/flag/"+noteId+"/"+"trash",trashData,auth)
        .then(response => {
          this.$log.info("response restore :: " + JSON.stringify(response.data.data));
          this.trashNotes = response.data.data;
          this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
          this.getAllTrashNotes();

        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    }
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

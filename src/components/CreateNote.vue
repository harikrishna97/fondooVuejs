<template>
  <div>
    <!-- @createNote1 -->
    <div v-if="open == false" @click="toggleComponent" class="create1">
      <md-card class="card1">
        <div class="inputDiv">
          <input type="text" placeholder="  Take a note..." class="input1" />
        </div>

        <div class="create1Icons">
          <md-button class="md-icon-button">
            <img src="../assets/newList.svg" alt="newList" />
            <md-tooltip md-direction="bottom">New List</md-tooltip>
          </md-button>
          <md-button class="md-icon-button">
            <img src="../assets/brush.svg" alt="brush" />
            <md-tooltip md-direction="bottom">New Note with Drawing</md-tooltip>
          </md-button>
          <md-button class="md-icon-button">
            <img src="../assets/addImage.svg" alt="image" />
            <md-tooltip md-direction="bottom">New Note with Image</md-tooltip>
          </md-button>
        </div>
      </md-card>
    </div>

    <!-- CreateNote2 -->
    <div v-else class="create1">
      <md-card class="card2" :style="`background-color: ${noteColor}`">
        <md-card-content>
          <div class=" md-layout">
            <div>
              <input
                class="md-layout-item md-size-50"
                type="text"
                name="title"
                v-model="title"
                placeholder="Title"
                :style="`background-color: ${noteColor}`"
              />
            </div>

            <div>
              <md-button class="md-icon-button">
                <img src="../assets/pin.svg" alt="pin" />
                <md-tooltip md-direction="bottom">Pin note</md-tooltip>
              </md-button>
            </div>
          </div>
          <div class="takeanote">
            <input
              type="text"
              name="description"
              v-model="description"
              placeholder="Take a note..."
              class="inputtext"
              :style="`background-color: ${noteColor}`"
            />
          </div>
        </md-card-content>
        <div class="icons2">
          <div class="Iconns">
            <Icons
              v-on:reminder="remainder"
              @collaborator="addCollaborator"
              @archive="addArchive"
              @colorpalet="colorPalet"
              @moreVert="moreVert"
              @shareColor="shareColor"
            ></Icons>
          </div>

          <div>
            <md-button @click="toggleComponent">close</md-button>
          </div>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import Icons from "./Icons";

export default {
  name: "CreateNote",

  data: () => ({
    open: false,
remainderNote:null,
    title: null,
    description: null,
    noteColor: ""
  }),
  components: { Icons },

  methods: {
    remainder(flag) {
      this.remainderNote=flag;
      this.$log.info("addRemainder:flag :: " + flag);
    },
    addCollaborator(flag) {
      this.$log.info("addCollaborator:flag ::  " + flag);
    },
    addArchive(flag) {
      this.$log.info("addArchive:flag :: " + flag);
    },
    colorPalet(flag) {
      this.$log.info("colorPalet:flag :: " + flag);
      // this.noteColor=color;
    },
    shareColor(color) {
      this.noteColor = color;
    },
    // moreVert(flag) {this.$log.info("moreVert:flag :: " +flag);},

    /**
     * @description toggle value to close current componet and to Create Note
     */
    toggleComponent() {
      this.open = !this.open;
      // this.$log.info("open:: " + this.open);
      this.createNote();
      (this.title = null), (this.description = null)
      this.noteColor="";
      return this.open;
    },
    // /**
    //  * @description check title and description is not empty to Create Note
    //  */
    // notEmpty() {
    //   if (this.title && this.description !== null) {
    //     this.createNote();
    //   }
    // },
    /**
     * @description function to Create Note
     */
    createNote() {
      if (this.title && this.description !== null) {
        const noteData = {};
        noteData.title = this.title;
        noteData.description = this.description;
        noteData.color = this.noteColor;
        noteData.remainder=this.remainder;
        // this.$log.info("NoteData :: " + JSON.stringify(noteData));
        const token = localStorage.getItem("token");
        // this.$log.info("token :: " + typeof token);

        const auth = { headers: { token: token } };
        HTTP.post("note", noteData, auth)
          .then(response => {
            this.$log.info(
              "response :: " + JSON.stringify(response.data.data.title)
            );
            this.$emit("updateNote", "note added");
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/createNote.css";
</style>

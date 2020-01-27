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
    <div v-else>
      <md-card class="card2">
        <md-card-content>
          <div class=" md-layout">
            <div>
              <input
                class="md-layout-item md-size-50"
                type="text"
                name="title"
                v-model="title"
                placeholder="Title"
                style="border:none;outline:none"
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
              style="border:none;outline:none"
            />
          </div>
        </md-card-content>
        <div class="icons2">
          <!-- style="display:flex; justify-content:space-between" -->

          <div>
            <Icons
              @remainder="addRemainder"
              @collaborator="addCollaborator"
              @archive="addArchive"
              @colorpalet="colorPalet"
              @moreVert="moreVert"
            ></Icons>
          </div>

          <div>
            <md-button @click="toggleComponent">close</md-button>
          </div>
        </div>

        <!-- <md-card-actions> -->
        <!-- <md-bottom-bar> -->
        <!-- <md-toolbar class="searchtoolbar">
          <div class="md-toolbar-section">
            <md-button class="md-icon-button">
              <img src="../assets/remainder.svg" alt="remainder" />
              <md-tooltip md-direction="bottom">Remind me</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img src="../assets/collaborator.svg" alt="colaborator" />
              <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img src="../assets/colorPalet.svg" alt="colorpalet" />
              <md-tooltip md-direction="bottom">Change color</md-tooltip>
            </md-button>

            
            <md-button class="md-icon-button">
              <img
                src="../assets/archive.svg"
                style="transform: scaleX(-1);"
                alt="archive"
              />
              <md-tooltip md-direction="bottom">Archive</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
              <md-tooltip md-direction="bottom">more</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img src="../assets/undo.svg" alt="undo" />
              <md-tooltip md-direction="bottom">Undo</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img
                src="../assets/undo.svg"
                style="transform: scaleX(-1);"
                alt="redo"
              />
              <md-tooltip md-direction="bottom">Redo</md-tooltip>
            </md-button>

          </div>
          <div class="md-toolbar-section-end">
            <md-button @click="toggleComponent">close</md-button>
          </div>
        </md-toolbar> -->

        <!-- </md-ripple> -->
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

    title: null,
    description: null
  }),
  components: { Icons },

  methods: {
    addRemainder(flag) {this.$log.info("addRemainder:flag :: " +flag);},
    addCollaborator(flag) {this.$log.info("addCollaborator:flag ::  " +flag);},
    addArchive(flag) {this.$log.info("addArchive:flag :: " +flag);},
    colorPalet(flag) {this.$log.info("colorPalet:flag :: " +flag);},
    moreVert(flag) {this.$log.info("moreVert:flag :: " +flag);},

    /**
     * @description toggle value to close current componet and to Create Note
     */
    toggleComponent() {
      this.open = !this.open;
      this.$log.info("open:: " + this.open);
      this.createNote();
      (this.title = null), (this.description = null);
      return this.open;
    },
    /**
     * @description check title and description is not empty to Create Note
     */
    notEmpty() {
      if (this.title && this.description !== null) {
        this.createNote();
      }
    },
    /**
     * @description function to Create Note 
     */
    createNote() {
      if (this.title && this.description !== null) {
        const noteData = {};
        noteData.title = this.title;
        noteData.description = this.description;
        this.$log.info("NoteData :: " + JSON.stringify(noteData));
        const token = localStorage.getItem("token");
        this.$log.info("token :: " + typeof token);
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        const auth = { headers: { token: token } };
        HTTP.post("note", noteData, auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response));
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

.card1 {
  display: flex;
  width: 550px;
  margin: 4px;
  border-radius: 8px;
  overflow: hidden;
}
.searchtoolbar {
  display: flex;
  flex: left;
}
.create1 {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.input1 {
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  border-radius: 8px;
}
.inputDiv {
  width: 70%;
}
.create1Icons {
  width: 30%;
}
.card2 {
  display: inline-block;
  width: 550px;
  margin: 4px;
  display: align-item;
  overflow: hidden;
  border-radius: 8px;
}
.icons2 {
  display: flex;
  justify-content: space-between;
}
.md-layout-item.md-size-50 {
  min-width: 100%;
  max-width: 100%;
  flex: 0 1 50%;
}

.takeanote {
  border: none;
  outline: none;
  display: flex;
}
input.md-layout-row {
  width: 461px;
}

div.md-card-content div input {
  width: 453px;
  padding-left: 6px;
}
.md-icon-button {
  opacity: 0.65;
}
</style>

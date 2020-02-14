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
                v-model="title"
                name="title"
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
            <!-- ------------ -->
          </div>
          <div v-if="collaborators != null" class="Icons">
            <div
              v-for="collaborator in collaborators"
              :key="collaborator.userId"
            >
              <div>
                <img class="round" :src="collaborator.imageUrl" alt="Avatar" />
                <md-tooltip md-direction="bottom">{{
                  collaborator.email
                }}</md-tooltip>
              </div>
              <!-- </md-button> -->
            </div>
          </div>

          <div v-if="remainderNote != null" class="Icons">
            <md-chip
              class=""
              md-deletable
              @md-delete="
                getNoteId(note._id);
                deleteReminder();
              "
              >{{ remainderNote }}</md-chip
            >
          </div>
        </md-card-content>
        <div class="icons2">
          <div class="Iconns">
            <Icons
              @archive="addArchive"
              @shareColor="shareColor"
              @deleteNote="deleteNote"
              @reminder="remainder"
              @collaboratorcreate="addCollaborator"
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
import {
  createNoteService,
  createCollaboratorService
} from "../services/messageService";
export default {
  name: "CreateNote",

  data: () => ({
    open: false,
    remainderNote: null,
    title: null,
    description: null,
    noteColor: "",
    isArchive: false,
    isTrash: false,
    collaborators: [],
    collaboratorId: null,
    currentNoteId: null
  }),
  components: { Icons },
  created() {
    // subscribe to home component messages
    this.subscription = createNoteService
      .getFromCollaboratorNote()
      .subscribe(message => {
        if (message) {
          // add message to local state if not empty
          this.collaborators.push(message.text);
          this.collaboratorId = message.text.userId;
          this.$log.info("collaborator from  Collaborator:: ", message.text);
        }
      });
  },
  methods: {
    addCollaborator(flag) {
      this.$log.info(
        " CreateNote addCollaborator:flag ::  " + JSON.stringify(flag)
      );
    },
    deleteNote(flag) {
      this.isTrash = flag;
      this.$log.info("deleteNote:flag create:: " + flag);
      this.open = !this.open;
      this.createNote();
      this.title = null;
      this.description = null;
      this.noteColor = "";
      this.remainderNote = null;
      this.isArchive = false;
      this.isTrash = false;
    },
    remainder(flag) {
      this.remainderNote = flag;
      this.$log.info("addRemainder:flag create:: " + flag);
    },

    addArchive(flag) {
      if (flag == true) {
        this.isArchive = true;
        this.open = !this.open;
        this.createNote();
        this.title = null;
        this.description = null;
        this.noteColor = "";
        this.remainderNote = null;
        this.isArchive = false;
        this.isTrash = false;
      }
      this.$log.info("addArchive:flag :: " + flag);
    },

    shareColor(color) {
      this.noteColor = color;
    },
    sendToCreateCollaborator() {
      this.$log.info(
        "Im in sendToCreateCollaborator now:: " + this.currentNoteId,
        "gsgs",
        this.collaboratorId
      );
      const DataToCollaborator = {};
      DataToCollaborator.noteId = this.currentNoteId;
      DataToCollaborator.collaboratorId = this.collaboratorId;
      createCollaboratorService.sendToCreateCollaborator(DataToCollaborator);
    },
    /**
     * @description toggle value to close current componet and to Create Note
     */
    toggleComponent() {
      this.open = !this.open;
      this.collaborators = [];

      // this.$log.info("open:: " + this.open);
      this.createNote();
      (this.title = null), (this.description = null);
      this.noteColor = "";
      this.remainderNote = null;
      this.isArchive = false;
      this.isTrash = false;

      // return this.open;
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
      this.$log.info("TitleAnd Description :: " + this.title, this.description);
      if (this.title && this.description !== null) {
        const noteData = {};
        noteData.title = this.title;
        noteData.description = this.description;
        noteData.color = this.noteColor;
        noteData.remainder = this.remainderNote;
        noteData.isArchive = this.isArchive;
        noteData.isTrash = this.isTrash;
        // this.$log.info("NoteData :: " + JSON.stringify(noteData));
        const token = localStorage.getItem("token");
        // this.$log.info("token :: " + typeof token);

        const auth = { headers: { token: token } };
        HTTP.post("note", noteData, auth)
          .then(response => {
            if (response) {
              this.currentNoteId = response.data.data._id;
              this.sendToCreateCollaborator();
              this.collaboratorId = null;
              this.currentNoteId = null;
              this.$log.info(
                "Creatd new note in create Note :response :: " +
                  JSON.stringify(response.data.data._id)
              );
              // if (this.collaboratorId !== null) {
              this.$log.info(
                "error :: " + this.collaboratorId,
                this.currentNoteId
              );

              // }

              this.$emit("updateNote", "note added");
            }
          })
          .catch(err => {
            this.$log.info("error :: " + err);
            this.$emit("updateNote", "note added");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/createNote.css";
.round {
  .img {
    border-radius: 50%;
  }
  border-radius: 25px;
  background: white;
  padding: 2px;
  width: 25px;
  height: 25px;
}
</style>

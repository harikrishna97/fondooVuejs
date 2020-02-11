<template>
  <div
    class="elevation-demo"
    :class="listView ? 'listViewClass' : 'gridViewClass'"
  >
    <div v-for="note in AllNotes" :key="note._id">
      <md-card
        class="md-elevation-1"
        :style="`background-color: ${note.color}`"
        v-bind:note="note._id"
        :class="listView ? 'md-card1' : 'md-card2'"
      >
        <!-- {{note}} -->

        <!-- <md-ripple> -->
        <md-card-content class="content">
          <div class="title">
            <div
              class="title1"
              @click="
                noteEdit();
                shareId(note);
              "
            >
              {{ note.title }}
            </div>

            <div>
              <md-button class=" md-icon-button">
                <img src="../assets/pin.svg" alt="pin" />
                <md-tooltip md-direction="bottom">Pin note</md-tooltip>
              </md-button>
            </div>
          </div>
          <div
            class="description"
            @click="
              noteEdit();
              shareId(note);
            "
          >
            {{ note.description }}
          </div>

          <div v-if="note.label != null" class="Icons">
            <div v-for="label in note.label" :key="label._id">
              <md-chip
                class=""
                md-deletable
                @md-delete="
                  getNoteId(note._id);
                  deleteLabel(label._id);
                "
                >{{ label.label }}</md-chip
              >
            </div>
            <!-- md-limit md-delete -->
            <!-- <md-chips v-model="messages" md-placeholder></md-chips> -->
          </div>
          <!-- ---------- -->
          <div v-if="note.collaborator != null" class="Icons">
            <div
              v-for="collaborator in note.collaborator"
              :key="collaborator._id"
            >
              <!-- {{collaborator.imageUrl}} -->
              <!-- <md-button  class="md-icon-button"> -->
              <div>
                <img class="round" :src="collaborator.imageUrl" alt="Avatar" />
                <md-tooltip md-direction="bottom">{{
                  collaborator.email
                }}</md-tooltip>
              </div>
              <!-- </md-button> -->
            </div>
            <!-- md-limit md-delete -->
            <!-- <md-chips v-model="messages" md-placeholder></md-chips> -->
          </div>

          <div v-if="note.remainder != null" class="Icons">
            <md-chip
              class=""
              md-deletable
              @md-delete="
                getNoteId(note._id);
                deleteReminder();
              "
              >{{ note.remainder }}</md-chip
            >
            <!-- <md-chips v-model="messages" md-placeholder></md-chips> -->
          </div>
        </md-card-content>
        <div @click="getNoteId(note._id)">
          <Icons
            class="Icons"
            :collaboratorsArray="AllNotes"
            :collNoteId="collNoteId"
            @deleteCollaborator="deleteCollaborator"
            @update="updateNotes"
            @addLabel="labelIdFromIcon"
            @collaborator="addCollaborator"
            @archive="addArchive"
            @colorpalet="colorPalet1"
            @moreVert="moreVert"
            @deleteNote="deleteNote1"
            @shareColor="shareColor"
            @reminder="shareReminder"
          ></Icons>
        </div>
      </md-card>
    </div>
    <div v-if="editnote == true">
      <md-dialog :md-active.sync="editnote">
        <EditNote
          @updateNote="updateNotes"
          :note="note"
          @closeEdit="noteEdit"
        ></EditNote>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import EditNote from "./EditNote";
import { HTTP } from "../services/http-common";
import Icons from "./Icons";
import { listGridService } from "../services/messageService";

export default {
  name: "CreateNote",
  props: ["AllNotes", "remaindersLabel"],

  data: () => ({
    currentLabelId: null,
    listView: false,
    open: false,
    editnote: false,
    title: "",
    description: "",
    cardColor: "",
    reminderValue: null,
    note: "",
    mdMenuTrigger: false,
    currentNoteId: "",

    colorCode: "",
    messages: [],
    defaultImage: "",
    collaboratorId: null,
    collaboratorsArray: [],
    collNoteId: null
  }),

  components: { EditNote, Icons },
  methods: {
    deleteLabel(labelId) {
      this.currentLabelId = labelId;
      this.updateFlag("del_label", this.currentNoteId);
      this.$log.info("adgfdrfghxdfghfyhfhfh ");
    },
    deleteReminder() {
      this.$log.info("Delete  reminder ");
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      const noteId = this.currentNoteId;
      this.$log.info("noteId .... :: " + this.currentNoteId);

      HTTP.delete("remainder/" + noteId, auth)
        .then(response => {
          this.$log.info(
            "response delete reminder :: " + JSON.stringify(response.data.data)
          );
          this.$emit("updateNote", "note updated");
          // this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },

    deleteCollaborator(Id) {
      this.collaboratorId = Id;
    },
    addCollaborator(flag) {
      this.collaboratorId = flag;
      this.$log.info("addCollaborator2:flag ::  ", flag, this.collaboratorId);
      this.addCollaboratorToNote();
    },
    labelIdFromIcon(labelId) {
      this.currentLabelId = labelId;
      this.updateFlag("label", this.currentNoteId);
    },

    shareReminder(reminder) {
      this.reminderValue = reminder;
      // this.$log.info("reminderValue from icon :: " + this.reminderValue);
      this.addRemainderToNote(this.reminderValue);
    },
    addRemainder(flag) {
      this.$log.info("addRemainder:flag :: " + flag);
    },

    addArchive(flag) {
      this.$log.info("addArchive:flag :: " + flag);
      this.updateFlag("archive", this.currentNoteId);
    },
    colorPalet1(flag) {
      this.$log.info("display colorPalet1:flag :: " + flag);
    },
    shareColor(code) {
      this.colorCode = code;
      // this.$log.info("getColor:colorcode :: " + code);
      // this.$log.info("getColor:colorcode :: " + this.colorCode);
      this.updateFlag("color", this.currentNoteId);
    },

    moreVert(flag) {
      this.$log.info("moreVert:flag :: " + flag);
      this.mdMenuTrigger = true;
    },
    deleteNote(flag) {
      this.$log.info("deleteNote:flag :: " + flag);
    },

    noteEdit() {
      this.editnote = !this.editnote;
      this.$log.info("editnote :" + this.editnote);
    },
    shareId(note) {
      this.note = note;
      this.$log.info("Shareed note :" + this.note);
    },
    updateNotes(data) {
      this.$log.info("data :: " + data);
      this.$emit("updateNote", "data");
    },

    getNoteId(noteId) {
      this.$log.info("note id at 246: ", noteId);
      this.currentNoteId = noteId;
      // this.$log.info("note id at 246: ", this.currentNoteId);
    },
    updateFlag(flag, noteId) {
      this.$log.info("Flag selected :: " + flag);
      this.$log.info("noteid selected :: " + noteId);

      const token = localStorage.getItem("token");
      const editData = {};
      if (flag == "archive") {
        editData.flagValue = true;
      } else if (flag == "color") {
        editData.flagValue = this.colorCode;
      } else if (flag == "label") {
        editData.flagValue = this.currentLabelId;
      } else if (flag == "del_label") {
        editData.flagValue = this.currentLabelId;
      }

      const auth = { headers: { token: token } };
      this.$log.info("noteId .... :: " + noteId);

      HTTP.put("/flag/" + noteId + "/" + flag, editData, auth)
        .then(response => {
          // this.$log.info(
          //   "response restore :: " + JSON.stringify(response.data.data)
          // );
          this.$emit("updateNote", "note updated");
          this.trashNotes = response.data.data;
          // this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },

    deleteNote1(flag) {
      if (flag == true) {
        const noteId = this.currentNoteId;
        this.$log.info(" current note :: " + noteId);
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        HTTP.delete("note/" + noteId, auth)
          .then(response => {
            this.$log.info(
              " Display:delete Notes: response :: " + response.data.data
            );
            this.$emit("updateNote", "after delete");
            // this.AllNotes = response.data.data;
            // this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
            // this.getAllnotes();
          })
          .catch(err => {
            this.$log.info("Display:DeleteNote :error :: " + err);
          });
      }
    },
    addCollaboratorToNote() {
      if (this.collaboratorId !== null) {
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        this.collNoteId = this.currentNoteId;
        this.$log.info(
          "TOken $.... :: " + auth,
          this.currentNoteId,
          this.collaboratorId,
          token,
          this.collNoteId
        );
        const noteId = this.currentNoteId;
        // const collaboratorId=this.collaboratorId;
        HTTP.post(
          "collaborator/" + noteId + "/" + this.collaboratorId,
          {},
          auth
        )
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response.data.data));
            this.$emit("updateNote", "note updated");
            this.collaboratorsArray.push(response.data.data);
            this.$log.info(
              "collaboratorsArray :: " + JSON.stringify(this.collaboratorsArray)
            );
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    },

    deleteCollaboratorFromNote() {
      if (this.collaboratorId !== null) {
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        this.$log.info("TOken $.... :: " + auth, this.collaboratorId, token);
        // const collaboratorId=this.collaboratorId;
        HTTP.delete("collaborator/" + this.collaboratorId, {}, auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response.data.data));
            this.$emit("updateNote", "note updated");
            // this.collaboratorsArray.push(response.data.data);
            // this.$log.info(
            //   "collaboratorsArray :: " + JSON.stringify(this.collaboratorsArray)
            // );
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    },
    addRemainderToNote(value) {
      const reminderData = {};
      reminderData.remainder = value;
      const token = localStorage.getItem("token");

      const auth = { headers: { token: token } };
      const noteId = "5e3270ad174f8639caed2f06"; //this.currentNoteId;
      this.$log.info("noteId .... :: " + this.currentNoteId);

      HTTP.post("remainder/" + noteId, reminderData, auth)
        // /flag/5e15c3822a8f156011ea42e7/trash
        .then(response => {
          // this.$log.info(
          //   "response restore :: " + JSON.stringify(response.data.data)
          // );
          this.$emit("updateNote", "note archived");
          this.trashNotes = response.data.data;
          // this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    }

    // getUpdateDataFromEditNote() {
    //   this.subscription = editService.getDataFromEdit().subscribe(message => {
    //   if (message) {

    //   }else{

    //   }
    //   });

    // }
  },
  mounted() {
    // this.defaultImage = localStorage.getItem("imageUrl");
    // this.$log.info("Display :: Note Object " + JSON.stringify(this.noteId));
    // this.title = this.AllNotes;
    // this.description = this.AllNotes;
  },
  created() {
    // subscribe to home component messages
    this.subscription = listGridService.getListView().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.listView = message.text;
        // this.$log.info(
        //   "DisplayComponent:RXJS message from toolbar:: " +
        //     JSON.stringify(this.listView)
        // );
      } else {
        // clear messages when empty message received
        this.messages = [];
        // this.$log.info("RXJS message :: " + JSON.stringify(this.messages));
      }
    });
  },
  beforeDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
};
</script>

<style lang="scss" scoped>
// @import "../style/displayNote.css";
.Icons {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.gridViewClass {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}
.listViewClass {
  padding: 16px;
}

.md-card2 {
  width: 250px;
  margin: 10px;
  /* //   height:200px; */
  display: inline-block;
  vertical-align: top;
}
.md-card1 {
  width: 550px;
  margin: 10px;
  /* //   height:200px; */
  display: inline-block;
  vertical-align: top;
}

.md-icon-button {
  opacity: 0.85;
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
.md-elevation-1 {
  border-radius: 8px;
}
.md-elevation-1 :hover .md-icon-button {
  visibility: visible;
}
.md-icon-button {
  visibility: hidden;
}

.md-content {
  width: 100px;
  /* // height: 100px; */
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.collaboratorDiv {
  // background-color: grey;
  border-radius: 25px;
  width: 25px;
  height: 25px;
}
.md-avatar {
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  position: relative;
  border-radius: 40px;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color;
  will-change: color, background-color;
  font-size: 24px;
  letter-spacing: -0.05em;
  vertical-align: middle;
  padding: 5px 7px 3px;
}
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

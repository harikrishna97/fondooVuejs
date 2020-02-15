<template>
  <div v-if="isOpen === true">
    <md-card class="card" :style="`background-color: ${noteColor}`">
      <md-card-content>
        <form>
          <div class=" md-layout">
            <div>
              <input
                class="md-layout-item md-size-50 "
                type="text"
                name="title"
                v-model="title"
                placeholder="Title"
                style="border:none;outline:none"
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
              style="border:none;outline:none"
              :style="`background-color: ${noteColor}`"
            />
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
          <div v-if="note.remainder != null" class="Icons">
            <md-chip
              class=""
              md-deletable
              @md-delete="
                getNoteId(note._id);
                deleteReminder();
              "
              >{{ remainder }}</md-chip
            >
          </div>
        </form>
      </md-card-content>
      <div class="Icons">
        <Icons
          @shareColor="shareColor"
          v-on:reminder="shareReminder"
          @archive="addArchive"
          @deleteNote="deleteNote1"
        >
        </Icons>
        <div class="">
          <md-button @click="toggleComponent">close</md-button>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import Icons from "./Icons";
import {
  updateNoteService,
  createNoteService,
  createCollaboratorService
} from "../services/messageService";

export default {
  name: "editNote",
  data: () => ({
    isOpen: true,
    title: null,
    description: null,
    noteColor: "",
    remainder: null,
    isArchive: false,
    isTrash: false,
    collaborators: [],
    collaboratorId: null,
    currentNoteId: null
  }),
  components: {
    Icons
  },
  props: ["note"],

  mounted() {
    this.$log.info("Shared note from display :: " + this.note);
    this.title = this.note.title;
    this.description = this.note.description;
    this.noteColor = this.note.color;
    this.remainder = this.note.remainder;
    this.currentNoteId = this.note._id;
    this.collaborators = this.note.collaborator;
  },
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
    deleteNote1(flag) {
      this.$log.info("editNote:delete:flag :: " + flag);
      this.isTrash = flag;
      this.isOpen = false;
      this.editNote();
    },
    addArchive(flag) {
      this.$log.info("editNote:addArchive:flag :: " + flag);
      this.isOpen = false;
      this.isArchive = flag;
      this.editNote();
      // this.sendUpdateNote();
    },
    shareReminder(value) {
      this.$log.info("in edit :share remainder:", value);
      this.remainder = value;
    },
    shareColor(code) {
      this.$log.info("display noteColor:flag :: " + code);
      this.noteColor = code;
    },

    toggleComponent() {
      this.isOpen = false;
      this.editNote();
      // this.sendUpdateNote();

      (this.title = null), (this.description = null);
      // this.$emit("closeEdit", "false");
    },
    sendUpdateNote() {
      updateNoteService.sendUpdateNote("updateNote");
    },
    sendToCreateCollaborator() {
      this.$log.info(
        "Im in sendToLabelCollaborator now:: " + this.currentNoteId,
        "gsgs",
        this.collaboratorId
      );
      const DataToCollaborator = {};
      DataToCollaborator.noteId = this.currentNoteId;
      DataToCollaborator.collaboratorId = this.collaboratorId;
      createCollaboratorService.sendToCreateCollaborator(DataToCollaborator);
    },
    editNote() {
      this.$log.info("Im in edit note now.. :: ");
      if (this.title && this.description !== null) {
        const noteData = {};
        noteData.title = this.title;
        noteData.description = this.description;
        if (this.noteColor != "") {
          noteData.color = this.noteColor;
        }

        if (this.remainder != null) {
          noteData.remainder = this.remainder;
        }

        if (this.isArchive != false) {
          noteData.isArchive = true;
        }

        if (this.isTrash != false) {
          noteData.isTrash = true;
        }

        // noteData.collaborator=this.collaborator;
        // this.$log.info("NoteData :: " + JSON.stringify(noteData));
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        HTTP.put("note/" + this.note._id, noteData, auth)
          .then(response => {
            // this.$emit("updateNote", "noteupdated");
            this.currentNoteId = response.data.data._id;
              this.sendToCreateCollaborator();
              this.collaboratorId = null;
              this.currentNoteId = null;
            this.sendUpdateNote();

            this.title = null;
            this.description = null;
            this.noteColor = "";
            this.$log.info(
              "Edited:response :: " + JSON.stringify(response.data.data._id)
            );
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
.Icons {
  display: flex;
  justify-content: flex-start;
  // flex-wrap: wrap;
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
.md-dialog {
  z-index: 6;
}
.md-card {
  width: 550px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  //   border-radius: 8px;
}
.searchtoolbar {
  display: flex;
  flex: left;
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
  opacity: 0.95;
  // background-size: 120px 120px;
  //   height: 120px;
  //   margin: 20px;
  //   opacity: .1;
  //   width: 120px;
}
</style>

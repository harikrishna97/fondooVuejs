<template>
  <div class="elevation-demo">
    <div v-for="note in AllNotes" :key="note._id">
      <md-card
        class="md-elevation-1"
        :style="`background-color: ${note.color}`"
        v-bind:note="note._id"
        
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
        </md-card-content>
        <div v-on:click="getNoteId(note._id)">
          <Icons
            @remainder="addRemainder"
            @collaborator="addCollaborator"
            @archive="addArchive"
            @colorpalet="colorPalet1"
            @moreVert="moreVert"
            @deleteNote="deleteNote1"
          ></Icons>
        </div>

       


       
        <!-- <div class=" icon-toolbar md-toolbar-section">
            <md-button class="md-icon-button">
              <img src="../assets/remainder.svg" alt="remainder" />
              <md-tooltip md-direction="bottom">Remind me</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <img src="../assets/collaborator.svg" alt="colaborator" />
              <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
            </md-button>

            <md-menu md-size="medium" md-direction="top-start" md-align-trigger>
              <md-button md-menu-trigger class="md-icon-button">
                <img src="../assets/colorPalet.svg" alt="colorPalet" />
                <md-tooltip md-direction="bottom">Change color</md-tooltip>
              </md-button> -->

        <!-- <md-menu-content>
                <div class="menuContent" >
                  <md-avatar
                    class="palet"
                    v-for="color in colorPalet"
                    :key="color.colorName"
                    :style="`background-color: ${color.colorCode}`"
                    v-on="updateFlag(color.colorCode,note._id)"

                  >
                   
                  </md-avatar>
                </div>
              </md-menu-content>
            </md-menu> -->

        <!-- <md-button class="md-icon-button" @click="updateFlag(note_id)">
              <img src="../assets/archive.svg" alt="archive" />
              <md-tooltip md-direction="bottom">Archive</md-tooltip>
            </md-button>

            <md-menu md-size="small" md-align-trigger>

              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
                <md-tooltip md-direction="bottom">more</md-tooltip>
              </md-button>

              <md-menu-content>
                <md-menu-item
                  ><md-button @click="$emit('remove', note._id)"
                    >Delete Note</md-button
                  ></md-menu-item
                >
                <md-menu-item><md-button>Add Label </md-button> </md-menu-item>
              </md-menu-content> -->
        <!-- </md-menu> -->
        <!-- </div> -->
        <!-- </md-toolbar> -->
      </md-card>
    </div>

    <div v-if="editnote == true">
      <md-dialog :md-active.sync="editnote">
        <EditNote
          :note="note"
          @closeEdit="noteEdit"
          @updateNote="updateNotes"
        ></EditNote>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import EditNote from "./EditNote";
import { HTTP } from "../services/http-common";
import Icons from "./Icons";

export default {
  name: "CreateNote",
  props: ["AllNotes"],

  data: () => ({
    open: false,
    editnote: false,
    title: "",
    description: "",
    cardColor: "",
    note:"",
    mdMenuTrigger: false,
    currentNoteId:"",
    colorPalet: [
      {
        colorName: "White",
        colorCode: "#ffffff"
      },
      {
        colorName: "Red",
        colorCode: "#ea2e2e"
      },
      {
        colorName: "Orange",
        colorCode: "#ffb600"
      },
      {
        colorName: "Yellow",
        colorCode: "#e1e82e"
      },
      {
        colorName: "Green",
        colorCode: "#ccff90"
      },
      {
        colorName: "Teal",
        colorCode: "#a7ffeb"
      },
      {
        colorName: "Blue",
        colorCode: "#281bd6"
      },
      {
        colorName: "Dark blue",
        colorCode: "#aecbfa"
      },
      {
        colorName: "Purple",
        colorCode: "#d7adfb"
      },
      {
        colorName: "Pink",
        colorCode: "#fdcfe8"
      },
      {
        colorName: "Dark Brown",
        colorCode: "#e6c9a7"
      },
      {
        colorName: "Gray",
        colorCode: "#e8eaed"
      }
    ]
  }),

  components: { EditNote, Icons },
  methods: {
    addRemainder(flag) {
      this.$log.info("addRemainder:flag :: " + flag);
    },
    addCollaborator(flag) {
      this.$log.info("addCollaborator:flag ::  " + flag);
    },
    addArchive(flag) {
      this.$log.info("addArchive:flag :: " + flag);
    },
    colorPalet1(flag) {
      this.$log.info("colorPalet1:flag :: " + flag);
    },
    moreVert(flag) {
      this.$log.info("moreVert:flag :: " + flag);
      // this.mdMenuTrigger=true;
      // this.$log.info("moreVert:mdMenuTrigger :: " +this.mdMenuTrigger);

    },
     deleteNote(flag) {
      this.$log.info("deleteNote:flag :: " + flag);
      
      // this.$log.info("deleteNote:mdMenuTrigger :: " +this.mdMenuTrigger);

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
      this.$emit("mountAgain", data);
    },

    getNoteId(noteId){
    this.$log.info("note id at 246: ", noteId)
    this.currentNoteId=noteId;
    this.$log.info("note id at 246: ", this.currentNoteId)
    },
    updateFlag(flag, noteId) {
      this.$log.info("color selected :: " + flag);
      // this.cardColor=color;
      // alert("NoteId:: " +noteId)
      // this.mounted();

      const token = localStorage.getItem("token");
      const editData = {};
      if (flag == "archive") {
        editData.flagValue = true;
      } else {
        editData.flagValue = flag;
      }

      const auth = { headers: { token: token } };
      this.$log.info("noteId .... :: " + noteId);

      HTTP.put("/flag/" + noteId + "/" + flag, editData, auth)
        // /flag/5e15c3822a8f156011ea42e7/trash
        .then(response => {
          this.$log.info(
            "response restore :: " + JSON.stringify(response.data.data)
          );
          this.$emit("updateNote", "note archived");
          this.trashNotes = response.data.data;
          this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },
    
  deleteNote1(flag){
    if(flag==true){
     const noteId=this.currentNoteId;
     this.$log.info(" current note :: " + noteId);
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.delete("note/"+noteId, auth)
        .then(response => {
          this.$log.info(" Display:delete Notes: response :: " +response.data.data);
          // this.AllNotes = response.data.data;
          // this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
          // this.getAllnotes();
        })
        .catch(err => {
          this.$log.info("Display:DeleteNote :error :: " + err);
        });
    }  

    }




  },
  mounted() {
    this.$log.info("Display :: Note Object " + JSON.stringify(this.noteId));
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
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}


// flex-wrap: wrap;
// justify-items: flex-start

.listView {
  width: 250px;
  margin: 4px;
  //   height:200px;
  display: inline-block;
  vertical-align: top;
}

.md-icon-button {
  // opacity: .1;
  // background-size: 120px 120px;
  // height: 120px;
  // margin: 20px;
  opacity: 0.85;
  // width: 120px;
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
  //.icon-toolbar{
  visibility: visible;
}
.md-icon-button {
  visibility: hidden;
}

.md-content {
  width: 100px;
  // height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.md-avatar {
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  -webkit-user-select: none;
  -ms-user-select: none;
  /* user-select: none; */
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
// style="border:none;outline:none"
</style>

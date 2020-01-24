<template>
  <div class="elevation-demo">
    <div v-for="note in AllNotes" :key="note._id">
      <md-card class="md-elevation-1" :style="`background-color: ${note.color}`" :key="note._id" >
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

            <md-menu md-size="medium" md-direction="top-start" md-align-trigger>
              <!-- <md-button md-menu-trigger>Small</md-button> -->
              <md-button md-menu-trigger class="md-icon-button">
                <!-- <md-icon>color_lens</md-icon> -->
                <img src="../assets/colorPalet.svg" alt="colorPalet" />
                <md-tooltip md-direction="bottom">Change color</md-tooltip>
              </md-button>

              <md-menu-content>
                <div class="menuContent" >
                  <md-avatar
                    class="palet"
                    v-for="color in colorPalet"
                    :key="color"
                    :style="`background-color: ${color.colorCode}`"
                    v-on="changeCardColor(color.colorCode,note._id)"

                  >
                    <!-- [style.background-color:{{color.colorName}}] -->

                    <!-- {{color.colorName}} -->
                  </md-avatar>
                </div>
              </md-menu-content>
            </md-menu>

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
              <!-- <md-button >Small</md-menu-item> -->

              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
                <!-- <img src="../assets/threedot.svg" alt="more_vert"> -->
                <md-tooltip md-direction="bottom">more</md-tooltip>
              </md-button>

              <md-menu-content>
                <md-menu-item
                  ><md-button @click="$emit('remove', note._id)"
                    >Delete Note</md-button
                  ></md-menu-item
                >
                <md-menu-item><md-button>Add Label </md-button> </md-menu-item>
                <!-- <md-menu-item><md-button>Add Label </md-button></md-menu-item> -->
              </md-menu-content>
            </md-menu>
          </div>
        </md-card-toolbar>
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

export default {
  name: "CreateNote",
  props: ["AllNotes", "toggleListGrid"],

  data: () => ({
    open: false,
    editnote: false,
    title: "",
    description: "",
    noteId: "rama",
    cardColor: "",
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

  components: { EditNote },
  methods: {
    noteEdit() {
      this.editnote = !this.editnote;
      this.$log.info("editnote :" + this.editnote);
    },
    shareId(note) {
      this.note = note;
      this.$log.info("Shareednote :" + this.note);
    },
    updateNotes(data) {
      this.$log.info("data :: " + data);
      this.$emit("mountAgain", data);
      
    },

    changeCardColor(color,noteId) {
      this.$log.info("color selected :: " +color);
      // this.cardColor=color;
      // alert("NoteId:: " +noteId)
      // this.mounted();

       const token = localStorage.getItem("token");
      const editData = {};
      editData.flagValue = color;
      const auth = { headers: { token: token } };
      this.$log.info("noteId .... :: " + noteId);
      HTTP.put("/flag/" + noteId + "/color", editData, auth)
        // /flag/5e15c3822a8f156011ea42e7/trash
        .then(response => {
          this.$log.info(
            "response restore :: " + JSON.stringify(response.data.data)
          );
          this.trashNotes = response.data.data;
          this.$log.info("restore .... :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });

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
.palet:hover {
  border: 1px solid black;
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
.menuContent {
  display: grid;
  grid-template-columns: auto auto auto;
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

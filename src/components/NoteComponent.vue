<template>
  <div class="note">
    <div class="child1">
      <create-note @updateNote="update"></create-note>
    </div>
    <div class="child2">
      <DisplayNotes v-bind:AllNotes="AllNotes" @updateNote="update" />
      <!-- //v-bind:AllNotes="AllNotes"></display-notes> -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
import {
  messageService,
  updateNoteService
} from "../services/messageService";

export default {
  data() {
    return {
      AllNotes: []
      // searchTerms:"a"
    };
  },
  components: {
    CreateNote,
    DisplayNotes
  },
  mounted() {
    this.getAllnotes();
  },

  created() {
    this.getAllnotes();
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.AllNotes = message.text;
        this.$log.info(
          "NoteComponent:created:RXJS message from search:: " +
            JSON.stringify(this.AllNotes)
        );
      } else {
        // clear messages when empty message received
        // this.AllNotes = [];
        this.update();
        // this.$log.info("RXJS message :: " + JSON.stringify(this.messages));
      }
    });

    this.subscription = updateNoteService.getUpdateNote().subscribe(message => {
      if (message) {
        this.$log.info("RXJS noteUpdate From colllaborator :: ");
        this.getAllnotes();
      }
    });

    // this.subscription = labelNoteService.getLabelNote().subscribe(message => {
    //   if (message) {
    //     this.$log.info("Label data-- :: ",this.AllNotes, message.text._id);
    //     this.AllNotes.forEach(element=>{
    //       element.label.forEach(element1=>{
    //         if(element1._id==message.text._id){
    //           this.$log.info("NoteLabeled data-- :: ",element1.label,element);
    //           // this.AllNotes=[element]
    //           this.AllNotes.push(element);
    //         }else{
    //           this.getAllnotes();
    //         }
    //       })
    //     })
    //   }
    // });
  },

  beforeDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  },
  methods: {
    getAllnotes() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("note", auth)
        .then(response => {
          this.$log.info("response :: " + JSON.stringify(response.data.data));
          this.$log.info(
            "get color :: " + JSON.stringify(response.data.data.color)
          );

          this.AllNotes = response.data.data;
          // this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },

    update(e) {
      this.$log.info("Emit working :: ", e);
      this.getAllnotes();
    }
  }
};
</script>

<style>
/* @import "../style/note.css"; */
.note {
  height: 500px;
}
</style>

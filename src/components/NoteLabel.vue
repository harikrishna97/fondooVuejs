<template>
  <div class="note">
    <div class="child1">
      <create-note ></create-note>
      <!-- @updateNote="update" -->
    </div>
    <div class="child2">
      <DisplayNotes v-bind:AllNotes="AllNotes"  />
      <!-- @updateNote="update" -->
      <!-- //v-bind:AllNotes="AllNotes"></display-notes> -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
import {
  
  labelNoteService,
} from "../services/messageService";
export default {
  data: () => ({
    AllNotes: []
  }),
  components: {
    CreateNote,
    DisplayNotes
  },
  mounted() {
    this.getAllnotes();
  
    this.subscription = labelNoteService.getLabelNote().subscribe(message => {
      if (message) {
        this.$log.info("Label data-- :: ",this.AllNotes, message.text._id);
        this.AllNotes.forEach(element=>{
          element.label.forEach(element1=>{
            if(element1._id==message.text._id){
              this.$log.info("NoteLabeled data-- :: ",element1.label,element);
              this.AllNotes=[element]
              // this.AllNotes.push(element);
            }else{
              this.getAllnotes();
            }
          })
        })
      }
    });
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
    }
  }
};
</script>

<style></style>

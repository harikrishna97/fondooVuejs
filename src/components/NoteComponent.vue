<template>
  <div class="note">
    <div>
      <create-note @updateNote="update"></create-note>
    </div>
    <div>
      <DisplayNotes v-bind:AllNotes="AllNotes" @updateNote="update" @mountAgain="update"/>
      <!-- //v-bind:AllNotes="AllNotes"></display-notes> -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
export default {
  data() {
    return {
      AllNotes: []
    };
  },
  props:["toggleListGrid"],
  components: {
    CreateNote,
    DisplayNotes,
    
  },
  mounted() {
    this.getAllnotes();
  },
  methods: {
    getAllnotes() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("note", auth)
        .then(response => {
          this.$log.info("response :: " + JSON.stringify(response.data.data));
                    this.$log.info("get color :: " + JSON.stringify(response.data.data.color));

          this.AllNotes = response.data.data;
          this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },
  
  
    update(e) {
      this.$log.info("Emit working :: ", e);
      this.getAllnotes();
    },

    
  }
};
</script>

<style>
.note{
  height:500px
}
</style>

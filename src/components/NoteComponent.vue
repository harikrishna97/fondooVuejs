<template>
  <div class="note">
    <div>
      <create-note @updateNote="update"></create-note>
    </div>
    <div>
      <DisplayNotes v-bind:AllNotes="AllNotes" @updateNote="update" />
      <!-- //v-bind:AllNotes="AllNotes"></display-notes> -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
import { messageService } from "../services/messageService";

export default {
  data() {
    return {
      AllNotes: [],
      // searchTerms:"a"
    };
  },
  props: ["toggleListGrid"],
  components: {
    CreateNote,
    DisplayNotes
  },
  mounted() {
    this.getAllnotes();
  },
  
  created() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.AllNotes=message.text;
        // this.$log.info("NoteComponent:created:RXJS message from search:: " + JSON.stringify(this.AllNotes));
      } else {
        // clear messages when empty message received
        this.AllNotes = [];
        this.getAllnotes();
                // this.$log.info("RXJS message :: " + JSON.stringify(this.messages));
      }
    });
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
          // this.$log.info("response :: " + JSON.stringify(response.data.data));
          // this.$log.info(
          //   "get color :: " + JSON.stringify(response.data.data.color)
          // );

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
    },

    
  }
};
</script>

<style>
.note {
  height: 500px;
}
</style>

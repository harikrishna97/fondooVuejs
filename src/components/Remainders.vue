<template>
  <div>
    <DisplayNotes v-bind:AllNotes="AllNotes" />
    <!-- {{archive}} -->
  </div>
</template>

<script>
import DisplayNotes from "./DisplayNotes";
import { HTTP } from "../services/http-common";

export default {
    data:()=>({
        AllNotes:[],
    }),
  components: {
    DisplayNotes
  },
  mounted() {
    this.getAllRemainders();
  },
  methods: {
    getAllRemainders() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("remainder", auth)
        .then(response => {
          this.$log.info(
            " getALL remainder : response :: " +
              JSON.stringify(response.data.data)
          );
          this.AllNotes = response.data.data;
          //   this.title=this.trashNotes.title;
          //   this.description=this.trashNotes.description;

          //   this.$log.info("trashNotes :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("getALL remainder:error :: " + err);
        });
    }
  }
};
</script>

<style></style>

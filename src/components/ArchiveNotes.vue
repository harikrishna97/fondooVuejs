<template>
  <div>
    <DisplayNotes v-bind:AllNotes="AllNotes"/>
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
    this.getAllArchiveNotes();
  },
  methods: {
    getAllArchiveNotes() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("archive", auth)
        .then(response => {
          // this.$log.info(
          //   " getALL archive : response :: " +
          //     JSON.stringify(response.data.data)
          // );
          this.AllNotes = response.data.data;
          //   this.title=this.trashNotes.title;
          //   this.description=this.trashNotes.description;

          //   this.$log.info("trashNotes :: " + JSON.stringify(this.trashNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    }
  }
};
</script>

<style></style>

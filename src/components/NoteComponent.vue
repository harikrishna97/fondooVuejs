<template>
  <div> 
      
      <div>
          <create-note></create-note>
      </div>
      <div>
          <display-notes />
          <!-- //v-bind:AllNotes="AllNotes"></display-notes> -->
      </div>

     


  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
export default {
  data() {
    return {
      AllNotes: []
        
    };
  },
 components:{
     CreateNote,
     DisplayNotes
 },
  beforeMount() {
    const token = localStorage.getItem("token");
    const auth = { headers: { token: token } };
    HTTP.get("note", auth)
      .then(response => {
        this.$log.info("response :: " + JSON.stringify(response.data.data));
        this.AllNotes=response.data.data;
        this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
      })
      .catch(err => {
        this.$log.info("error :: " + err);
      });
  }
};
</script>

<style>

</style>

<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Collaborators</md-dialog-title>
      <md-divider></md-divider>

      <md-card class="card1">
        <!-- <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header> -->

        <div>
          <md-avatar style="opacity:0.5;">
            <img src="../assets/sharePeople.svg" alt="share" />
            <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
          </md-avatar>
        </div>

        <!-- <div > -->
        <input
          class="inputEmail"
          type="text"
          v-model="collaboratorId"
          placeholder="Person or email to share with"
        />
        <!-- </div> -->
      </md-card>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >cancel</md-button
        >
        <md-button class="md-primary" @click="showDialog = false;saveCollaborator()"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <!-- <md-button class="md-primary md-raised" @click="showDialog = true;"
      >Show Dialog</md-button
    > -->
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";

export default {
  name: "DialogCustom",
  data: () => ({
    collaboratorId: null,
    showDialog: true
  }),

  methods: {
    saveCollaborator(){
      this.$log.info("this.collaboratorId  :: " + this.collaboratorId);

    },
    /**
     * @description function to Create Note
     */
    addCollaborator() {
      if (this.collaboratorId !== null) {
        const token = localStorage.getItem("token");
        // this.$log.info("token :: " + typeof token);

        const auth = { headers: { token: token } };
        HTTP.post("collaborator/noteId/collaboratorId", auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response.data.data));
            // this.$emit("updateNote", "note added");
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    },

    deleteCollaborator() {
      if (this.collaboratorId !== null) {
        const token = localStorage.getItem("token");
        this.$log.info("this.collaboratorId  :: " + this.collaboratorId);

        const auth = { headers: { token: token } };
        HTTP.delete("collaborator/collaboratorId", auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response.data.data));
            // this.$emit("updateNote", "note added");
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
.card1 {
  display: flex;
  justify-content: flex-start;
}
inputemail {
  padding: 7px;
  width: 350px;
  display: flex;
    align-items: center;
    border: none;
    margin: 7px;
    outline: none;
}
.md-dialog {
  max-width: 768px;
}
</style>

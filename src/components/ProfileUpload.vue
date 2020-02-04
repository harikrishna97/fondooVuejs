<template>
  <div>
    <md-dialog :md-active.sync="showDialog" md-clicked-outside>
      <md-dialog-title>Select Profile Photo</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Upload Photos">
          <!-- <md-avatar>
            <img :src="imageUrl" alt="Avatar" />
            <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
          </md-avatar> -->

          <div class="inputfile">
            <!-- <input type="file" placeholder="Select a Photo from your computer" name:fileName> -->
            <input type="file" @change="onFileChange" />
          </div>
          
        </md-tab>
      </md-tabs>

      <md-dialog-actions md-click-outside-to-close="false">
        <div>
          <md-button class="md-dense md-raised md-primary" @click="setProfile"
            >Set as profile photo</md-button
          >
          <!-- <md-button class="md-dense md-raised md-primary">Raised</md-button> -->
          <md-button class="md-primary" @click="showDialog = false"
            >cancel</md-button
          >
        </div>
      </md-dialog-actions>
    </md-dialog>

    <md-button style="display:none" class="md-primary md-raised" @click="showDialog = true"
      >Show Dialog</md-button
    >
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";

export default {
  name: "DialogCustom",
  data: () => ({
    imageUrl: "",
    showDialog: true,
    selectedFile: null
  }),
  mounted() {
    // this.imageUrl = localStorage.getItem("imageUrl");
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0]; // || e.dataTransfer.files;
      
    },
    setProfile(){
      this.showDialog=!this.showDialog;
      var formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFile.name);
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.put("imageUpload", formData, auth)
        .then(response => {
          // this.$log.info(
          //   " imageUpload : response :: " + JSON.stringify(response.data)
          // );
          this.imageUrl=response.data.imageUrl
          localStorage.setItem("imageUrl", response.data.imageUrl);
          this.$emit('update')
          // this.AllNotes = response.data.data;
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

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
.inputfile{
  display: flex;
  justify-content: center;
}
</style>

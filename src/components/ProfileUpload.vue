<template>
  <div>
    <md-dialog :md-active.sync="showDialog" md-clicked-outside class="Profile1">
      <md-dialog-title>Select Profile Photo</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Upload Photos" class="tab">
          <div>
            <div class="Image">
              <!-- <input type="file"  @change="onFileChange" /> -->
              <label for="file-input">
                <img alt="Avatar" :src="url" />
                <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
              </label>
              <input
                class="inputfile"
                id="file-input"
                type="file"
                @change="onFileChange"
              />
            </div>
            <!-- <vue-cropper
              ref="cropper"
              :src="url"
              alt="Source Image"
              :cropmove="cropImage"
            >
            </vue-cropper> -->
          </div>
        </md-tab>
      </md-tabs>
      <md-divider></md-divider>
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

    <md-button
      style="display:none"
      class="md-primary md-raised"
      @click="showDialog = true"
      >Show Dialog</md-button
    >
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
// import VueCropper from "vue-cropperjs";
// import "cropperjs/dist/cropper.css";
// this.$refs.cropper.rotate(45);
export default {
  name: "DialogCustom",
  data: () => ({
    imageUrl: "",
    url: null,
    showDialog: true,
    selectedFile: null
  }),
  // components: { VueCropper },
  mounted() {
    this.url = localStorage.getItem("imageUrl");
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      // || e.dataTransfer.files;
      this.url = URL.createObjectURL(this.selectedFile);
      // this.$log.info("selectedFile :: " + JSON.stringify(e.target.files[0]));
    },
    setProfile() {
      this.showDialog = !this.showDialog;
      var formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFile.name);
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.put("imageUpload", formData, auth)
        .then(response => {
          // this.$log.info(
          //   " imageUpload : response :: " + JSON.stringify(response.data)
          // );
          this.imageUrl = response.data.imageUrl;
          localStorage.setItem("imageUrl", response.data.imageUrl);
          this.$emit("update");
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
.tab {
  display: flex;
  justify-content: center;
}
.Profile1 {
  width: 875px;
  height: 541px;
}
.img {
  display: block;
  width: 350px;
  height: 200px;
  object-fit: cover;
  border: 1px solid black;
}
.Image .img {
  display: block;
  width: 350px;
  height: 200px;
  object-fit: cover;
  border: 3px solid black;
}
// }{
//   display: flex;

//   // display: block;
//   // background-image:url('../assets/settings_24px.svg');
// //  border-style: ridge;
//    align-content: center;
//   //  src :url('.../assets/settings_24px.svg');
//   width: 350px;
//   height: 200px;

// }
.md-dialog {
  max-width: 768px;
}
.Image.input {
  display: none;
}
.inputfile {
  display: none;
}
</style>

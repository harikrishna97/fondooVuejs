<template>
  <div>
    <div v-if="open==false" @click="toggleComponent">
      <md-card class="card">
        <!-- <md-ripple> -->
          <md-card-toolbar class="searchtoolbar">
            <div class="md-toolbar-section-start">
              <md-button>
                <div class="takeanote">
                  <input
                    type="text"
                    name="description"
                    placeholder="Take a note..."
                    style="border:none;outline:none"
                  />
                </div>
              </md-button>
            </div>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button">
                <img src="../assets/newList.svg" alt="newList" />
                <md-tooltip md-direction="bottom">New List</md-tooltip>
              </md-button>
              <md-button class="md-icon-button">
                <img src="../assets/brush.svg" alt="brush" />
                <md-tooltip md-direction="bottom">New Note with Drawing</md-tooltip>
              </md-button>
              <md-button class="md-icon-button">
                <img src="../assets/addImage.svg" alt="image" />
                <md-tooltip md-direction="bottom">New Note with Image</md-tooltip>
              </md-button>

             
            </div>
          </md-card-toolbar>
        <!-- </md-ripple> -->
      </md-card>
    </div>

    <div v-else>
      <md-card class="card">
        <!-- <md-ripple> -->
          <!-- <md-card-header> -->
          <!-- <div class="md-title">Card with hover effect</div>
          <div class="md-subhead">It also have a ripple</div> -->
          <!-- </md-card-header> -->

          <md-card-content>
            <form>
              <div class=" md-layout">
                <div>
                  <input
                    class="md-layout-item md-size-50"
                    type="text"
                    name="title"
                    v-model="title"
                    placeholder="Title"
                    style="border:none;outline:none"
                  />
                </div>

                <div>
                  <md-button class="md-icon-button">
                    <img src="../assets/pin.svg" alt="pin" />
                    <md-tooltip md-direction="bottom">Pin note</md-tooltip>
                  </md-button>
                </div>
              </div>
              <div class="takeanote">
                <input
                  type="text"
                  name="description"
                  v-model="description"
                  placeholder="Take a note..."
                  style="border:none;outline:none"
                />
              </div>
            </form>
          </md-card-content>

          <!-- <md-card-actions> -->
          <!-- <md-bottom-bar> -->
          <md-card-toolbar class="searchtoolbar">
            <div class="md-toolbar-section">
              <md-button class="md-icon-button">
                <!-- <md-icon>add_alert</md-icon> -->
                <img src="../assets/remainder.svg" alt="remainder" />
                <md-tooltip md-direction="bottom">Remind me</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <img src="../assets/collaborator.svg" alt="colaborator" />
                <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <!-- <md-icon>color_lens</md-icon> -->
                <img src="../assets/colorPalet.svg" alt="colorpalet" />
                <md-tooltip md-direction="bottom">Change color</md-tooltip>
              </md-button>

              <!-- <md-button class="md-icon-button"> -->
                <!-- <md-icon>image</md-icon> -->
                <!-- <img src="../assets/addImage.svg" alt="image" />
                <md-tooltip md-direction="bottom">Add image</md-tooltip>
              </md-button> -->

              <md-button class="md-icon-button">
                <!-- <md-icon>archive_none</md-icon> -->
                <img
                  src="../assets/archive.svg"
                  style="transform: scaleX(-1);"
                  alt="archive"
                />
                <md-tooltip md-direction="bottom">Archive</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>more_vert</md-icon>
                <!-- <img src="../assets/threedot.svg" alt="more_vert"> -->
                <md-tooltip md-direction="bottom">more</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <!-- <md-icon>archive_none</md-icon> -->
                <img src="../assets/undo.svg" alt="undo" />
                <md-tooltip md-direction="bottom">Undo</md-tooltip>
              </md-button>

              <md-button class="md-icon-button">
                <!-- <md-icon>archive_none</md-icon> -->
                <img
                  src="../assets/undo.svg"
                  style="transform: scaleX(-1);"
                  alt="redo"
                />
                <md-tooltip md-direction="bottom">Redo</md-tooltip>
              </md-button>

              <!-- <md-button>close</md-button> -->
            </div>
            <div class="md-toolbar-section-end">
              <md-button @click="toggleComponent" >close</md-button>
            </div>
          </md-card-toolbar>
          
        <!-- </md-ripple> -->
      </md-card>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";

export default {
  name: "CreateNote",

  data: () => ({
    open: false,

    title: null,
    description: null,
  }),
  components: {
  },


  methods: {
    
    
    toggleComponent() {
      this.open = !this.open;
      this.$log.info("open:: " + this.open);
      this.createNote()
      this.title=null,
      this.description=null;
      return this.open;
    },

    notEmpty(){
      if(this.title&&this.description!==null){
        this.createNote();
      }

    },
    createNote() {
      if(this.title&&this.description!==null){

        const noteData = {};
        noteData.title = this.title;
        noteData.description = this.description;
        this.$log.info("NoteData :: " + JSON.stringify(noteData));
        const token = localStorage.getItem("token");
        this.$log.info("token :: " + typeof token);
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        // headers: {Authorization:'JWT ' + localStorage.getItem('token')
        const auth = { headers: { token: token } };
        HTTP.post("note", noteData, auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response));
            this.$emit('updateNote',"note added")
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    } ,
    
  }
}

</script>

<style lang="scss" scoped>
.md-card {
  width: 550px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  border-radius: 8px;
}
.searchtoolbar {
  display: flex;
  flex: left;
}

.md-layout-item.md-size-50 {
  min-width: 100%;
  max-width: 100%;
  flex: 0 1 50%;
}

.takeanote {
  border: none;
  outline: none;
  display: flex;
}
input.md-layout-row {
  width: 461px;
}

div.md-card-content div input {
  width: 453px;
  padding-left: 6px;
}
.md-icon-button{
  opacity: .85;
  // background-size: 120px 120px;
  //   height: 120px;
  //   margin: 20px;
  //   opacity: .1;
  //   width: 120px;
  
}
</style>

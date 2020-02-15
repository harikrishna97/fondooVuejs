<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Collaborators</md-dialog-title>
      <md-divider></md-divider>

      <div class="Owner">
        <div class="Owner1">
          <md-avatar style="">
            <img :src="imageUrl" alt="share" />
            <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
          </md-avatar>
        </div>

        <div class="Owner2">
          <h4 :v-model="user">{{ user }}</h4>
          <p :v-model="email">{{ email }}</p>
        </div>
      </div>
      <md-dialog-content class="">
        <div
          v-for="collaborator in collaborators"
          :key="collaborator._id"
        >
          <div v-if="currentNoteId === AllNotes._id">
            <md-avatar style="border: solid 1px lightgrey">
              <img :src="collaborator.imageUrl" alt="share" />
              <md-tooltip md-direction="bottom">
                {{ collaborator.email }}
              </md-tooltip>
            </md-avatar>
            {{ collaborator.email }}
            <md-button
              class="md-icon-button"
              @click="deleteCollaboratorFromNote(collaborator._id)"
            >
              <md-icon class="menu_vert" style="padding:1px">clear</md-icon>
            </md-button>
          </div>
        </div>
      </md-dialog-content>
      <div class="card1">
        <div class="addcoll">
          <div class="personadd">
            <!-- <img src="../assets/sharePeople.svg" alt="share" /> -->
            <md-icon style="height:100%;width:100%">person_add</md-icon>
            <!-- <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip> -->
          </div>
        </div>

        <md-autocomplete
          class="inputEmail"
          v-model="collaboratorEmail"
          :md-options="AllUsers"
          md-layout="box"
        >
          <label>Person or email to share with...</label>
        </md-autocomplete>
      </div>

      <md-dialog-actions class="actions1">
        <md-button @click="showDialogbox()">cancel</md-button>
        <md-button
          @click="
            showDialogbox();
            addCollaborator();
          "
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import {
  collService,
  collService1,
  updateNoteService,
  createNoteService,
  createCollaboratorService
} from "../services/messageService";

export default {
  name: "Collaborator",
  props: ["noteId"],
  data: () => ({
    collaboratorEmail: null,
    collaboratorId: null,
    showDialog: true,
    user: null,
    email: null,
    imageUrl: null,
    AllUsers: [],
    usersData: [],
    currentNoteId: null,
    AllNotes: [],
    collaborators:[],
  }),

  mounted() {
    this.subscription = createCollaboratorService
      .getFromCreateCollaborator()
      .subscribe(message => {
        if (message) {
          this.$log.info("data From CreateNote :collaboratord:");

          // add message to local state if not empty
          this.collaboratorId = message.text.collaboratorId;
          this.currentNoteId = message.text.noteId;
          this.$log.info(
            "Add collaborator from create note:: ",
            JSON.stringify(message.text)
          );
          this.addCollaboratorToNote();
        } else {
          this.$log.info("Error From CreateNote :collaboratord:");
        }
      });
    this.userData();
    this.getAllUsers();
  },
  created() {
    

    // subscribe to home component messages
    this.subscription = collService
      .getNoteIdFromDisplay()
      .subscribe(message => {
        if (message) {
          // add message to local state if not empty
          this.currentNoteId = message.text;
          this.$log.info("NoteId from Diaplsy:: ", message.text);
        } else {
          // clear messages when empty message received
          // this.currentNoteId = null;
          // this.$log.info("RXJS message :: " + JSON.stringify(this.messages));
        }
      });

    this.subscription = collService1
      .getNoteFromDisplay()
      .subscribe(message1 => {
        if (message1) {
          // add message to local state if not empty
          this.AllNotes = message1.text;
          this.collaborators=message1.text.collaborator;
          this.$log.info("Note from Diaplsy:: ", this.AllNotes);
        }
      });
  },
  // beforeDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscription.unsubscribe();
  // },
  methods: {
    sendToCreateNote(userData) {
      createNoteService.sendToCreateNote(userData);
    },
    sendUpdateNote() {
      updateNoteService.sendUpdateNote("updateNote");
    },
    addCollaborator() {
      // if (this.currentNoteId !== null) {
      this.$log.info(
        "noteId: collaboratorEmail:collaboratorId :",
        this.currentNoteId,
        this.collaboratorEmail
      );
      this.usersData.forEach(element => {
        if (element.email === this.collaboratorEmail) {
          this.collaboratorId = element._id;
          this.$log.info(
            "collaboratorIdss :",
            element._id,
            this.collaboratorId
          );
          // this.$emit("collaborator", element._id);
          const CollaboratorIDEmail = {};
          CollaboratorIDEmail.email = element.email;
          CollaboratorIDEmail.imageUrl = element.imageUrl;
          CollaboratorIDEmail.userId = element._id;
          this.sendToCreateNote(CollaboratorIDEmail);
          // this.$emit("collaboratorcreate", CollaboratorIDEmail);
        }
      });
      this.addCollaboratorToNote();
      // }
    },
    userData() {
      this.user =
        localStorage.getItem("firstName") +
        " " +
        localStorage.getItem("lastName") +
        "(Owner)";
      this.email = localStorage.getItem("email");
      this.imageUrl = localStorage.getItem("imageUrl");
    },
    showDialogbox() {
      this.$emit("closeCollaborator", false);
    },

    addCollaboratorToNote() {
      if (this.collaboratorId !== null && this.currentNoteId !== null) {
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        this.$log.info(
          "TOken $.... :: " + auth,
          this.currentNoteId,
          this.collaboratorId,
          token
        );
        // const noteId = 
        HTTP.post(
          "collaborator/" + this.currentNoteId + "/" + this.collaboratorId,
          {},
          auth
        )
          .then(response => {
            this.$log.info(
              "collaborator:response :: " +
                JSON.stringify(response.data.data.daa)
            );
            this.sendUpdateNote();
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    },

    deleteCollaboratorFromNote(collaboratorId) {
      // const filteredPeople = people.filter((item) => item.id !== idToRemove);
      var data=[]
      data=this.collaborators.filter((item)=>item._id!==collaboratorId)
      this.collaborators=data;
       this.$log.info("Collaborators.... :: " + data);
      this.$log.info("CollaboratorId.... :: " + collaboratorId);
      if (collaboratorId !== undefined) {
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        this.$log.info("TOken $.... :: " + auth, token);
        // const collaboratorId=this.collaboratorId;
        HTTP.delete("collaborator/" + collaboratorId, {}, auth)
          .then(response => {
            this.$log.info("response :: " + JSON.stringify(response.data.data));
            this.sendUpdateNote();
          })
          .catch(err => {
            this.$log.info("error :: " + err);
          });
      }
    },
    /**
     * @description :API to get All Users
     */
    getAllUsers() {
      HTTP.get("user")
        .then(response => {
          this.$log.info(
            "get All Users:CollaboratorComponent: " +
              JSON.stringify(response.data.data)
          );

          var array = [];
          this.usersData = response.data.data;
          array = response.data.data;
          array.forEach(element => {
            this.$log.info("eleements", element);
            this.AllUsers.push(element.email);
            this.$emit("update", "noteUpdate");
          });
          // this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.Owner {
  display: flex;
}
.Owner1 {
  padding-left: 20px;
  padding-right: 15px;

  /* width: 30%; */
}
.menu_vert {
  opacity: 1;
}
.addcoll {
  padding-left: 17px;
}
.inputEmail {
  border: none;
  outline: none;
  width: 300px;
}
.card1 {
  display: flex;
  justify-content: flex-start;
}
.inputemail {
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

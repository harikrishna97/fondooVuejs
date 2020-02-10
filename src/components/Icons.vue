<template>
  <div>
    <!-- CollaboratorDialog -->
    <md-dialog :md-active.sync="showCollaborator" class="collDialog">
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
          <!-- </div> -->
          <!-- <div class="email" :v-model="email"> -->
          <p :v-model="email">{{ email }}</p>
        </div>
      </div>
      <md-dialog-content class="">
        <!-- <div v-if="collaboratorsArray != null "> -->
          <!-- {{collaboratorsArray}} -->
          <div
            v-for="collaborator1 in collaboratorsArray"
            :key="collaborator1"
          > 
          <!-- <div
            v-for="collaborator2 in collaborator1"
            :key="collaborator2"
          >          {{collaborator2}} -->
          <div v-if="collNoteId===collaborator1">
            <md-avatar style="border: solid 1px lightgrey">
              <img :src="collaborator1.imageUrl" alt="share" />
              <md-tooltip md-direction="bottom">{{
                collaborator1.email
              }}</md-tooltip>
            </md-avatar>
            <md-button class="md-icon-button" @click="deleteCollaborator()">
              <md-icon class="menu_vert" style="padding:1px">clear</md-icon>
            </md-button>
              </div>
              </div>


          <!-- </div> -->
        <!-- </div> -->
      </md-dialog-content>
      <div class="card1">
        <div class="addcoll">
          <div class="personadd">
            <!-- <img src="../assets/sharePeople.svg" alt="share" /> -->
            <md-icon style="height:100%;width:100%">person_add</md-icon>
            <!-- <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip> -->
          </div>
        </div>

        <!-- <div class="inputEmail"> -->
        <md-autocomplete
          class="inputEmail"
          v-model="collaboratorId"
          :md-options="AllUsers"
          md-layout="box"
        >
          <label>Person or email to share with...</label>
        </md-autocomplete>
        <!-- <input
          class="inputEmail"
          type="text"
          v-model="collaboratorId"
          placeholder="Person or email to share with"
        /> -->
        <!-- </div> -->
      </div>

      <md-dialog-actions class="actions1">
        <md-button @click="showCollaborator = false">cancel</md-button>
        <md-button
          @click="
            showCollaborator = false;
            addCollaborator();
          "
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <!-- ........................... -->
    <v-menu>
      <template v-slot:activator="{ on: menu }">
        <md-button v-on="{ ...menu }" class="md-icon-button">
          <img src="../assets/remainder.svg" alt="remainder" />
          <md-tooltip md-direction="bottom">Remind me</md-tooltip>
        </md-button>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Reminder:</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-row>
            <!-- <v-col sm="12" lg="3" class="mb-4 controls"> -->
            <v-menu
              v-if="hasEnd"
              ref="endMenu"
              v-model="endMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="end"
              transition="scale-transition"
              min-width="290px"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="end"
                  class="mt-3"
                  label="End Date"
                  prepend-icon="event"
                  dense
                  readonly
                  outlined
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="end" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endMenu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.endMenu.save(end)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="nowMenu"
              v-model="nowMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="now"
              transition="scale-transition"
              min-width="290px"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="now"
                  class="mt-3"
                  label="Today"
                  prepend-icon="event"
                  dense
                  readonly
                  outlined
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="now" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="nowMenu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.nowMenu.save(now)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <!-- </v-col> -->
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Picker in menu"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu> </v-row
        ></v-list-item>

        <div>
          <v-btn @click="shareReminder">save</v-btn>
        </div>
        <!-- <v-list-item v-for="(item, index) in items" :key="index" @click="a">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item> -->
      </v-list>
    </v-menu>
    <!-- </div> -->

    <md-button class="md-icon-button" v-on:click="showCollaborator1">
      <img src="../assets/collaborator.svg" alt="colaborator" />
      <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
    </md-button>

    <!--  ...................................... -->

    <md-menu md-size="medium" md-direction="top-start" md-align-trigger>
      <!-- <md-button md-menu-trigger>Small</md-button> -->
      <md-button md-menu-trigger class="md-icon-button">
        <!-- <md-icon>color_lens</md-icon> -->
        <img src="../assets/colorPalet.svg" alt="colorPalet" />
        <md-tooltip md-direction="bottom">Change color</md-tooltip>
      </md-button>

      <md-menu-content>
        <div class="menuContent">
          <div
            class="palet"
            v-for="color in colorPalet"
            v-on:click="shareColor(color.colorCode)"
            :key="color.colorName"
            :style="`background-color: ${color.colorCode}`"
          >
            <!-- <div@click="shareColor(color.colorCode)"/> -->

            <!-- v-on="updateFlag(color.colorCode,note._id)" -->
          </div>
        </div>
      </md-menu-content>
    </md-menu>

    <!-- <md-button class="md-icon-button" @click="image"> -->
    <!-- <md-icon>image</md-icon> -->
    <!-- <img src="../assets/addImage.svg" alt="image" />
                <md-tooltip md-direction="bottom">Add image</md-tooltip>
              </md-button> -->

    <md-button class="md-icon-button" @click="archive">
      <!-- <md-icon>archive_none</md-icon> -->
      <img src="../assets/archive.svg" alt="archive" />
      <md-tooltip md-direction="bottom">Archive</md-tooltip>
    </md-button>

    <!-- LABESs -->
    <md-menu md-size="medium" v-if="addLabel == true" md-align-trigger>
      <md-button
        md-menu-trigger
        class="md-icon-button"
        style="opacity:1"
        @click="moreVert"
      >
        <md-icon class="menu_vert">more_vert</md-icon>
        <!-- <img src="../assets/menu_vert.svg"  alt="more_vert"> -->
        <md-tooltip md-direction="bottom">more</md-tooltip>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <md-button @click="deleteNote">Label Note</md-button>
        </md-menu-item>
        <md-content v-for="label in AllLabels" :key="label._id">
          <md-menu-item>
            <md-checkbox
              v-model="label[label]"
              value="label._id"
              @change="addNoteLabel(label)"
              >{{ label.label }}</md-checkbox
            >
            <!--  <input type="checkbox" v-model="user.roles" :value="role"/> -->
          </md-menu-item>
        </md-content>

        <md-menu-item v-if="addLabel == true"> </md-menu-item>

        <md-menu-item
          ><md-button @click="addLabelTrue" md-menu-trigger
            >Add Label
          </md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <!-- .......................... ADD Label.....-->

    <md-menu md-size="medium" v-if="addLabel == false" md-align-trigger>
      <md-button
        md-menu-trigger
        class="md-icon-button"
        id="menu_vert"
        @click="moreVert"
      >
        <md-icon class="menu_vert">more_vert</md-icon>
        <!-- <img src="../assets/menu_vert.svg"  alt="more_vert"> -->
        <md-tooltip md-direction="bottom">more</md-tooltip>
      </md-button>

      <md-menu-content>
        <md-menu-item
          ><md-button @click="deleteNote">Delete Note</md-button></md-menu-item
        >
        <!-- <md-menu-item v-if="addLabel == true">
          
        </md-menu-item> -->

        <md-menu-item
          ><md-button @click="addLabelTrue" md-menu-trigger
            >Add Label
          </md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
// import Collaborator from "./Collaborator";
// import { Datetime } from 'vue-datetime'
import { labelService } from "../services/messageService";
import { HTTP } from "../services/http-common";

export default {
  components: {
    // Collaborator
  },
  computed: {
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1
        }
      );
    }
  },
  data: () => ({
    imageUrl: "",
    collaboratorId: null,
    showCollaborator: false,
    labelId: "",
    LabelValue: "",
    // collaborator:false,
    AllLabels: [],
    labels: [Boolean],
    type: "month",
    now: null,
    nowMenu: false,
    time: null,
    menu2: false,

    addLabel: false,
    closeOnClick: false,
    closeOnSelect: false,
    selectedDate: null,
    color: "",
    user: "Shailesh Borase(Owner)",
    email: "shaileshborase@gmail.com",
    AllUsers: [],

    colorPalet: [
      {
        colorName: "White",
        colorCode: "#ffffff"
      },
      {
        colorName: "Red",
        colorCode: "#ef8b82"
      },
      {
        colorName: "Orange",
        colorCode: "#ffb600"
      },
      {
        colorName: "Yellow",
        colorCode: "#e1e82e"
      },
      {
        colorName: "Green",
        colorCode: "#ccff90"
      },
      {
        colorName: "Teal",
        colorCode: "#a7ffeb"
      },
      {
        colorName: "Blue",
        colorCode: "#281bd6"
      },
      {
        colorName: "Dark blue",
        colorCode: "#aecbfa"
      },
      {
        colorName: "Purple",
        colorCode: "#d7adfb"
      },
      {
        colorName: "Pink",
        colorCode: "#fdcfe8"
      },
      {
        colorName: "Dark Brown",
        colorCode: "#e6c9a7"
      },
      {
        colorName: "Gray",
        colorCode: "#e8eaed"
      }
    ],
    usersData: []
  }),
  // props:['collaborators'],
  mounted() {
    // alert("updated");
    this.getAllUsers();
    this.$log.info("ALL Users" + JSON.stringify(this.AllUsers));
  },
  created() {
    // subscribe to home component messages
    this.subscription = labelService
      .getLabelFromToolbar()
      .subscribe(message => {
        if (message) {
          // add message to local state if not empty
          this.AllLabels = message.text;
          this.$log.info(
            "IConComponent:RXJS Labels from toolbar:: " +
              JSON.stringify(this.AllLabels)
          );
        } else {
          // clear messages when empty message received
          this.AllLabels = [];
          // this.$log.info("RXJS message :: " + JSON.stringify(this.messages));
        }
      });
  },
  props: ["collaboratorsArray","collNoteId"],
  methods: {
    deleteCollaborator() {
      // this.$emit("deleteCollaborator",Id);
    },
    addCollaborator() {
      // this.$emit("collaborator", this.collaboratorId);
      this.usersData.forEach(element => {
        if (element.email === this.collaboratorId) {
          this.$log.info(
            "collaboratorIdss :",
            element._id,
            this.collaboratorId
          );
          this.$emit("collaborator", element._id);
        }
      });
      // this.$log.info("showCollaborator :", this.collaboratorId);
    },
    showCollaborator1() {
      this.showCollaborator = !this.showCollaborator;
      this.imageUrl = localStorage.getItem("imageUrl");
      this.$log.info("showCollaborator :", this.showCollaborator);
    },
    addNoteLabel(label) {
      this.labelValue = label;
      this.$log.info("Labels of Note :", label.label, label._id);
      this.$emit("addLabel", label._id);
    },
    shareReminder() {
      if (this.now !== null || this.time !== null) {
        // this.$log.info("now :" + this.now);
        // this.$log.info("time :" + this.time);
        // this.$log.info("menu2 :" + this.menu2);
        const reminder = this.now + " " + this.time;
        // this.$log.info("reminder :" + reminder);
        this.$emit("reminder", reminder);
      }
    },

    addLabelTrue() {
      this.addLabel = !this.addLabel;
      // this.$log.info("shareColor :" + colorCode);
    },
    stopTheEvent: $event => $event.stopPropagation(),
    archive() {
      this.$emit("archive", true);
    },
    // image() {this.$emit("image", true);},
    colorpalet() {
      this.$emit("colorpalet", true);
    },

    moreVert() {
      this.$emit("moreVert", true);
    },
    deleteNote() {
      this.$emit("deleteNote", true);
    },
    shareColor(colorCode) {
      this.$emit("shareColor", colorCode);
      this.color = colorCode;
      // this.$log.info("shareColor :" + colorCode);
    },
    /**
     * @description :API to get All Users
     */
    getAllUsers() {
      HTTP.get("user")
        .then(response => {
          this.$log.info(
            "get All Users:IconComponent: " + JSON.stringify(response.data.data)
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

<style>
.md-dialog{
  z-index:6;
}
.personadd {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 1px solid grey;
}
.menu_vert {
  opacity: 1;
}
.md-icon-button {
  opacity: 0.65;
}
.palet:hover {
  border: 1px solid black;
}
.menuContent {
  display: grid;
  grid-template-columns: auto auto auto;
}
.palet {
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  -webkit-user-select: none;
  -ms-user-select: none;
  /* user-select: none; */
  position: relative;
  border-radius: 40px;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color;
  will-change: color, background-color;
  font-size: 24px;
  letter-spacing: -0.05em;
  vertical-align: middle;
  padding: 5px 7px 3px;
}
.Owner {
  display: flex;
}
.Owner1 {
  padding-left: 20px;
  padding-right: 15px;

  /* width: 30%; */
}
.md-field {
  min-height: 35px;
  margin: -5px 0 0px;
}
.md-autocomplete.inputEmail {
  height: 50px;
}
.addcoll {
  padding-left: 17px;
}
.inputEmail {
  border: none;
  outline: none;
  width: 300px;
}
.collDialog {
  z-index: 0;
}
.md-field.md-inline.md-autocomplete-box {
  box-shadow: 0 0px 0px 0px rgba(0, 0, 0, 0.2), 0 0px 0px 0 rgba(0, 0, 0, 0.14),
    0 0px 0px 0 rgba(0, 0, 0, 0.12);
}
.actions1 {
  background-color: lightgrey;
}
</style>

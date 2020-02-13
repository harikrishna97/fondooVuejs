<template>
  <div>
    <!-- CollaboratorDialog -->
    <div v-if="showCollaborator == true">
      <md-dialog :md-active.sync="showCollaborator" class="collDialog">
        <Collaborator
          :noteId="currentNoteId"
          @closeCollaborator="closeCollaborator"
        />
      </md-dialog>
    </div>

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
                  label="Select Time"
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
          <md-button @click="shareReminder()">save</md-button>
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
          ></div>
        </div>
      </md-menu-content>
    </md-menu>

    <md-button class="md-icon-button" @click="archive">
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
        <md-tooltip md-direction="bottom">more</md-tooltip>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <md-button @click="deleteNote">Label Note</md-button>
        </md-menu-item>
        <md-content v-for="label in AllLabels" :key="label._id">
          <md-menu-item>
            <md-checkbox
              v-model="labels[label._id]"
              value="label._id"
              @change="addNoteLabel(label._id)"
              >{{ label.label }}</md-checkbox
            >
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
        <md-tooltip md-direction="bottom">more</md-tooltip>
      </md-button>

      <md-menu-content>
        <md-menu-item
          ><md-button @click="deleteNote">Delete Note</md-button></md-menu-item
        >

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
import Collaborator from "./Collaborator";
// import { Datetime } from 'vue-datetime'
import { labelService } from "../services/messageService";
import { HTTP } from "../services/http-common";

export default {
  components: {
    Collaborator
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
    ]
  }),
  // props:['collaborators'],
  mounted() {},
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
  props: ["collaboratorsArray", "currentNoteId"],
  methods: {
    closeCollaborator(value) {
      this.showCollaborator = value;
    },

    getAllCollaborator() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("collaborator", auth)
        .then(response => {
          this.$log.info(
            "get all collaborators:response :: " +
              JSON.stringify(response.data.data)
          );
          // this.AllNotes = response.data.data;
          // this.$log.info("ALLNOTES :: " + JSON.stringify(this.AllNotes));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
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
      this.$log.info("showCollaborator :", this.showCollaborator);
    },
    addNoteLabel(label) {
      this.$log.info("Labels of Note11 :", this.labels);
      this.$log.info("Labels of Note :", label);
      this.labelValue = label;
      this.$emit("addLabel", label);
    },
    shareReminder() {
      if (this.now !== null || this.time !== null) {
        const reminder = this.now + " " + this.time;
        this.$emit("reminder", reminder);
        this.$log.info("Icon:reminder :" + reminder);
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
    }
  }
};
</script>

<style>
.md-dialog {
  z-index: 6;
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

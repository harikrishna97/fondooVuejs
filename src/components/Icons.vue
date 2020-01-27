<template>
  <div>
    <md-button class="md-icon-button" @click="remainder">
      <!-- <md-icon>add_alert</md-icon> -->
      <img src="../assets/remainder.svg" alt="remainder" />
      <md-tooltip md-direction="bottom">Remind me</md-tooltip>
    </md-button>

    <md-button class="md-icon-button" @click="collaborator">
      <img src="../assets/collaborator.svg" alt="colaborator" />
      <md-tooltip md-direction="bottom">Collaborator</md-tooltip>
    </md-button>

    <!-- <md-button class="md-icon-button" @click="colorpalet">
       <md-icon>color_lens</md-icon> -->
    <!-- <img src="../assets/colorPalet.svg" alt="colorpalet" />
      <md-tooltip md-direction="bottom">Change color</md-tooltip>
    </md-button> -->

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
          <md-avatar
            class="palet"
            v-for="color in colorPalet"
            :key="color.colorName"
            :style="`background-color: ${color.colorCode}`"
          >
          <!-- v-on="updateFlag(color.colorCode,note._id)" -->

            

          </md-avatar>
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

    <md-menu md-size="medium" md-align-trigger>
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
        <md-menu-item
          ><md-button @click="deleteNote">Delete Note</md-button></md-menu-item
        >
        <md-menu-item><md-button>Add Label </md-button> </md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
export default {
  // data: () => ({
  //   colorPalet: [
  //     {
  //       colorName: "White",
  //       colorCode: "red"
  //     }
  //   ]
  // }),

  data: () => ({
  colorPalet: [
        {
          colorName: "White",
          colorCode: "#ffffff"
        },
        {
          colorName: "Red",
          colorCode: "#ea2e2e"
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

  methods: {
    remainder() {
      this.$emit("remainder", true);
    },
    collaborator() {
      this.$emit("collaborator", true);
    },

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
    }
  }
};
</script>

<style>
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
.md-avatar {
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
</style>

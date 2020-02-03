<template>
  <div class="search ">
    <!-- <md-card class="search" style="transparent"> -->

    <!-- <md-button class="md-button-icon" @click="searchNotes()">
<md-icon>search</md-icon>
</md-button> -->
    <!-- :md-options="employees" -->

    <md-autocomplete
      class="search "
      v-model="searchTerm"
      :md-options="searchOption"
      md-layout="box"
    >
      <label><md-icon>search</md-icon>Search...</label>
    </md-autocomplete>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import { messageService } from "../services/messageService";

export default {
  name: "AutocompleteBox",
  updated() {
    this.searchNotes();
  },
  data: () => ({
    selectedEmployee: null,
    searchTerm: "",
    searchData: [],
    searchOption: []
  }),
  // watch: {
  //   searchTerm: function() {
  //     this.$emit("searchRecords", this.searchTerm);
  //   },
  methods: {
    searchNotes() {
      if (this.searchTerm !== "") {
        this.$log.info("SearchTerm  :: " + this.searchTerm);
        const token = localStorage.getItem("token");
        const auth = { headers: { token: token } };
        HTTP.get("search/" + this.searchTerm, auth)
          .then(response => {
            // this.$log.info(
            //   " SearchBNote:searchComponent : response :: " +
            //     JSON.stringify(response.data.data)
            // );
            this.searchData = response.data.data;
            // this.searchData.forEach(element => {
            //   this.searchOption=element.title

            // });
            this.sendMessage();
          })
          .catch(err => {
            this.$log.info("SearchBNote:searchComponent :error :: " + err);
          });
      }
    },
    sendMessage() {
      // send message to subscribers via observable subject
      messageService.sendMessage(this.searchData);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 631px;
  border-radius: 8px;
}
</style>

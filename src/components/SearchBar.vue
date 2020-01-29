<template>
  <div class="search ">
    <!-- <md-card class="search" style="transparent"> -->

    <md-autocomplete
      class="search "
      v-model="selectedEmployee"
      :md-options="employees"
      md-layout="box"
    >
      <label><md-icon>search</md-icon>Search...</label>
    </md-autocomplete>
  </div>
</template>

<script>
export default {
  name: "AutocompleteBox",
  data: () => ({
    selectedEmployee: null,
    employees: [
      "Jim Halpert",
      "Dwight Schrute",
      "Michael Scott",
      "Pam Beesly",
      "Angela Martin",
      "Kelly Kapoor",
      "Ryan Howard",
      "Kevin Malone",
      "Creed Bratton",
      "Oscar Nunez",
      "Toby Flenderson",
      "Stanley Hudson",
      "Meredith Palmer",
      "Phyllis Lapin-Vance"
    ]
  })
};
</script>

<style lang="scss" scoped>
.search {
  width: 631px;
  border-radius: 8px;
}
</style>

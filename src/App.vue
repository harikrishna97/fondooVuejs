<template>
<div id="app">
   <router-view></router-view>
  <v-app data-app>
  </v-app>
</div>

</template>

<script>
export default {
  name: 'App',

  

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
   /* background-color: linear-gradient(-90deg, #84CF6A, #16C0B0);  */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  /* display:flex;
  justify-content: space-between; */
  /* margin-top: 6px; */
  /* background-image: url('assets/bricks_header.png'); */
  /* background-image: url("https://a360b382c67795f00019-4cbb3fa07eca95d1d2c9a802e75e10fe.ssl.cf2.rackcdn.com/bricks_header.jpg") */
}
</style>
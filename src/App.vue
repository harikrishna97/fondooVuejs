<template>
  <div id="app" style="background-color=green;">
     
        <!-- <img alt="Chat App logo" style="background-size:cover;" src="./assets/typing1.jpeg" > -->

    
    <!-- <login></login> -->
    
    <!-- <router-link :to="{name:'login'}"></router-link>  -->
<!-- <router-link :to="{name:'dashboard'}"></router-link>  -->

   <router-view></router-view>
   
  </div>
</template>

<script>



export default {
  name: 'app',
  components: {
    
  }
}
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

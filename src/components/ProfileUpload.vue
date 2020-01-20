<template>
  <div>
    <!-- <md-field>
      <label>Single</label>
      <md-file v-model="single" />
    </md-field> -->

    
    

   
<input type="file">
      
      <!-- <md-file v-model="single" accept="image/*" /> -->
     
  </div>
</template>

<script>
  export default {
    name: 'File',
    data: () => ({
      initial: 'vue-material-is-awesome.jpg',
      single: null,
      placeholder: null,
      disabled: null,
      multiple: null
    })
  }
</script>
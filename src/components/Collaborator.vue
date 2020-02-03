<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Collaborators</md-dialog-title>

      <md-card style="display:flex;justify-content:flex-start">
        <!-- <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header> -->
      
      <div><md-avatar>
              <img src="../assets/sharePeople.svg" alt="share" />
              <md-tooltip md-direction="bottom">Shailesh Borase</md-tooltip>
            </md-avatar></div>

            <div class="inputEmail" >
            <input
              type="text"
              v-model="email"
              placeholder="Person or email to share with"
              style="border:none;outline:none;width:300px"
            />
          </div>
        
      </md-card>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >cancel</md-button
        >
        <md-button class="md-primary" @click="showDialog = false"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true"
      >Show Dialog</md-button
    >
  </div>
</template>

<script>
export default {
  name: "DialogCustom",
  data: () => ({
    showDialog: false
  })
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>

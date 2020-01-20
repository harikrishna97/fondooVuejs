<template>
    
    <div @click="changeCreate">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-toolbar class="searchtoolbar">
            <div class="md-toolbar-section-start">
              <md-button>
                <div class="takeanote">
                  <input
                    type="text"
                    name="description"
                    placeholder="Take a note..."
                    style="border:none;outline:none"
                  />
                </div>
              </md-button>
            </div>
            <div class="md-toolbar-section-end">
              <md-button>close</md-button>
            </div>
          </md-card-toolbar>
        </md-ripple>
      </md-card>
    </div>
    
</template>

<style lang="scss" scoped>
.md-card {
  width: 550px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.searchtoolbar {
  display: flex;
  flex: left;
}

.md-layout-item.md-size-50 {
  min-width: 100%;
  max-width: 100%;
  flex: 0 1 50%;
}

.takeanote {
  border: none;
  outline: none;
  display: flex;
}
input.md-layout-row {
  width: 461px;
}

div.md-card-content div input {
  width: 453px;
  padding-left: 6px;
}
</style>

<script>
export default {
  name: "CreateNote",

  data: () => ({
    open: false
  }),

  methods: {
    changeCreate() {
      this.open = !this.open;
      this.$log.info("open:: " + this.open);
    }
  }
};
</script>

<template>
  <div>
      Labels
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";

export default {
data:()=>{
[]

},

methods: {
    getAllLabels() {
      const token = localStorage.getItem("token");
      const auth = { headers: { token: token } };
      HTTP.get("label", auth)
        .then(response => {
          // this.$log.info("response :: " + JSON.stringify(response.data.data));
                    // this.$log.info("get color :: " + JSON.stringify(response.data.data.color));

          this.ALLLabels = response.data.data;
          // this.$log.info("ALLLabels :: " + JSON.stringify(this.ALLLabels));
        })
        .catch(err => {
          this.$log.info("error :: " + err);
        });
    },
}

}
</script>

<style>

</style>
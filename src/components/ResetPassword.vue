<template>
  <div>
    <form novalidate class="card md-layout  md-alignment-space-around-center" @submit.prevent="validateUser">
      <md-card class="  md-layout-item md-size-50 md-small-size-100">
        <div class="md-title ">
          <span style="color:blue">F</span>
          <span style="color:red">u</span>
          <span style="color:#f3c300">n</span>
          <span style="color:blue">d</span>
          <span style="color:green">o</span>
          <span style="color:red">o</span>
        </div>
         <div class="md-title">Enter Your New Password</div>
        <md-card-content>
          <!-- <div class="md-layout-item md-small-size-100"> -->
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input
                type="password"
                name="password"
                id="password"
                autocomplete="family-name"
                v-model="form.password"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.password.required"
                >The password is required</span
              >
              <span class="md-error" v-else-if="!$v.form.password.minlength"
                >Password should be of Minimum 6 character</span
              >
            </md-field>
          <!-- </div> -->
          <md-card-actions class="actions">
            
            <md-button
              type="submit"
              class="md-dense md-raised md-primary"
              :disabled="sending"
              >Next</md-button
            >
          </md-card-actions>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        > {{ lastUser }} </md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  created() {
    this.$log.info(this.$route.params.token);
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      // var token = $stateParams.token;
      const resetPasswordData = {};
      resetPasswordData.password = this.form.password;
      // resetPasswordData.token=this.$route.params.token;
      const token = this.$route.params.token;
      this.$log.info("token ::: " + token);

      HTTP.post("resetPassword", resetPasswordData, {
        headers: { token: token }
      })
        .then(response => {
          const data = JSON.stringify(response.data);
          this.$log.info("reset Successfull ::: " + data);
          // alert("Passwrod Reset Successfully");
          this.lastUser = `Password Reset Successfully..`;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
          window.setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
        .catch(err => {
          this.$log.error("Error :: " + err);
          // alert("Passwrod Reset Unsuccessfully");
          this.lastUser = `Error While reset Password..`;
          this.userSaved = false;
          this.sending = false;
          this.clearForm();
        });
      // // Instead of this timeout, here you can call your API
      // window.setTimeout(() => {
      // this.lastUser = `${this.form.password}`
      // this.userSaved = true
      // this.sending = false
      // this.clearForm()
      // }, 1500)
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card{
  margin-top:75px
}
// input.md-input {
//     border-style: ridge;
// }

// .md-progress-bar {
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;
// }
// .md-layout {
//   display: flex;
//   /* height: 164px; */
//   margin-top: 164px;
//   margin-left: 413px;
//   // background-color: red
// }
// .md-title {
//   background-color: lightgrey;
// }
// .md-card-actions {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// }
</style>

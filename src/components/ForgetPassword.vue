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
        <div class="md-title">Enter Your Email</div>
        <md-card-content>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Invalid email</span
            >
          </md-field>
          <md-card-actions class="actions">
            <!-- <div class="md-layout "> -->
            <div class="md-layout">
              <div class="md-layout-item">
                <router-link :to="{ name: 'register' }"
                  >Create account</router-link
                >
              </div>
              <div class="md-layout-item">
                <router-link :to="{ name: 'login' }">Sign In</router-link>
              </div>
            </div>
            <!-- <div class=" md-layout-item"> -->
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

      <md-snackbar :md-active.sync="userSaved">{{ lastUser }}</md-snackbar>
    </form>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      email: {
        required,
        email
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
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      const forgetPasswordData = {};
      forgetPasswordData.email = this.form.email;

      HTTP.post("forgetPassword", forgetPasswordData)
        .then(response => {
          // const data=JSON.stringify(response.data);
          this.$log.info("forget Successfull ::: " + response.data);

          // alert('Link has been send to your register email Id')

          this.lastUser = response.data.message;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
        })
        .catch(err => {
          this.$log.info("Error :: " + err.meassage);
          // alert('Invalid Email ID')
          this.lastUser = `Invalid Email ID..`;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
        });
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

.actions {
  display: flex;
  justify-content: space-between;
}
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
// .md-button .md-ripple {
//   background-color: cornflowerblue;
// }
</style>

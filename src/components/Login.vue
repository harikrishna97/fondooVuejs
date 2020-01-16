//@description: Login Component

<template>
  <div class="mainDiv md-layout-item md-small-size-100">
    <form
      novalidate
      class="card md-layout  md-alignment-space-around-center"
      @submit.prevent="validateUser"
    >
      <md-card class="  md-layout-item md-size-50 md-small-size-100">
        <!-- <md-card-header> -->
        <div class="md-title ">
          <span style="color:blue">F</span>
          <span style="color:red">u</span>
          <span style="color:#f3c300">n</span>
          <span style="color:blue">d</span>
          <span style="color:green">o</span>
          <span style="color:red">o</span>
        </div>
        <div class="md-title">Sign In</div>
        <!-- </md-card-header> -->
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

          <div class="md-layout-item md-small-size-100">
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
              <!-- <span class="md-error" v-else-if="!$v.form.password.maxlength">Password should be of Maximum 12 character</span> -->
            </md-field>
          </div>

          <md-card-actions class="actions">
            <!-- <div class="md-layout "> -->
            <div class="md-layout">
              <div class="md-layout-item">
                <router-link :to="{ name: 'register' }"
                  >Create account</router-link
                >
              </div>
              <div class="md-layout-item">
                <router-link :to="{ name: 'forgetpassword' }"
                  >forget password?</router-link
                >
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

        <!-- <router-link :to="{name:'resetpassword'}">Reset password?</router-link> -->
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was logged Successfully!</md-snackbar
      >
      <md-snackbar :md-active.sync="userSavedF"
        >Invalid Email/Password!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { HTTP } from "../services/http-common";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      password: null,
      email: null
    },
    userSaved: false,
    userSavedF: false,

    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
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
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      const loginData = {};

      loginData.email = this.form.email;
      loginData.password = this.form.password;

      HTTP.post("login", loginData)
        .then(response => {
          // const data=JSON.stringify(response.data);
          // this.$log.info('token:: '+response.data.token)
          localStorage.setItem("token", response.data.token);
          // this.$log.info('Data IS :: '+data)
          if (response.data.success == true) {
            // alert('Login Successful..!');
            // }else{
            //   alert('Wrong Email ID/Password, Login Unsuccessful..!');
          }
          this.lastUser = `${this.form.email}`;
          this.userSaved = true;
          this.sending = false;
          // this.$router.push('dashboard')
          // this.clearForm()
        })
        .catch(err => {
          this.$log.error("Error :: " + err);
          this.lastUser = `${this.form.email}`;
          this.userSavedF = true;
          this.sending = false;
          this.clearForm();
        });

      // Instead of this timeout, here you can call your API
      // window.setTimeout(() => {
      // this.lastUser = `${this.form.email} ${this.form.password}`
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
.actions {
  display: flex;
  justify-content: space-between;
}
input.md-input {
    border-style: ridge;
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
//   margin-top: 40px;
//   margin-left: 413px;
//   // background-color: red
// }
// .md-card-header {
//   background-color: cornflowerblue;
// }
// .md-card-actions {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// }
</style>

<template>
  <div class="mainDiv md-layout-item  md-size-50 md-small-size-100">
    <form novalidate class="card md-layout  md-alignment-space-around-center" @submit.prevent="validateUser">
      <md-card class="  md-layout-item md-size-50 md-small-size-100">
        <div class="md-title ">
          <span id="I1">F</span>
          <span id="I2">u</span>
          <span id="I3">n</span>
          <span id="I4">d</span>
          <span id="I5">o</span>
          <span id="I6">o</span>
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
.mainDiv{
  display: flex;
    justify-content: center
}
#I1{
    color:blue;
  }
  #I2{
    color:red
  }
  #I3{
    color:#f3c300
  }
  #I4{
    color:blue
  }
  #I5{
    color:green
  }
  #I6{
    color:red
  }
</style>

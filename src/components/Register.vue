<template>
<!-- <md-card> -->
  <div class="mainDiv md-layout-item  md-small-size-50">
    <form novalidate class="card md-layout  md-alignment-space-around-center " @submit.prevent="validateUser">
      <md-card class="  md-layout-item md-size-50 md-small-size-100">
        <div class="md-title ">
          <span style="color:blue">F</span>
          <span style="color:red">u</span>
          <span style="color:#f3c300">n</span>
          <span style="color:blue">d</span>
          <span style="color:green">o</span>
          <span style="color:red">o</span>
        </div>
        <div class="md-title">Create Your Account</div>

        <md-card-content class="md-layout ">
          <div class="column md-layout-item">
            <div class="md-layout ">
              <div class=" curved md-layout-item md-size-45">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    v-model="form.firstName"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.firstName.required"
                    >The first name is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.firstName.minlength"
                    >Invalid first name</span
                  >
                </md-field>
              </div>
              <div class=" md-layout-item md-size-10" />
              <div class=" curved md-layout-item md-size-40">
                <md-field :class="getValidationClass('lastName')">
                  <label for="last-name">Last Name</label>
                  <md-input
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    v-model="form.lastName"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.lastName.required"
                    >The last name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.lastName.minlength"
                    >Invalid last name</span
                  >
                </md-field>
              </div>
            </div>

            <div>
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
            </div>

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
              </md-field>
              <p>Use 6 or more characters with a mix of letters, numbers & symbols</p>
            </div>
            <md-card-actions class="actions">
              <!-- <div class="md-layout "> -->
              <div class="act">
                <router-link :to="{ name: 'login' }" class=""
                  >Sign in instead</router-link
                >
              </div>

              <!-- <div class=" md-layout-item"> -->

              <md-button type="submit" class="md-dense md-raised md-primary" :disabled="sending"
                >Next</md-button
              >
            </md-card-actions>
          </div>

          <div class="md-layout-item md-size-35">
            <md-card-media>
              <img src="../assets/account.svg" alt="account.svg" class="image" />
              <figcaption>One account. All of Google working for you.</figcaption>
            </md-card-media>
           
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </md-card>

      <md-snackbar :md-active.sync="userSaved">{{ lastUser }}</md-snackbar>
    </form>
  </div>
  <!-- </md-card> -->
</template>

<script>
import { HTTP } from "../services/http-common";
// import axios from 'axios';

import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    return: {
      posts: [],
      errors: []
    },
    form: {
      firstName: null,
      lastName: null,
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
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.$log.info("In Save User");

      this.sending = true;
      const registerData = {};
      registerData.firstName = this.form.firstName;
      registerData.lastName = this.form.lastName;
      registerData.email = this.form.email;
      registerData.password = this.form.password;

      HTTP.post("user", registerData)
        .then(response => {
          // const data = JSON.stringify(response.data);
          // this.$log.info("Registration Successfull ::: " + data);
          // alert('Registration Successful')
          this.lastUser = response.data.data.message;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
          window.setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
        .catch(error => {
          this.$log.info("error :: " + JSON.stringify(error));
          this.lastUser = `Email Id allready Registered..`;
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


.image {
  width: "100px";
  height: "100px";
}
div.md-card-media figcaption {
    font-family: Roboto;
    font-size: 13px;
    text-transform: none;
}

div.md-layout-item.md-small-size-100 p {
    font-family: Roboto;
    font-size: 11px;
    margin-top: -18px;
    font-style: normal;
    font-weight: normal;
}

// input.md-input {
//     border-style: ridge;
// }



.actions{
  display:flex;
  justify-content: space-between;
}
// div.md-card-content {
//     padding-left: 2px;
//     padding-right: 2px;
//     margin-left: 1px;
//     margin-right: 274px;
// }

// div.md-title {
//     margin-right: 341px;
// }

// .secondcard{
//   margin-top: 20px 0px 10px 0px;
// }

// .viewport {
//     width: 320px;
//     max-width: 100%;
//     display: inline-block;
//     vertical-align: top;
//     overflow: auto;
//     border: 1px solid rgba(#000, .12);
//   }

// .mainDiv{
//   // justify-content:center
// }

// .curved{
//    border-radius: 25px;
//   border: 1px solid grey;
//   padding: 3.5px;
//   // width: 200px;
//   // height: 150px;
// }
// .md-progress-bar {
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;

// }
// .md-layout-item md-size-50 md-small-size-100{
//   margin-left: 100px;
//   margin-right : 100px
// }

//   .md-layout{
//     display: flex;
//   /* height: 164px; */
//   margin-top: 164px;
//   margin-left: 413px;
// // background-color: red
// }
// .md-card-header{
//       background-color: cornflowerblue;

// }

// .md-card-actions{
//   display: flex;
//   flex-direction: row;
//   justify-content: center;

// }
// .md-raised {
//       background-color: cornflowerblue;
// }
// .inputdiv {
//  border-radius: 25px;
// border: 1px solid grey;
// padding: 20px;
// // width: 200px;
// // height: 150px;
// }
</style>

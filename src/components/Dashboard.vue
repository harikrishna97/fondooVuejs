<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div><span class="md-title">CHAT APPLICATION </span></div>
        <div><md-button class=""  @click.stop="logout()">Logout</md-button></div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar style="background-color:orange ; text-align:center;"  class="md-transparent" md-elevation="0">
          USERS
        </md-toolbar>

        <md-list v-for="(user,i) in users" v-bind:key="i">
          {{ user.firstName }}
            <!-- <h3>Hari</h3>
            <h3>Krishna</h3>
            <h3>shailesh</h3>
            <h3>Adhokshaj</h3>
            <h3>Ram</h3>
            <h3>Gopal</h3> -->

        </md-list>
      </md-app-drawer>

      <md-app-content>
       Hello, Welcome to chatApp
      </md-app-content>

      

    </md-app>
    <div class="send_field">
      <div style="width:50%" >
        <md-field class="send_input">
            <md-input  v-text="message" id="message" placeholder="  type here.." v-model.trim="message"/>
        </md-field>
      </div>
      <div class="send">
        <md-button class="md-raised">Send</md-button>
      </div>
    </div>
  </div>
</template>



<script>
import { HTTP } from '../services/http-common'
import * as io from 'socket.io-client'
// Client side Socket.IO object
  export default {
    name: 'Dashboard',
    data :() =>{
      return {
        message:'',
        chats: [],
        users:[{"firstName":"hari"},
        {"firstName":"Krishna"}],
        errors: [],
        chat: {},
        // socket: io('https://chatyard.herokuapp.com')
        socket: io('localhost:2000')

      }
    },
    created () {  

    HTTP.get('getAllUser')
    // axios.get(`https://chatyard.herokuapp.com/api/chat/` + this.$route.params.id)
    .then(response => {
      this.users = response.data[0]
//       const dd=response.data;
// dd.array.forEach(element => {
//    this.$log.info(element)
// });
      this.$log.info('forget Successfull ::: '+JSON.stringify(response.data.Data))

    })
    .catch(e => {
      this.errors.push(e)
      //
    })


    this.socket.on('new-message', function (data) {
    if(data.message.room === this.$route.params.id) {
      this.chats.push(data.message)
    }
  }.bind(this))
  },
  // methods: {
  // logout () {
  //   this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: this.chat.nickname + ' left this room', created_date: new Date() });
  //   this.$router.push({
  //     name: 'RoomList'
  //   })
  // },
  onSubmit (evt) {
    evt.preventDefault()
    this.chat.room = this.$route.params.id
    this.chat.nickname = this.$route.params.nickname
    
    HTTP.post('sendMessages')

    // axios.post(`https://chatyard.herokuapp.com/api/chat/`, this.chat)
    .then(response => {
      this.socket.emit('savemessage', response.data)
      this.chat.message = ''
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
// },
    methods: {
        getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
            return {
                'md-invalid': field.$invalid && field.$dirty
            }
            }
        },
        clearForm () {
            this.$v.$reset()
            this.form.email = null

        },
        saveUser () {
            this.sending = true
            // const forgetPasswordData={}
            // forgetPasswordData.email=this.form.email;

            HTTP.get('getAllUsers')
          .then(response=>{
           
            const data=JSON.stringify(response.data);
            this.users=data;
            this.$log.info('forget Successfull ::: '+data)
            
              alert('Link has been send to your register email Id')
            
            this.lastUser = `${this.form.email} ${this.form.password}`
            this.userSaved = true
            this.sending = false
            this.clearForm()
          })
          .catch(err=>{
            this.$log.error('Error :: '+err);
            alert('Invalid Email ID')
            this.lastUser = `${this.form.email} ${this.form.password}`
            this.userSaved = false
            this.sending = false
            this.clearForm()
            
          })


            // Instead of this timeout, here you can call your API
            window.setTimeout(() => {
            this.lastUser = `${this.form.email} ${this.form.password}`
            this.userSaved = true
            this.sending = false
            this.clearForm()
            }, 1500)

            
        }
    }
  }

</script>

<style lang="scss" scoped>
  
  .md-app {
    width:96%;
    height: 97vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  div.md-content.md-app-content.md-flex.md-theme-default {
    background-color: #b4dbed;
}

div.md-drawer.md-app-drawer.md-theme-default.md-left.md-permanent.md-permanent-full {
    background-color: #e8e37b;
}
.send_field{
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    left: 30%;
    bottom: 1%;
}
.send_input{
  background: white;
  justify-content: center;
  align-content: center;
}
</style>
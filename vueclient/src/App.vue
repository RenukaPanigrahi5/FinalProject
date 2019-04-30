<template>
  <div id="app">
    <navbar> </navbar>
    <router-view />
    
  </div>
</template>

<script>
import Vue from 'vue'
import facebookLogin from 'facebook-login-vuejs';
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
     facebookLogin, 
     'Navbar': Navbar
  },
  methods:
  {
    getUserData(){
      this.FB.api('/me', 'GET', { fields: 'id,name,email'},
      userInformation => {
        console.warn("get data from fb", userInformation)
        this.personalID = userInformation.id;
        this.email = userInformation.id;
        this.name = userInformation.name;
      }

    )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if(this.isConnected)this.getUserData()
    },
    onLogin()
    {
      this.isConnected = true
      this.getUserData()
    },
    onLogout(){
      this.isConnected = false;
    }
  },
}
</script>
<style>
.fitnessDiv {
            background-color: #0c145e;
            border: 0in;            
}
</style>


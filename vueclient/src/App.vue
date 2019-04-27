<template>
  <div id="app">
    <navbar> </navbar>
    <router-view />
    
  </div>
</template>

<script>
import Vue from 'vue'
import facebookLogin from 'vue-facebook-login-component';
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
     facebookLogin, 
    'Navbar': Navbar
  }
}
</script>
<style>
.fitnessDiv {
            background-color: #0c145e;
            border: 0in;            
}
</style>


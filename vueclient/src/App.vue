<template>
  <div id="app">
    <navbar> </navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    'Navbar': Navbar
  }
}
</script>
<style>
.fitnessDiv {
            background-color: #c6b9e9;
            border: 0in;            
}
</style>


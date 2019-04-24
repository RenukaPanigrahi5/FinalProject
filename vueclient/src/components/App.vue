<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/" >
           
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item " v-if="!user.authenticated">
                    <router-link class="nav-link" to="/home" active-class="active" exact>Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/login" active-class="active">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/userProfile">User Profile</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link disabled" to="#"  active-class="active">Disabled</router-link>
                </li>
            </ul>
        </div>
    </nav>
    
       
  
  
</template>

<script>
import auth from '../auth'
import home from '../components/Home.vue';

export default {
  name: 'app',
  components: {
      home
  }
};
</script>
<style>

</style>


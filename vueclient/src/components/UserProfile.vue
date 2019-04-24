<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>User Profile</h1>
    
    <div class="quote-area">
      <h2>{{ email }}</h2>      
    </div>
    <div>
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="selected = tab;"
            :class="['tab-btn', { active: selected === tab }]"
          >
            {{ tab }}
          </button>

          <component :is="selected" class="tab"></component>
  </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {

  data() {
    console.log("localStorage.email"+ localStorage.getItem('id_email'));
    return {
      email: localStorage.getItem('id_email')
    }
  },

  methods: {
    
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>
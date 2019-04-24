<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Sign Up</h2>
    <p>Sign up for a free account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input   type="text"   v-validate="'required'" class="form-control" placeholder="Enter your fullName"  v-model="user.fullName" :class="{ 'is-invalid': submitted && errors.has('firstName') }">
      <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
    </div>
    <div class="form-group">
      <input   type="text"  v-validate="'required'" class="form-control" placeholder="Enter your username"  v-model="user.username">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" v-validate="{ required: true, min: 6 }" placeholder="Enter your password" v-model="user.password">
    </div>
    <div class="form-group">
      <input   type="text"  v-validate="'required'" class="form-control" placeholder="Enter your email"  v-model="user.email">
    </div>
    <div class="form-group">
      <input   type="text"  v-validate="'required'" class="form-control" placeholder="Enter your height in centimeter"  v-model="user.height">
    </div>
    <div class="form-group">
      <input   type="text"   v-validate="'required'" class="form-control" placeholder="Enter your weight in KG"  v-model="user.weight">
    </div>
    <div class="form-group">
      <input   type="text"  v-validate="'required'"  class="form-control" placeholder="Enter your gender"  v-model="user.gender">
    </div>
    <div class="form-group">
      <input   type="text"   class="form-control" placeholder="Enter your address"  v-model="user.address">
    </div>
    <button class="btn btn-primary" @click="submit()">Signup</button>
  </div>
</template>

<script>
import auth from '../auth'

export default {

  data() {
    return {
      user: {
        fullName: '',
        username: '',
        password: '',
        email: '',
        height: '',
        weight: '',
        gender: '',
        address: '',
      },
      error: ''
    }
  },

  methods: {
    
    submit() {

      var user = {
        fullName: this.user.fullName,
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        height: this.user.height,
        weight: this.user.weight,
        gender: this.user.gender,
        address: this.user.address
      }

      auth.signup(this, user, 'secretquote')
    }
  }
}
</script>
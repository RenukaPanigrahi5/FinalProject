<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                      <input type="email" v-model="user.email" v-validate="'required'" class="form-control" name="email" placeholder="Enter Email" :class="{ 'is-invalid': submitted && errors.has('email') }">
                      <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="user.password" v-validate="'required|min: 6'" class="form-control" name="password" placeholder="Enter Password" :class="{ 'is-invalid': submitted && errors.has('password') }">
                      <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
     return {
          user:{
                password: '',
                email: ''                
              },
          submitted: false
    }
  },

  methods: {
    login (e) {
              this.submitted = true;
              this.$validator.validate().then(valid => {                
                      if (valid) {
                                  this.submitted = true;                      
                                  const url = 'http://localhost:8082/fitnessapp/users/authenticate';
                                  const body = this.user;
                                  const headers= {"content-type": "application/json"}                      
                                  console.log("in iside login "+body.email + body.password)
                                  axios.post(url, body, headers).then(res => {
                                        if(res.data.id_token){
                                            console.log('usertoken'+ res.data.id_token);
                                            const parsedUser = JSON.stringify(res.data.user);
                                            console.log('res.data.user.email '+ parsedUser);
                                            localStorage.setItem('usertoken', res.data.id_token)
                                            localStorage.setItem('userDetails', parsedUser)
                                            router.push({ name: 'Profile' })
                                            this.emitMethod()
                                        }else{
                                          console.log("Wrong Password");
                                        }                                        
                                  }).catch(err => {
                                        console.log("error"+err)
                                        // router.push({ name: 'Error' }) push to error page or user Toaster
                                  })                                  
                      }else{
                        console.log("Form validation Failed");
                      }                      
              });                
    },    
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>

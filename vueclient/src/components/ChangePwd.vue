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
                      <input type="password" v-model="user.password" v-validate="'required|min: 6'" class="form-control" name="password" placeholder="Enter Password"  ref="password" :class="{ 'is-invalid': submitted && errors.has('password') }">
                      <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="user.confirmPassword" v-validate="'required|confirmed:password'" class="form-control" name="confirmPassword" placeholder="Re-Enter Password" data-vv-as="password" :class="{ 'is-invalid': submitted && errors.has('confirmPassword') }">
                      <div v-if="submitted && errors.has('confirmPassword')" class="invalid-feedback">{{ errors.first('confirmPassword') }}</div>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Change Password</button>
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
                email: '',
                password: '',                
                confirmPassword:''               
              },
          submitted: false
    }
  },

  methods: {
    login(e) {
              this.submitted = true;
              this.$validator.validate().then(valid => {                
                      if (valid) {
                                  this.submitted = true;                      
                                  const url = 'http://localhost:8082/fitnessapp/users/changePassword';
                                  const body = this.user;
                                  const headers= {"content-type": "application/json"}                      
                                  console.log("inside change password "+body.email + body.password)
                                  axios.put(url, body, headers).then(res => {  
                                        if(res){
                                            console.log('res from server '+ res);
                                            router.push({ name: 'Login' })
                                        }else {
                                          console.log("Password updatation Failed");
                                            //router.push({ name: 'Error' }) push to error page
                                        }                                        
                                  }).catch(err => {
                                        console.log("error"+err)
                                        // router.push({ name: 'Error' }) push to error page
                                  })
                      }else{
                        console.log("Form validation Failed");
                      }                      
              });                
    }
  }
}
</script>

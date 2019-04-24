import {router} from '../index'

const API_URL = 'http://localhost:8082/fitnessapp/'
const LOGIN_URL = API_URL + 'users/authenticate'
const SIGNUP_URL = API_URL + 'users/register'

export default {

  user: {
    authenticated: false
  },

  login(context, user, redirect) {
    console.log("user email in the clinet login  "+ user.email);
    localStorage.setItem('id_email',  user.email);
    context.$http.post(LOGIN_URL, user, (data) => {
      localStorage.setItem('id_token', data.id_token)
      //localStorage.setItem("email"+user.email);
      console.log("localStorage email --- "+ localStorage.getItem('id_email'));
      console.log("localStorage id_token -- "+ localStorage.getItem('id_token'));
      //console.log("localStorage -- "+ localStorage);

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      console.log(err);
      context.error = err
    })
  },

  signup(context, user, redirect) {
    localStorage.setItem('id_email', user.email)
    context.$http.post(SIGNUP_URL, user, (data) => {     
      
      localStorage.setItem('id_token', data.id_token)
      console.log("id_token-- "+data.id_token)
      console.log("localStorage email --- "+ localStorage.getItem('id_email'));
      console.log("localStorage id_token -- "+ localStorage.getItem('id_token'));

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import ChangePwd from '@/components/ChangePwd'
import WorkoutSheet from '@/components/WorkoutSheet'
import DietSheet from '@/components/DietSheet'
import ActivityLog from '@/components/ActivityLog'
import About from '@/components/About'
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/changePwd',
      name: 'ChangePwd',
      component: ChangePwd
    },
    {
      path: '/workout',
      name: 'WorkoutSheet',
      component: WorkoutSheet
    },
    {
      path: '/diet',
      name: 'DietSheet',
      component: DietSheet
    },
    {
      path: '/activityLog',
      name: 'ActivityLog',
      component: ActivityLog
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
       path: '/activityGraph',
       name: 'ActivityGraph',
       component: ActivityGraph
     }
  ]
})

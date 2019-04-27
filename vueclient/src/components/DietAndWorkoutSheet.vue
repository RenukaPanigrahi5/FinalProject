<template>
    <div class="container" style="align-center">
        <div class="jumbotron mt-5 profileDiv">
            <div class="col-sm-8 mx-auto">
                <h3 class="text-center">User Workout Details as per their BMI</h3>
            </div>
            <div>
                <table class="table col-md-6 mx-auto  text-center">
                    <tbody>
                        <tbody>
                                <tr>
                                    <td>Age</td>
                                    <td>{{this.userDetailsFromLocalStorage.age}}</td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>{{this.userDetailsFromLocalStorage.height}}</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{{this.userDetailsFromLocalStorage.weight}}</td>
                                </tr>
                                <tr>
                                    <td>WorkoutCategory</td>
                                    <td>OverWeightMale</td>
                                </tr>                                    
                        </tbody>
                    </tbody>
                </table>
            </div>
        
            <div>               
                <div>
                    <v-tabs  v-model="active" color="blue"  dark slider-color="yellow" >
                        <v-tab v-for="workout in this.workouts"  :key="workout" ripple >
                             {{ workout.workoutDay }}
                        </v-tab>                        
                        <v-tab-item v-for="workout in this.workouts"  :key="workout" ripple>                            
                            <v-card flat>
                                <v-card-text>Workout For: {{ workout.workoutName }} <br>
                                             Workout Type:  {{ workout.workoutType }} <br>                                             
                                                <li v-for="subWorkout in workout.workoutInDetails">
                                                    {{ subWorkout.name }}  --> noOfSets ::  {{ subWorkout.noOfSets }}
                                                </li>
                                            
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>                   
                </div>             
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
  data: function() {    
        return{
            workouts: [],
            active: null,
            text: ''
            }      
 },
 created(){
    //const user = localStorage.getItem('userDetails');
        if (localStorage.getItem('userDetails')) {
            this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
        }
        const workoutCategory = "OverWeightMale";
        const url = 'http://localhost:8082/fitnessapp/workout/getWorkoutCategory?workoutCategory='+workoutCategory;
        console.log("url -- "+ url);
        const headers= {"content-type": "application/json"}  
        axios.get(url, headers).then(res => {
            console.log('fullName from API ');
            if(res.data.workouts){
                    this.workouts = res.data.workouts;  
                    console.log("response from API"+this.workouts);              
            }
        }).catch(err => {
            console.log("not able to fetch data from server")
        })

 },
 methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      },
      calculateBMI(){
        const user = localStorage.getItem('userDetails');
        if (localStorage.getItem('userDetails')) {
            this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
            const height =  this.userDetailsFromLocalStorage.height/100;     
            const weight =  this.userDetailsFromLocalStorage.weight;
            const BMI = weight/(height*height) 
            
            if (BMI < 18.5)
               console.log("BMI is less than 18.5  underweight"+ BMI)            
            else if ( BMI >= 18.5 && BMI < 24.9) 
                console.log("Healthy");            
            else if ( BMI >= 24.9 && BMI < 30) 
                console.log("overweight");           
            else if ( BMI >=30)
                console.log("Suffering from Obesity");
        }        
      }
    }

}
</script>

<style>
.profileDiv {
            background-color: lightblue;
            height:700px;
            width:700px;
            align-content: center;
            border: 0in;            
}
</style>

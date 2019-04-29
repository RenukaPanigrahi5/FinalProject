<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
       
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.src"
            :key="meetup.id">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>This is the Home Page</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        meetups: [
          { src: '', id: 'dfgfgtgrthv',  title: 'Welcome to Fitness Tracker' },
          { src: '', id: 'retergvcxvbnh', title: 'Enjoy your workouts' }
        ]
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
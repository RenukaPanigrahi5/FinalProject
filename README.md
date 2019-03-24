# FinalProject
Fitness Tracker

Home Page:
 A simple webpage that let the user to register. If he/she is registered the page allows the user to login with username and password.

Login Page:
A page with username and password fields.

Signup page:
It contains user details.
 
User's profile page:
 Having user's personal data.

Captures the age & height as a attribute as a primary data. Based on that it redirects to particular diet chart.

Diet Page:
Food to be intake based on the age & Height of the person.

Exercise Page:
According to the diet, exercises are defined.

Activity Log:
The history of diet and exercises of an person.

Sharing with friends :
User can share their log with friends.


#ProjectSetUp

This Fitness App uses Express.js and MongoDb

To start the MongoDb

./mongo
Start the server

npm run start

Runs on port 8082

#RestAPI

User Schema

http://localhost:8082/fitnessapp/users/register [POST]

http://localhost:8082/fitnessapp/users/authenticate[POST]
http://localhost:8082/fitnessapp/users/checkUserExistsAlready [GET]
http://localhost:8082/fitnessapp/users/displayAllUsers  [GET]

http://localhost:8082/fitnessapp/users/deleteUsers [DELETE]

Workout Schema

http://localhost:8082/fitnessapp/workout/addNewWorkout [POST]
http://localhost:8082/fitnessapp/workout/getWorkoutCategory [GET]


Diet Schema

http://localhost:8082/fitnessapp/dietSheet/addNewDiet  [POST]
http://localhost:8082/fitnessapp/dietSheet/getDietByCategory  [GET]

Trainer Schema

http://localhost:8082/fitnessapp/trainer/addNewTrainer [POST]
http://localhost:8082/fitnessapp/trainer/checkTrainerNameExistsAlready [GET]
http://localhost:8082/fitnessapp/trainer/removeTrainerByName [DELETE]
http://localhost:8082/fitnessapp/trainer/listAllTrainers[GET]

http://localhost:8082/fitnessapp/trainer/updateTrainerDetails [PUT]


UserAndTrainer Schema

http://localhost:8082/fitnessapp/trainer/assignTrainerToUser [POST]
http://localhost:8082/fitnessapp/trainer/updateTrainerOfUser [PUT]
http://localhost:8082/fitnessapp/trainer/removeUserForTrainer [DELETE]
http://localhost:8082/fitnessapp/trainer/displayAllTheTrainerAndUsers [GET]

workoutAndUser

http://localhost:8082/fitnessapp/workout/addWorkoutCategoryToUser  [POST]
http://localhost:8082/fitnessapp/workout/getWorkoutCategoryOfUser [GET]
http://localhost:8082/fitnessapp/workout/addNewWorkout [POST]





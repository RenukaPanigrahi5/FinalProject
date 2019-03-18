const Workout = require('../model/workoutModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getWorkoutByCategory = function (req, res) {
    const workoutCategory= req.body.workoutCategory;
    Workout.getWorkoutByCategory(workoutCategory, (err, workouts) => {
        if (err) throw err;
        if (isEmptyObject(workouts)) {
            return res.json({ success: true, msg: 'DietSheet not found for the dietcategory'});
        } else {
            res.json({
                success: true,
                workouts: workouts
            });
        }
    });
};

exports.addNewWorkout = function (req, res) {
    if(req.body.workouts){
        Workout.addManyWorkouts(req.body.workouts, (err, user) => {
            if(err){
                res.json({success: false, msg: 'Failed to add multiple workouts'});
            } else{
                res.json({success: true, msg: 'Workout added successfully'});
            }
        });
    } else {
        let newWorkout = new Workout(req.body);
        Workout,addNewWorkout(newWorkout, (err, user) => {
            if(err){
                res.json({success: false, msg: 'Failed to add new workout'});
            } else{
                res.json({success: true, msg:'Workout added successfully'});
            }
        });
    }
};
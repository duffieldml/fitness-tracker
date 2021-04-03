const db = require("../models");
const router = require("express").Router();

// Prepopulate the database
db.Workout.find({}).then(function (res) {
    console.log("Checking the database to see if there is information");
    if (res.length === 0) {
        console.log("Database has no information");
        require("../seeders/seed.js")
    }
});


//get workouts routes
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        console.log(dbWorkout);
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});


//add exercise routes
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
       { _id: req.params.id },
       { 
           $inc: { totalDuration: req.body.duration },
           $push: { exercise: req.body }
       },
       { new: true }).then(dbWorkout => {
           res.json(dbWorkout);
       }).catch(err => {
           res.json(err);
       })
        )
})

//create workout routes

// Get workout in ranges


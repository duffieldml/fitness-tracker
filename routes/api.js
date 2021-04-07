const db = require("../models");

//get workouts routes
module.exports = (app) => {
  // All Workouts - will render last workout on page
  // Route for posting a new workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    });
  });

  //Route for returning a workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]).then((dbWorkout) => {
      res.json(dbWorkout);
      db.Workout.find({})
        .then((dbWorkout) => {
          res.json(dbWorkout);
        })
        .catch((err) => {
          res.json(err);
        });
    });
  });
}
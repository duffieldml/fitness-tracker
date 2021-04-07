const db = require("../models");

//get workouts routes
module.exports = (app) => {
  // All Workouts - will render last workout on page
  // Creates Route
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    });
  })
}
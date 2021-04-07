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

  // Route to create and grab the ID for a new workout
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
        console.log(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Route for returning workouts for stats page
  app.get("/api/workouts/range", (req, res) => {
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
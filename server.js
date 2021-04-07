const express = require("express");
const mongoose = require("mongoose");

const htmlRouter = require('./routes/html');
const apiRouter = require('./routes/api'); 

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
htmlRouter(app);
apiRouter(app); 

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

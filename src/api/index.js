const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

mongoose
  .connect(
    "mongodb+srv://lokeshchauhan629:lokesh123@cluster0.rymlntl.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
const User = require("./models/User");
// endpoint for registering a user

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // create new user

  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });

  // save the user to database

  newUser
    .save()
    .then((user) => {
      res
        .status(200)
        .json({ message: "User Created Successfully", user: user });
    })
    .catch((err) => {
      res.status(500).json({ message: "User Creation Failed", error: err });
    });
});

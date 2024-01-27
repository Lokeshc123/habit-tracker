const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
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

// endpoint to login
const createToken = (userId) => {
  // set token payload
  const payload = {
    userId: userId,
  };

  // create token
  const token = jwt.sign(payload, "Q$%&*()!@#$%^&*()_+", { expiresIn: "1h" });
  return token;
};

// endpint for login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check if the email and password are provided
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password Required" });
    return; // Add return statement to stop further execution
  }

  // check for the user with the email
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
        return; // Add return statement to stop further execution
      }

      // check for the password
      if (user.password !== password) {
        res.status(400).json({ message: "Invalid Password" });
        return; // Add return statement to stop further execution
      }

      const token = createToken(user._id);
      res.status(200).json({ message: "Login Successful", token: token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Login Failed", error: err });
    });
});

const Habit = require("./models/Habits");

// endpoint for creating a habit

app.post("/user/:userId/habit", async (req, res) => {
  const userId = req.params.userId;
  const {
    title,
    change,
    completedDays,
    WeeklyAvg,
    CurrentStreak,
    LongestStreak,
  } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // Create a new habit
    const newHabit = new Habit({
      title,
      change,
      completedDays,
      WeeklyAvg,
      CurrentStreak,
      LongestStreak,
      lastUpdated: new Date(),
    });

    // Save the new habit
    const savedHabit = await newHabit.save();

    // Associate the habit with the user
    user.habits.push(savedHabit._id);
    await user.save();

    res
      .status(200)
      .json({ message: "Habit Created Successfully", habit: savedHabit });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Habit Creation Failed", error: err.message });
  }
});

// endpoint for getting all the habits of a user
// ... (previous code)

// endpoint for getting habits of a user
app.get("/user/:userId/habits", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const user = await User.findById(userId).populate("habits");

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    res.status(200).json({ habits: user.habits });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving habits", error: err.message });
  }
});

// Endpoint for updating habit values
app.put("/user/:userId/habit/:habitId", async (req, res) => {
  const userId = req.params.userId;
  const habitId = req.params.habitId;
  const {
    title,
    change,
    completedDays,
    WeeklyAvg,
    CurrentStreak,
    LongestStreak,
  } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // Check if the habit exists
    const habit = await Habit.findById(habitId);
    if (!habit) {
      res.status(404).json({ message: "Habit Not Found" });
      return;
    }

    // Update habit values
    habit.title = title || habit.title;
    habit.change = change || habit.change;
    habit.completedDays = completedDays || habit.completedDays;
    habit.WeeklyAvg = WeeklyAvg || habit.WeeklyAvg;
    habit.CurrentStreak = CurrentStreak || habit.CurrentStreak;
    habit.LongestStreak = LongestStreak || habit.LongestStreak;

    // Save the updated habit
    const updatedHabit = await habit.save();

    res
      .status(200)
      .json({ message: "Habit Updated Successfully", habit: updatedHabit });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Habit Update Failed", error: err.message });
  }
});

// endpoint for deleting a habit

app.delete("/user/:userId/habit/:habitId", async (req, res) => {
  const userId = req.params.userId;
  const habitId = req.params.habitId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // Check if the habit exists
    const habit = await Habit.findById(habitId);
    if (!habit) {
      res.status(404).json({ message: "Habit Not Found" });
      return;
    }

    // Remove the habit from the user's habits array
    user.habits = user.habits.filter((habit) => habit.toString() !== habitId);
    await user.save();

    // Delete the habit from the Habits collection
    await Habit.findByIdAndDelete(habitId);

    res.status(200).json({ message: "Habit Deleted Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Habit Deletion Failed", error: err.message });
  }
});

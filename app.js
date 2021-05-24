const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://ujjwal_1908:ujjwal1234@cluster0.ghr9l.mongodb.net/task-database?retryWrites=true&w=majority";

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => console.log("Server Up and running"));
  })
  .catch((err) => console.log(err));

const Task = require("./models/tasks");

app.get("/", (req, res) => {
  // res.render("index");
  Task.find()
    .then((result) => {
      res.render("index", { tasks: result });
    })
    .catch((err) => console.group(err));
});

app.get("/add-task", (req, res) => {
  res.render("add-item");
});

app.get("/get-tasks", (req, res) => {
  Task.find()
    .then((result) => {
      res.render("index", { tasks: result });
    })
    .catch((err) => console.group(err));
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  const task = Task(req.body);
  task
    .save()
    .then(() => {
      res.redirect("/get-tasks");
    })
    .catch((err) => console.group(err));
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/get-tasks" });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ msg: "Updated Successfully!" });
  });
});

app.use((req, res) => {
  res.render("error");
});

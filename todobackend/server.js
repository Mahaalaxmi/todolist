//create express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create an instance of express
const app = express();
app.use(express.json());
app.use(cors());

//let todos = [];

//connecting mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//creating schema
const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: true,
    type: String,
  },
});

//creating model
const todoModel = mongoose.model("Todo", todoSchema);

//create a new todo item
app.post("/todos", async (req, res) => {
  const { title, desc } = req.body;

  try {
    const newTodo = new todoModel({ title, desc });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Get all items
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Update a todo item
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messgae: error.message });
  }
});

//delete a todo item
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log("Server is listening to port " + port);
});

import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Blog from "./model/blog.js";
import { readdirSync } from "fs";

//using enviroment variable
dotenv.config();

//create express app
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // If you're also handling JSON bodies

// handle file paht
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// use server static file
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

// set views engine
app.set("view engine", "ejs");

// handle requests
// root
app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("index", { title: "Home", blogs });
  } catch (error) {
    return res.status(500).send(error);
  }
});

//about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//create route
app.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

//create blog
app.post("/create", async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(500).send(error);
  }
  try {
    const blog = await Blog.create({
      title,
      body,
    });
    res.status(201).redirect("/");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// listen app in port 3000 and connect to db
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    console.log("connected to db");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running");
    });
  })
  .catch((error) => console.log(error));

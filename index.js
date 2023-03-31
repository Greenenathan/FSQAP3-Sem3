const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

//SETTING UP LOGGER
const logEvents = require("./logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Peter" });
});

app.get("/about", (request, response) => {
  response.render("about.ejs");
});

const supplementsRouter = require("./routes/supplements");
app.use("/supplements", supplementsRouter);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
  myEmitter.emit("log", "404", "ERROR", "Content Is Not Found");
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});

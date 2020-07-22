const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3006;

mongoose.connect("mongodb://localhost/webdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;


db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("DB connection alive");
});

app.use(express.json());

//routers
const newsRouter = require("./routes/newsRouter.js");
app.use("/api/news", newsRouter);

var documents = require("./routes/documents");
app.use("/documents", documents);

app.listen(port, "0.0.0.0", () => console.log(`listening on port ${port}!`));


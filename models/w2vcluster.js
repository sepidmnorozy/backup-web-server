const mongoose = require("mongoose");
// const news = require("./news.js");
const cluster = require("./cluster.js");
const w2vclusterSchema = new mongoose.Schema({
  num: Number,
  avr: [Number],
  list: [[String, Number]],
  numofnews: Number
});

module.exports = {
  schema: w2vclusterSchema,
  model: mongoose.model("w2vcluster", w2vclusterSchema, "w2vclusters")
};

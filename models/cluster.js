const mongoose = require("mongoose");


const clusterSchema = new mongoose.Schema({
  url: String,
  title: String
});

module.exports = {
  schema: clusterSchema,
  model: mongoose.model("cluster", clusterSchema, "clusters")
};


const mongoose = require("mongoose");

const searchStatusSchema = new mongoose.Schema({
  status: String
});

module.exports = {
  schema: searchStatusSchema,
  model: mongoose.model("searchstatus", searchStatusSchema, "searchstatus")
};

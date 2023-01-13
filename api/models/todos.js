// Require Mongoose
const mongoose = require("mongoose");

const schema  = mongoose.Schema({
    name: String,
    content: String,
    date: Date,
});

module.exports = mongoose.model("todos", schema);
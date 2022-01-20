const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "Status is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is mandatory"],
  },
});

module.exports = model("Category", CategorySchema);

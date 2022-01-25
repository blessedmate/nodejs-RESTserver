const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    unique: true,
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

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Category", CategorySchema);

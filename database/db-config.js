const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB online...");
  } catch (error) {
    console.log(error);
    throw new Error("Error when starting DB");
  }
};

module.exports = {
  dbConnection,
};

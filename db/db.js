const mongoose = require("mongoose");
const { DB_CONNECT } = require("../config");

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_CONNECT);
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);

    process.exit(1); //Exit process if db connection fails
  }
};

module.exports = connectToDB;

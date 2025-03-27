const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT, JWT_SECRET } = require("../config");

const userSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [2, "First name must be at least 2 characters long"],
        trim: true,
      },
      lastname: {
        type: String,
        minlength: [2, "Last name must be at least 2 characters long"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Ensure password is not included in queries by default
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before creating
userSchema.pre("save", async function (next) {
  //   This ensures hash the password only it is modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(SALT));
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    throw new Error(
      "Password not available. Make sure to select '+password' in the query."
    );
  }
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;

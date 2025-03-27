import jwt from "jsonwebtoken";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { TUser } from "../interfaces/user.interface";

// Extend the TUser type to include Mongoose Document methods
interface IUser extends TUser, Document {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(config.SALT));
  }
  next();
});

// Generate authentication token
userSchema.methods.generateAuthToken = function (): string {
  try {
    const token = jwt.sign({ _id: this._id }, config.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Compare passwords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  if (!this.password) {
    throw new Error(
      "Password not available. Make sure to select '+password' in the query."
    );
  }
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;

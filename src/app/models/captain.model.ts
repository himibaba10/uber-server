import jwt from "jsonwebtoken";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { TCaptain } from "../interfaces/captain.interface";
import generateAuthToken from "../utils/generateAuthToken";

// Extend the TUser type to include Mongoose Document methods
interface ICaptain extends TCaptain, Document {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

const captainSchema = new Schema<ICaptain>(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        trim: true,
      },
      plate: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      vehicleType: {
        type: String,
        enum: ["car", "motorcycle", "auto"],
        required: true,
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
captainSchema.pre<ICaptain>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(config.SALT));
  }
  next();
});

// Generate authentication token
captainSchema.methods.generateAuthToken = generateAuthToken;

// Compare passwords
captainSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  if (!this.password) {
    throw new Error(
      "Password not available. Make sure to select '+password' in the query."
    );
  }
  return await bcrypt.compare(password, this.password);
};

const Captain = model<ICaptain>("Captain", captainSchema);

export default Captain;

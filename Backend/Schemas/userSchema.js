import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv-flow'
import { SECRET_KEY } from "../config.js";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    console.log("error occured while generating a token" + e);
  }
};
const User = mongoose.model("User", userSchema);
export default User;

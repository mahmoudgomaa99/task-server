import bcrypt from "bcryptjs";
import HttpError from "../models/Http-Error";
import { NextFunction } from "express";

export default async (password: string, next: NextFunction) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("signing up failed please try again", 500));
  }
  return hashedPassword;
};

import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../models/Http-Error";

const jwtSecret: any = process.env.JWT_SECRET;

export default (email: any, name: any, next: NextFunction) => {
  let token;
  try {
    token = jwt.sign(
      {
        email: email,
        name: name,
      },
      jwtSecret,
      { expiresIn: "350d" }
    );
  } catch (error) {
    return next(new HttpError("something went wrong, please try again", 500));
  }
  return token;
};

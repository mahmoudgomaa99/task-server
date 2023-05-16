require("dotenv").config();
import HttpError from "../models/Http-Error";
import jwt from "jsonwebtoken";

const jwtSecret: any = process.env.JWT_SECRET;
// @ts-ignore
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Authentication failed!");
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    console.log(error);
    return next(res.status(403).json({ message: "Authentication failed" }));
  }
};

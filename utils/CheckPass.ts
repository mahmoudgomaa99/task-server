import HttpError from "../models/Http-Error";
import bcrypt from "bcryptjs";

export default async (password: string, user: any, next: any) => {
  let isValidatePaassword = false;
  try {
    isValidatePaassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(new HttpError("logging in failed please try again", 500));
  }
  return isValidatePaassword;
};

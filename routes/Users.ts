import express from "express";
const UserRouter = express.Router();
import hash from "../utils/hash";
import createToken from "../utils/createToken";
import HttpError from "../models/Http-Error";
import { excludeKey } from "../utils/exclude";
import CheckPass from "../utils/CheckPass";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

UserRouter.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, next);
    const token = createToken(req.body.email, req.body.name, next);
    const newUser = await prisma.user.create({
      data: { ...req.body, token, password: hashedPassword },
    });
    res.status(200).json({
      message: "success",
      data: excludeKey(newUser),
    });
  } catch (error: any) {    
    if (error.meta.target === "User_email_key")
      return res.status(409).json({ message: "Email already exists" });
    return next(res.status(500).json({ message: "Signing up failed" }));
  }
});

UserRouter.post("/signin", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    const isValidatePaassword = await CheckPass(req.body.password, user, next);
    if (!user || !isValidatePaassword)
      return res
        .status(404)
        .json({ message: "Email or Password are incorrect" });
    const token: any = createToken(req.body.email, req.body.name, next);
    await prisma.user.update({
      where: { email: req.body.email },
      data: { token },
    });
    res.status(200).json({ message: "success", data: excludeKey(user) });
  } catch (error: any) {
        console.log(error);

    return next(res.status(500).json({ message: "Signing in failed" }));
  }
});

export default UserRouter;

import express from "express";
const TodosRouter = express.Router();
import { PrismaClient } from "@prisma/client";
import HttpError from "../models/Http-Error";
const prisma = new PrismaClient();

const getAllTodos = async (req: any, res: any, next: any) => {
  try {
    const todos = await prisma.tODOS.findMany({
      where: { userId: req.params.userId },
    });
    res.status(200).json({ message: "success", data: todos });
  } catch (error: any) {
    return next(new HttpError("Fetching todos failed please try again", 500));
  }
};

const Addtodo = async (req: any, res: any, next: any) => {
  try {
    const newTodo = await prisma.tODOS.create({
      data: { ...req.body },
    });
    res.status(200).json({ message: "success", data: newTodo });
  } catch (error: any) {
    return next(res.status(500).json({ message: "Adding todo failed" }));
  }
};

const UpdateTodo = async (req: any, res: any, next: any) => {
  try {
    const updatedTodo = await prisma.tODOS.update({
      where: { id: req.body.Todo_id },
      data: { title: req.body.title, description: req.body.description },
    });
    res.status(200).json({ message: "success", data: updatedTodo });
  } catch (error: any) {
    return next(res.status(500).json({ message: "Updating todo failed" }));
  }
};

const DeleteTodo = async (req: any, res: any, next: any) => {
  try {
    await prisma.tODOS.delete({
      where: { id: req.params.Todo_id },
    });
    res.status(200).json({ message: "success" });
  } catch (error: any) {
    return next(res.status(500).json({ message: "Deleting todo failed" }));
  }
};

const getSingleTodo = async (req: any, res: any, next: any) => {
  try {
    const todo = await prisma.tODOS.findUnique({
      where: { id: req.params.Todo_id },
    });
    res.status(200).json({ message: "success", data: todo });
  } catch (error: any) {
    return next(res.status(500).json({ message: "Fetching todo failed" }));
  }
};

TodosRouter.get("/", getAllTodos);
TodosRouter.post("/", Addtodo);
TodosRouter.put("/", UpdateTodo);
TodosRouter.delete("/delete/:Todo_id", DeleteTodo);
TodosRouter.get("/:Todo_id", getSingleTodo);

export default TodosRouter;

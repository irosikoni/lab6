import { Request, Response } from "express";
import { prisma } from "../prisma";
import { extractUser } from "./extractUser";

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users.map((user) => extractUser(user)));
};

import { prisma } from "../prisma";
import { Request, Response } from "express";
import { extractUser } from "./extractUser";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user === null) {
    res.status(400);
    return;
  }
  res.json(extractUser(user));
};

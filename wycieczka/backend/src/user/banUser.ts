import { prisma } from "../prisma";
import { Request, Response } from "express";

export const banUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: {
      isBanned: true,
    },
  });
  res.json(user);
};

export const unbanUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: {
      isBanned: false,
    },
  });
  res.json(user);
};

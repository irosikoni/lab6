import { prisma } from "../prisma";
import { Request, Response } from "express";

export const getPersistance = async (req: Request, res: Response) => {
  let persistance = await prisma.persistance.findFirst();
  if (!persistance) {
    persistance = await prisma.persistance.create({
      data: {
        type: "SESSION",
      },
    });
  }
  res.json(persistance);
};

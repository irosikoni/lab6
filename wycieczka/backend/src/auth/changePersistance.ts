import { prisma } from "../prisma";
import { Request, Response } from "express";
import { UserRequest } from "../UserRequest";

export const changePersistance = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  console.log(user.userRoles);
  if (!user.userRoles.includes("ADMIN")) {
    res.status(403).send();
    return;
  }
  const { type } = req.body;
  if (typeof type !== "string") {
    res.status(400).json({ message: "Invalid persistance type" });
    return;
  }
  if (type !== "SESSION" && type !== "LOCAL" && type !== "NONE") {
    res.status(400).json({ message: "Invalid persistance type" });
    return;
  }
  try {
    let persistance = await prisma.persistance.findFirst();
    if (!persistance) {
      persistance = await prisma.persistance.create({
        data: { type },
      });
      res.status(201).json(persistance);
    } else {
      persistance = await prisma.persistance.update({
        where: { id: persistance.id },
        data: { type },
      });
    }
    res.status(200).json(persistance);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Updating Failed" });
    return;
  }
};

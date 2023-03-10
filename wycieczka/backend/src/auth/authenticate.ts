import { prisma } from "../prisma";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../UserRequest";
import { User } from "@prisma/client";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  console.log(header);
  const token = header && header.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  if (!process.env.ACCESS_TOKEN_SECRET) {
    res.status(500);
    return;
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user_obj) => {
    if (err) return res.sendStatus(403);
    const user = await prisma.user.findUnique({
      where: { id: (user_obj as User).id },
    });
    if (!user) return res.sendStatus(403);
    (req as UserRequest).user = user;
    next();
  });
};

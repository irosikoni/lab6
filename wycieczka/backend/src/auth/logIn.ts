import { prisma } from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const logIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  console.log(typeof userName);
  if (typeof userName !== "string" || typeof password !== "string") {
    res.status(400).json("userName and password must be strings");
    return;
  }

  const user = await prisma.user.findUnique({
    where: { userName },
  });
  console.log("user", user);
  if (user === null) {
    res.status(400).json("This user does not exist");
    return;
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    res.status(401);
    return;
  }
  console.log("Hello");
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    res.status(500);
    return;
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  res.json({ accessToken, refreshToken });
};

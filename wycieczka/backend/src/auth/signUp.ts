import { prisma } from "../prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { extractUser } from "../user/extractUser";

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  if (typeof userName !== "string") {
    res.status(400).json({ error: "Username must be a string" });
    return;
  }
  if (typeof email !== "string") {
    res.status(400).json({ error: "Email must be a string" });
    return;
  }
  if (typeof password !== "string") {
    res.status(400).json({ error: "Password must be a string" });
    return;
  }
  console.log(req.body);
  const takenUserName = await prisma.user.findUnique({
    where: { userName },
  });
  if (takenUserName !== null) {
    res.status(400).json({ error: "This username is taken!" });
    return;
  }
  const takenEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (takenEmail !== null) {
    res.status(400).json({ error: "You cannot have two accounts!" });
  }
  console.log("salting");
  try {
    console.log("before hashing");
    const salt = await bcrypt.genSalt();
    console.log("after salting");
    console.log(typeof password);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("after hashing");
    const user = await prisma.user.create({
      data: {
        userName,
        email,
        hashedPassword,
      },
    });
    console.log("after creating user");
    res.json(extractUser(user));
  } catch {
    res.status(500).send;
  }
};

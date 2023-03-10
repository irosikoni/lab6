import { Request, Response } from "express";
import { extractUser } from "../user/extractUser";
import { UserRequest } from "../UserRequest";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  res.status(200).json(extractUser(user));
};

import { prisma } from "../prisma";
import { Request, Response } from "express";
import { Role } from "@prisma/client";

export const changeRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userRoles } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }
  if (!validateRoles(userRoles)) {
    return res.status(400).json({ error: "Invalid roles" });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { userRoles },
  });
  res.json(user);
};

const validateRoles = (roles: unknown): roles is Role[] => {
  if (!roles) {
    return false;
  }
  if (!Array.isArray(roles)) {
    return false;
  }

  const validRoles = ["ADMIN", "USER", "MANAGER"];
  const invalidRoles = roles.filter((role) => !validRoles.includes(role));
  if (invalidRoles.length > 0) {
    return false;
  }
  return true;
};

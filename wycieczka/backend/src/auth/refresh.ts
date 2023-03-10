import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export const refresh = async (req: Request, res: Response) => {
  if (process.env.ACCESS_TOKEN_SECRET === undefined) {
    throw new Error("REFRESH_TOKEN_SECRET is undefined");
  }
  const { email, refreshToken } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ success: false, error: "Invalid user" });
  }
  const isValid = verifyRefresh(refreshToken);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token,try login again" });
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return res.status(200).json({ success: true, accessToken });
};

function verifyRefresh(token: string) {
  if (process.env.REFRESH_TOKEN_SECRET === undefined) {
    throw new Error("REFRESH_TOKEN_SECRET is undefined");
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

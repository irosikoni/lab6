import { prisma } from "../prisma";
import { Request, Response } from "express";
import { UserRequest } from "../UserRequest";

export const getTrip = async (req: Request, res: Response) => {
  console.log((req as UserRequest).user);
  const user = (req as UserRequest).user;
  const { id } = req.params;
  const trip = await prisma.trip.findUnique({
    where: { id },
  });
  res.json({ ...trip, rating: 5 });
};

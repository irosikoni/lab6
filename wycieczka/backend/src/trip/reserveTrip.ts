import { Request, Response } from "express";
import { prisma } from "../prisma";
import { UserRequest } from "../UserRequest";

export const reserveTrip = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  const { id } = req.params;
  const trip = prisma.trip.findUnique({
    where: { id },
  });
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  const userOnTrip = await prisma.userOnTrip.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      trip: {
        connect: {
          id,
        },
      },
    },
  });
  res.status(201).json(userOnTrip);
};

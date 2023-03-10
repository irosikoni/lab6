import { prisma } from "../prisma";
import { Request, Response } from "express";

export const deleteTrip = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = await prisma.trip.delete({
    where: { id },
  });
  res.json(trip);
};

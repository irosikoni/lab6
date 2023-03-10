import { prisma } from "../prisma";
import { Request, Response } from "express";

export const getReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Missing trip id");

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: { reviews: true },
  });
  if (!trip) return res.status(404).send("Trip not found");
  return res.status(200).json(trip.reviews);
};

import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getTrips = async (_: Request, res: Response) => {
  const trips = await prisma.trip.findMany();
  res.json(trips.map((trip) => ({ ...trip, rating: 5 })));
};

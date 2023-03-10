import { prisma } from "../prisma";
import { Request, Response } from "express";

export const updateTrip = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    start,
    end,
    photo,
    photo2,
    photo3,
    country,
    unitPrice,
    limit,
    taken,
  } = req.body;
  const trip = await prisma.trip.update({
    where: { id },
    data: {
      name,
      country,
      start,
      end,
      unitPrice,
      limit,
      description,
      photo,
      taken,
      photo2: photo2 ?? null,
      photo3: photo3 ?? null,
    },
  });
  res.json(trip);
};

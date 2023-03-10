import { prisma } from "../prisma";
import { Request, Response } from "express";

export const addTrip = async (req: Request, res: Response) => {
  const {
    name,
    country,
    start,
    end,
    unitPrice,
    limit,
    description,
    photo,
    photo2,
    photo3,
  } = req.body;
  try {
    const trip = await prisma.trip.create({
      data: {
        name,
        country,
        start,
        end,
        unitPrice,
        limit,
        description,
        photo,
        taken: 0,
        photo2,
        photo3,
      },
    });
    res.json({ ...trip, rating: 5 });
  } catch (error) {
    console.log(error);
  }
};

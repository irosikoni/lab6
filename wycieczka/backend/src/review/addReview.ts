import { prisma } from "../prisma";
import { Trip } from "@prisma/client";
import { Request, Response } from "express";
import { UserRequest } from "../UserRequest";

export const addReview = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  if (!user) {
    return res.status(403);
  }
  if (!user.userRoles.includes("USER") && !user.userRoles.includes("MANAGER")) {
    return res.status(403);
  }
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (!rating && !user.userRoles.includes("MANAGER")) {
    res.status(403).send();
    return;
  }
  if (typeof comment !== "string" || typeof rating !== "number") {
    res.status(400).json({ message: "Invalid body" });
    return;
  }
  if (user.isBanned) {
    return res.status(403).json({ message: "User is Banned" });
  }
  const trip = await prisma.trip.findUnique({
    where: { id },
  });
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }
  if (user.userRoles.includes("MANAGER")) {
    await prisma.review.create({
      data: {
        comment,
        trip: { connect: { id } },
        user: { connect: { id: user.id } },
      },
    });
    res.status(201);
    return;
  }
  const userInTrip = await prisma.userOnTrip.findFirst({
    where: { trip_id: id, user_id: user.id },
  });
  if (!userInTrip) {
    return res.status(403).json({ message: "User is not in this trip" });
  }
  //   check if it is past trip
  if (new Date(trip.end) > new Date()) {
    return res.status(403).json({ message: "Trip is not over yet" });
  }
  // create review
  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      trip: { connect: { id } },
      user: { connect: { id: user.id } },
    },
  });
  res.status(201).json(review);
};

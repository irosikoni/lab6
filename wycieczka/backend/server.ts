import express, { Express } from "express";
import dotenv from "dotenv";
import {
  getTrip,
  getTrips,
  addTrip,
  deleteTrip,
  updateTrip,
  reserveTrip,
} from "./src/trip";
import cors from "cors";
import { getUser } from "./src/user/getUser";
import { changeRole } from "./src/user/changeRole";
import { getUsers } from "./src/user/getUsers";
import {
  signUp,
  authenticate,
  logIn,
  refresh,
  getPersistance,
  changePersistance,
} from "./src/auth";
import { getReviews, addReview } from "./src/review";
import { banUser, unbanUser } from "./src/user/banUser";
import { getCurrentUser } from "./src/auth/getCurrentUser";

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/trips/", getTrips);
app.get("/trips/:id", authenticate, getTrip);
app.post("/trips", addTrip);
app.delete("/trips/:id", deleteTrip);
app.put("/trips/:id", updateTrip);

app.get("/trips/:id/reviews", getReviews);
app.post("/trips/:id/reviews", authenticate, addReview);

app.post("/trips/:id/reserve", authenticate, reserveTrip);

app.get("/users/", getUsers);
app.get("/users/:id", getUser);
app.put("/users/:id", changeRole);
app.put("/users/:id/ban", banUser);
app.put("/users/:id/unban", unbanUser);

app.post("/auth/signup", signUp);
app.post("/auth/login", logIn);
app.post("/auth/refresh", refresh);
app.get("/auth/persistance", getPersistance);
app.put("/auth/persistance", authenticate, changePersistance);
app.get("/auth/user", authenticate, getCurrentUser);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

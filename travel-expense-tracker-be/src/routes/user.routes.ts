import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
const router = express.Router();

/* GET home page */
// router.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send({ name: "Mauli" });
// });

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    const newUser = req.body as Record<string, unknown>;
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

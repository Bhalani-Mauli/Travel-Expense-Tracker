import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { isAuthenticated } from "../middleware/jwt.middleware";

interface AuthenticatedRequest extends Request {
  payload?: any; // Add the 'payload' property to the Request
}
const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  const { email, passwordHash, username } = req.body;

  if (email === "" || passwordHash === "" || username === "") {
    res.status(400).json({ message: "Provide email, password, and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(passwordHash)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(passwordHash, salt);

      return User.create({ email, passwordHash: hashedPassword, username });
    })
    .then((createdUser) => {
      if (!createdUser) {
        throw new Error("User not created");
      }

      const { _id, ...user } = createdUser.toObject();
      res.status(201).json({ user });
    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// POST  /auth/login
// ...

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const { email, passwordHash } = req.body;

  // Check if email or password are provided as empty string
  if (!email || !passwordHash) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(
        passwordHash,
        foundUser.passwordHash
      );

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, username } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, username };

        // Create and sign the token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET as string,
          { algorithm: "HS256", expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

// GET  /auth/verify

router.get(
  "/verify",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(`req.payload`, req.payload);

    res.status(200).json(req.payload);
  }
);

export default router;

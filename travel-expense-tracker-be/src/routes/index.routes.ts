import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/* GET home page */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ name: "Mauli" });
});

export default router;

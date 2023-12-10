import express, { Request, Response, NextFunction } from "express";
import Group from "../models/Group.model";
const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { name, members } = req.body;
  Group.create({
    name,
    members,
  })
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((error) => {
      console.log("/POST api/expenses failed due to ", error.message);
      res.status(500).send({
        title: "Error Occured",
        message: error.message || "Something went wrong",
      });
    });
});

export default router;

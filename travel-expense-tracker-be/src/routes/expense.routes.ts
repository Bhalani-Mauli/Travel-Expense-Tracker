import express, { Request, Response, NextFunction } from "express";
import Expense from "../models/expense.model";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";
const router = express.Router();

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).send({
      title: "Invalid ID",
      message: "The group does not exist",
    });
  }
  Expense.find({ groupId: new ObjectId(id) })
    .then((dbExpenses) => {
      res.status(200).send(dbExpenses);
    })
    .catch((error) => {
      console.log("/GET api/expenses failed due to ", error.message);
      res.status(500).send({
        title: "Error Occured",
        message: error.message || "Something went wrong",
      });
    });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { paidBy, amount, currency, description, groupId, split } = req.body;

  Expense.create({
    paidBy,
    amount,
    currency,
    description,
    groupId,
    split,
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

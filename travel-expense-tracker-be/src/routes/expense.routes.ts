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

  Expense.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "paidBy",
        foreignField: "_id",
        as: "userInfo",
      },
    },
  ])
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
  const { paidBy, totalAmount, amountPerUser, currency, description, groupId } =
    req.body;
  Expense.create({
    paidBy,
    totalAmount,
    amountPerUser,
    currency,
    description,
    groupId,
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

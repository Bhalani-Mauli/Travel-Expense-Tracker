import express, { Request, Response, NextFunction } from "express";
import Expense from "../models/expense.model";
import { DBRef, ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";
import Group from "../models/Group.model";
import { isAuthenticated } from "../middleware/jwt.middleware";
import { AuthenticatedRequest } from "./auth.routes";
const router = express.Router();

const updateGroupTotal = async (groupId: string, difference: number) => {
  const group = (await Group.findById(groupId)) as any;
  if (!group) {
    throw Error("Group not found at expense PUT request, please check ID.");
  }

  group.total += difference;
  group.markModified("total");
  await group.save();
};

const calculateDifference = (a: number, b: number) => Math.abs(a - b);

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).send({
      title: "Invalid ID",
      message: "The group does not exist",
    });
  }

  Expense.find({ groupId: id })
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

router.put(
  "/:id",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const {
      paidBy,
      totalAmount,
      amountPerUser,
      currency,
      description,
      groupId,
    } = req.body;
    if (totalAmount || amountPerUser) {
      Expense.findById(id)
        .then(async (dbRes) => {
          if (totalAmount !== dbRes?.totalAmount) {
            const difference = calculateDifference(
              totalAmount,
              dbRes?.totalAmount!
            );

            if (totalAmount < dbRes?.totalAmount!) {
              await updateGroupTotal(groupId, -difference);
            } else if (totalAmount > dbRes?.totalAmount!) {
              await updateGroupTotal(groupId, difference);
            }
          }
        })
        .catch((error) => {
          console.log("/PUT group ", error.message);
          res.status(500).send({
            title: "Error Occured",
            message: error.message || "Something went wrong",
          });
        });
    }

    Expense.findByIdAndUpdate(
      id,
      { paidBy, totalAmount, amountPerUser, currency, description },
      { new: true }
    )
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((error) => {
        console.log("/PUT api/expenses/id failed due to ", error.message);
        res.status(500).send({
          title: "Error Occured",
          message: error.message || "Something went wrong",
        });
      });
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { paidBy, totalAmount, amountPerUser, currency, description, groupId } =
    req.body;

  const group = await Group.findById({ _id: groupId });
  if (!group) throw Error("Cannot find group");
  const splitMemberDb = group?.split;
  group.total! += +totalAmount;
  Object.keys(splitMemberDb).forEach((member) => {
    if (member === paidBy) {
      splitMemberDb[member] += +totalAmount - amountPerUser;
    } else {
      splitMemberDb[member] -= amountPerUser;
    }
  });
  group.markModified("split");
  await group?.save();

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

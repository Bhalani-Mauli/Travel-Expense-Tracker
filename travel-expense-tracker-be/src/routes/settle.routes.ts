import express, { Request, Response, NextFunction } from "express";
import Settle from "../models/settle.model";
import Group from "../models/Group.model";
import simplifyDebts from "../utils/simplifyDebt";
const router = express.Router();

router.post("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { settleTo, settleFrom, settleCurrency, settleAmount } = req.body;
  Settle.create({
    groupId: id,
    settleTo,
    settleFrom,
    settleCurrency,
    settleAmount,
  })
    .then(async (dbRes: any) => {
      const groupRes = await Group.findById({ _id: id });
      if (!groupRes) throw Error("group does not exist");
      const result = groupRes?.split[settleTo] - settleAmount;
      groupRes.split[settleTo] = result;

      const newSettleFromAmount = groupRes?.split[settleFrom] + settleAmount;
      groupRes.split[settleFrom] = newSettleFromAmount;
      groupRes.markModified("split");
      await groupRes?.save();
      res.send(dbRes);
    })
    .catch((error: any) => {
      console.log("/POST api/settle/id failed due to ", error.message);
      res.status(500).send({
        title: "Error Occured",
        message: error.message || "Something went wrong",
      });
    });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Group.findById({ _id: id })
    .then((dbRes) => {
      if (!dbRes) return res.status(204).send();

      res.status(200).send({
        data: simplifyDebts(dbRes.split),
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message ?? "something went wrong" });
    });
});

export default router;

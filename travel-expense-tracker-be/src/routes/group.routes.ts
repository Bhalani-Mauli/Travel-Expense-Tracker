import express, { Request, Response, NextFunction } from "express";
import Group from "../models/Group.model";
import { isAuthenticated } from "../middleware/jwt.middleware";
import { AuthenticatedRequest } from "./auth.routes";
const router = express.Router();

interface LooseObject {
  [key: string]: any;
}

router.get("/", isAuthenticated, (req: AuthenticatedRequest, res: Response) => {
  Group.find({ members: req?.payload?.email })
    .then((dbRes) => {
      res.send(dbRes);
    })
    .catch((error) => {
      console.log("/POST api/groups failed due to ", error.message);
      res.status(500).send({
        title: "Error Occured",
        message: error.message || "Something went wrong",
      });
    });
});

router.get(
  "/:id",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    Group.findById({ _id: id })
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((error) => {
        console.log("/POST api/groups failed due to ", error.message);
        res.status(500).send({
          title: "Error Occured",
          message: error.message || "Something went wrong",
        });
      });
  }
);

router.put(
  "/:id",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, members } = req.body;
    Group.findByIdAndUpdate(id, { name, members }, { new: true })
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((error) => {
        console.log("/PUT api/groups/id failed due to ", error.message);
        res.status(500).send({
          title: "Error Occured",
          message: error.message || "Something went wrong",
        });
      });
  }
);

router.post(
  "/",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const { name, members } = req.body;
    const split = members.reduce((acc: LooseObject, curr: string) => {
      acc[curr] = 0;
      return acc;
    }, {});

    Group.create({
      name,
      members,
      split,
      total: 0,
    })
      .then((dbRes) => {
        res.status(200).send(dbRes);
      })
      .catch((error) => {
        console.log("/POST api/groups failed due to ", error.message);
        res.status(500).send({
          title: "Error Occured",
          message: error.message || "Something went wrong",
        });
      });
  }
);

export default router;

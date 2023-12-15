import { Schema, model } from "mongoose";

const settleSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    settleTo: {
      type: String,
      required: true,
    },
    settleFrom: {
      type: String,
      required: true,
    },
    settleCurrency: {
      type: String,
      required: true,
    },
    settleAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Settle = model("Settle", settleSchema);

export default Settle;

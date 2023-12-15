import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    paidBy: {
      type: Object,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountPerUser: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

export default Expense;

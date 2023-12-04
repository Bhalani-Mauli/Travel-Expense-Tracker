import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  amount: {
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
  split: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      splitAmount: Number,
    },
  ],
});

const Expense = model("Expense", expenseSchema);

export default Expense;

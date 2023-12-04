import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  fromUser: {
    type: String,
    required: true,
    trim: true,
  },
  toUser: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
});

const Expense = model("Expense", expenseSchema);

export default Expense;

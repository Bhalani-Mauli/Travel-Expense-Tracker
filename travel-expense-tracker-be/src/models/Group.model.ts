import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
    },
    members: {
      type: Array,
    },
    split: {
      type: Object,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Group = model("Groups", groupSchema);

export default Group;

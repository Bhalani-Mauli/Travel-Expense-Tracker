import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

export default Group;

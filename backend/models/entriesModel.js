import mongoose from "mongoose";
const entriesSchema = mongoose.Schema(
  {
    issueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entries = mongoose.model("Entries", entriesSchema); // we want to create User model from the userSchema.

export default Entries;

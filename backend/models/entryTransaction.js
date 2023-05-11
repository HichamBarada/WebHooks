import mongoose from "mongoose";
const entryTransactionSchema = mongoose.Schema(
  {
    entry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entries",
    },
    desctiption: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    account: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      reqtuired: true,
    },
  },
  {
    timestamps: true,
  }
);

const EntryTransaction = mongoose.model(
  "EntryTransaction",
  entryTransactionSchema
);

export default EntryTransaction;

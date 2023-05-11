import mongoose from "mongoose";
const incomeSchema = mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Income = mongoose.model("Income", incomeSchema);
export default Income;

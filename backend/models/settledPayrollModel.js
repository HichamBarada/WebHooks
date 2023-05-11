import mongoose from "mongoose";

const settledPayrollSchema = mongoose.Schema(
  {
    payrolls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payroll",
      },
    ],

    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "Approved",
    },
    type: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

const SettledPayroll = mongoose.model("SettledPayroll", settledPayrollSchema);

export default SettledPayroll;

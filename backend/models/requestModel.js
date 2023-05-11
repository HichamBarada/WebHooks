import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },
    method: {
      type: String,
      required: true,
      enum: ["EDIT", "DELETE"],
    },
    incomeId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      ref: "Income",
      default: null,
    },
    expenseId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      ref: "Expense",
      default: null,
    },
    details: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 604800,
    },
  },
  {
    timestamps: true,
  }
);
// Define a custom validator function using ES6 function syntax
const requiredValidator = function (value) {
  if (
    (typeof value !== "mongoose.Schema.Types.ObjectId" && value === null) ||
    value === undefined
  )
    return true;
  else if (typeof value === "mongoose.Schema.Types.ObjectId") return true;
};

requestSchema.path("incomeId").validate(requiredValidator, "it is expense");
requestSchema.path("expenseId").validate(requiredValidator, "it is income");
const Request = mongoose.model("Request", requestSchema);
export default Request;

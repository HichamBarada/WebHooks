import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    accOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accNumber: {
      type: Number,
      required: true,
      unique: true,
      sparse: true,
    },
    accType: {
      type: String,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;

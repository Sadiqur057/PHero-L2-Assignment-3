import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.pre("save", function (next) {
  const currentDate = new Date();
  if (
    this.dueDate < currentDate
  ) {
    const defaultDueDays = 14;
    this.dueDate = new Date(currentDate.getTime());
    this.dueDate.setDate(this.dueDate.getDate() + defaultDueDays);
  }
  next();
});

export const Borrow = model("Borrow", borrowSchema);

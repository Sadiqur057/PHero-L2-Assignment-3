import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBook } from "../interfaces/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook, Model<IBook, {}, BookInstanceMethods>>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: Number,
      unique: [true, "ISBN must be unique"],
      required: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await Borrow.deleteMany({ book: doc._id });
    } catch (error) {
      console.error("Error in post-delete middleware:", error);
    }
  }
});

bookSchema.method("updateAvailability", async function (): Promise<IBook> {
  this.available = this.copies > 0;
  return this.save();
});

export const Book = model<IBook, Model<IBook, {}, BookInstanceMethods>>(
  "Book",
  bookSchema
);

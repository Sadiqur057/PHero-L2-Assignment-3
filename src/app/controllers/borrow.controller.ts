import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response): Promise<any> => {
  const body = req.body;
  try {
    const { book: bookId, quantity, dueDate } = body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    if (book.available === false) {
      return res.status(400).json({
        success: false,
        message: "Book is not available for borrowing",
      });
    }
    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient book quantity available",
      });
    }
    book.copies -= quantity;
    await book.updateAvailability();

    const borrow = await Borrow.create(body);
    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err) {
    const error = err as Error;
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to process borrow request",
      error: {
        name: error.name || "InternalError",
        message: error.message || "Something went wrong",
      },
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const borrowedBooksSummary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooksSummary,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: {
        name: error.name || "InternalError",
        message: error.message || "Something went wrong",
      },
    });
  }
});

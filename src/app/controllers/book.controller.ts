import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.get("/", async (req: Request, res: Response) => {
  const { filter, sort, sortBy, limit } = req.query;
  let query: any[] = [];

  if (filter) {
    query.push({
      $match: {
        genre: { $regex: filter as string, $options: "i" },
      },
    });
  }
  if (sort && sortBy) {
    query.push({
      $sort: {
        [sortBy as string]: sort === "asc" ? 1 : -1,
      },
    });
  } else if (sort) {
    query.push({
      $sort: {
        createdAt: sort === "asc" ? 1 : -1,
      },
    });
  } else {
    query.push({
      $sort: {
        createdAt: -1,
      },
    });
  }
  if (limit) {
    query.push({
      $limit: parseInt(limit as string),
    });
  }else {
    query.push({
      $limit: 10,
    });
  }
  try {
    const books = await Book.aggregate(query);
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: {
        name: err.name || "InternalError",
        message: err.message || "Something went wrong",
      },
    });
  }
});

bookRoutes.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const book = await Book.create(req.body);

    res.json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: {
        name: error.name || "InternalError",
        message: error.message || "Something went wrong",
      },
    });
  }
});

bookRoutes.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: {
        name: error.name || "InternalError",
        message: error.message || "Something went wrong",
      },
    });
  }
});

bookRoutes.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: {
        name: error.name || "InternalError",
        message: error.message || "Something went wrong",
      },
    });
  }
});

bookRoutes.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: {
        name: err.name || "InternalError",
        message: err.message || "Something went wrong",
      },
    });
  }
});

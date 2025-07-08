import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);

app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Library Management API",
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    error: {
      name: "NotFoundError",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});

export default app;

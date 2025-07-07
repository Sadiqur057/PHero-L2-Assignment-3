import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Library Management API",
  });
});

export default app;

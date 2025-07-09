# Library Management API

A RESTful API for managing a library's book collection and borrowing system, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Borrow with due date tracking
- **Filtering & Sorting**: Filter books by genre and sort by various parameters
- **Data Validation**: Input validation using Mongoose schemas
- **RESTful API**: Well-structured API with consistent response formats

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)

## API Endpoints

### Books API

- `GET /api/books`: Get all books (with optional filtering and sorting)
- `POST /api/books`: Create a new book
- `GET /api/books/:id`: Get a book by ID
- `PUT /api/books/:id`: Update a book
- `DELETE /api/books/:id`: Delete a book

### Borrow API

- `POST /api/borrow`: Borrow a book
- `GET /api/borrow`: Borrow books summary

## Data Models

### Book Model

```typescript
interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: number;
  description?: string;
  copies: number;
  available?: boolean;
}
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Sadiqur057/PHero-L2-Assignment-3.git
   cd Assignment-3
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and set DB_URI with your mongoDB connection string

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
src/
  ├── app.ts               # Express app setup
  ├── server.ts            # Server initialization
  ├── app/
      ├── controllers/     # Route controllers
      │   ├── book.controller.ts
      │   └── borrow.controller.ts
      ├── interfaces/      # TypeScript interfaces
      │   ├── book.interface.ts
      │   └── borrow.interface.ts
      ├── models/          # Mongoose models
      │   ├── book.model.ts
      │   └── borrow.model.ts
      └── schemas/         # Schema definitions
          └── book.schema.ts
```
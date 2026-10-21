
# Bookshelf API

A RESTful API for managing book collections, built with
Node.js and Express.js as part of the Dicoding
Back-End Development learning program.

## Features

- Add new books
- Retrieve all books
- Retrieve book details by ID
- Update existing books
- Delete books
- Filter books by name, reading status, and completion status

## Tech Stack

- Node.js
- Express.js
- Nanoid
- Postman

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server runs at http://localhost:9000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /books | Add a book |
| GET | /books | Get all books |
| GET | /books/:bookId | Get book details |
| PUT | /books/:bookId | Update a book |
| DELETE | /books/:bookId | Delete a book |

## Testing

Successfully passed all 104 tests in the
Dicoding Bookshelf API Postman Test Collection.

**Test Results: 104 Passed, 0 Failed**

## Author

Seka Wira Tamma Aji Firdana

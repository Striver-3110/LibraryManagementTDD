# Library Management System

This project is a Library Management System that allows users to add, borrow, return, and view books in a library. The system provides a user-friendly interface to manage book inventory and track available books.

## Getting Started

To get started with the project, first, clone the repository and install the necessary dependencies:

### `git clone <your-repo-url>`
Clone the repository to your local machine.

### `cd <your-repo-name>`
Navigate to the project directory.

### `npm install`
Install all the required dependencies.

## Available API Endpoints

In the project, you can interact with the following API endpoints:

### `POST /api/v1/Book/addNewBook`
Adds a new book to the library's inventory.

**Request Body:**
```json
{
    "title": "Book Title",
    "ISBN": "1234567890",
    "author": "Author Name",
    "availableCopies": 5,
    "available": true,
    "yearOfPublish": 2021
}
```
**Response:**
```json
{
    "message": "Book added successfully",
    "success": true,
    "book": {
        "title": "Book Title",
        "ISBN": "1234567890",
        "author": "Author Name",
        "availableCopies": 5,
        "available": true,
        "yearOfPublish": 2021
    }
}
```


### POST /api/v1/Book/returnBook
Returns a borrowed book to the library.

**Request Body:**

```json
{
    "ISBN": "1234567890"
}
```
**Response:**
```json
{
    "message": "Book returned successfully",
    "updatedBook": {
        "title": "Book Title",
        "ISBN": "1234567890",
        "author": "Author Name",
        "availableCopies": 6,
        "available": true,
        "yearOfPublish": 2021
    }
}
```

### POST /api/v1/Book/borrowBook
Borrows a book from the library.

**Request Body:**

```json
{
    "ISBN": "1234567890"
}
```
**Response:**

```json
{
    "message": "Book borrowed successfully",
    "updatedBook": {
        "title": "Book Title",
        "ISBN": "1234567890",
        "author": "Author Name",
        "availableCopies": 4,
        "available": true,
        "yearOfPublish": 2021
    }
}
```

### GET /api/v1/Book/viewAllBooks
Retrieves a list of all books in the library.

**Response:**

```json
{
    "allBooks": [
        {
            "title": "Book Title",
            "ISBN": "1234567890",
            "author": "Author Name",
            "availableCopies": 5,
            "available": true,
            "yearOfPublish": 2021
        },
        ...
    ]
}
```
### GET /api/v1/Book/viewAvailableBooks
Retrieves a list of books that are currently available for borrowing.

**Response:**

```json
{
    "availableBooks": [
        {
            "title": "Book Title",
            "ISBN": "1234567890",
            "author": "Author Name",
            "availableCopies": 5,
            "available": true,
            "yearOfPublish": 2021
        },
        ...
    ]
}
```

## Test Cases Passed:
![Test Cases Snapshot](./ui/passing-testcases-snapshot.png)

## UI Screenshots

### Home Page
![Home Page](./ui/Home.png)

### Add Book Page
![Add Book Page](./ui/AddBook.png)

### Return Book Page
![Return Book Page](./ui/ReturnBook.png)
const supertest = require("supertest");
require("dotenv").config();
const BookService = require("../../services/BookServices");
const app = require("../../app");
jest.mock("../../services/BookServices");

describe("Book Addition API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await require("mongoose").disconnect();
  });
  // Test for successfully adding a new book
  test("should successfully add a new book", async () => {
    // status-200
    // success-true
    // bookAdded
    // message- the book added successfully
    // bookAdded matches requirements

    const book = {
      ISBN: "111---1111",
      title: "TT1",
      author: "A11",
      available: true,
      availableCopies: 5,
      yearOfPublish: 1999,
    };
    jest.spyOn(BookService, "findBookByISBN").mockResolvedValue(null);
    // mock the addBook function first
    jest.spyOn(BookService, "createBook").mockResolvedValue(book);

    const response = await supertest(app)
      .post("/api/v1/Book/addNewBook")
      .send(book);

    expect(response.statusCode).toBe(200); // book addition success
    expect(response.body).toHaveProperty("newBook");
    expect(response.body.message).toBe("Book added successfully!");
    expect(response.body.success).toBeTruthy();
    expect(response.body.newBook).toEqual(book);
  });

  // Test for attempting to add a book that already exists
  test("should restrict adding a book that already exists", async () => {
    const existingBook = {
      ISBN: "111---1111",
      title: "Strive Your Way",
      author: "Jay",
      yearOfPublish: 2009,
      available: true,
      availableCopies: 10,
    };

    // First, add the book to ensure it exists in the database
    jest.spyOn(BookService, "findBookByISBN").mockResolvedValue(existingBook);

    // Attempt to add the same book again
    const response = await supertest(app)
      .post("/api/v1/Book/addNewBook")
      .send(existingBook);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Book already exists");
  });

  // Test for missing required fields
  test("should return validation error when required fields are missing", async () => {
    const incompleteBook = {
      ISBN: "111---1111", // Missing other required fields
    };

    const response = await supertest(app)
      .post("/api/v1/Book/addNewBook")
      .send(incompleteBook);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation errors");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: expect.any(String),
          path: expect.any(String),
          location: expect.any(String),
        }),
        expect.objectContaining({
          msg: expect.any(String),
          path: expect.any(String),
          location: expect.any(String),
        }),
      ])
    );
  });

  test("should return validation error when incorrect data types are provided", async () => {
    const invalidBook = {
      ISBN: 12345, // Should be a string
      title: "Mystery of the Blue",
      author: "Alice",
      yearOfPublish: "2010", // Should be a number
      available: "true", // Should be a boolean
      availableCopies: "5", // Should be a number
    };

    const response = await supertest(app)
      .post("/api/v1/Book/addNewBook")
      .send(invalidBook);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation errors");
    expect(response.body).toHaveProperty("errors");

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "ISBN must be a string",
          path: "ISBN", // Replace 'param' with 'path'
          location: "body",
          value: 12345,
          type: "field", // Include the 'type' field as per the actual response
        }),
      ])
    );
  });
  // responds within specified time interval
  test("should respond within specified time interval : 1sec", async () => {
    const book = {
      ISBN: "111---1111",
      title: "Strive Your Way",
      author: "Jay",
      yearOfPublish: 2009,
      available: true,
      availableCopies: 10,
    };
    jest.spyOn(BookService, "findBookByISBN").mockResolvedValue(null);
    jest.spyOn(BookService, "createBook").mockResolvedValue(book);

    const startTime = Date.now();
    const response = await supertest(app)
      .post("/api/v1/Book/addNewBook")
      .send(book);
    const endTime = Date.now();

    console.log(response.body);

    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(500);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body).toHaveProperty("newBook");
    expect(response.body.message).toBe("Book added successfully!");
  });

  test("ISBN must be of valid form", async() => {
    const Book = {
      ISBN: "ISBN 123456453",
      title: "Strive Your Way",
      author: "Jay",
      yearOfPublish: 2009,
      available: true,
      availableCopies: 10,
    };

    const response = await supertest(app).post('/api/v1/book/addNewBook').send(Book);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation errors')
    // expect(response.body.errors).toEqual(
    //     // expect.
    // )

  });
  test("ISBN must contain numbers and hyphens", async() => {
    const Book = {
      ISBN: "123---111",
      title: "Strive Your Way",
      author: "Jay",
      yearOfPublish: 2009,
      available: true,
      availableCopies: 10,
    };

    const response = await supertest(app).post('/api/v1/book/addNewBook').send(Book);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book added successfully!')
    expect(response.body.success).toBeTruthy()

  });

});

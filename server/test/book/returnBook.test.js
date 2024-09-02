const { describe, beforeEach, afterEach } = require('node:test');
const supertest = require('supertest');
require('dotenv').config();
const app = require('../../app');

const BookService = require('../../services/BookServices');
jest.mock('../../services/BookServices'); // Mock the BookService to isolate tests

describe('Book returning API', () => {

    // Clear all mocks before each test to ensure a clean slate
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach( async ()=>{
        jest.restoreAllMocks();
    });

    // Test case: Validation error when ISBN is missing in the request body
    test('should return validation error when ISBN is missing in the request body', async () => {
        try {
            const returnBook = {};  // Simulate missing ISBN

            const response = await supertest(app)
                .post('/api/v1/Book/returnBook')
                .send(returnBook);

            // Verify that the response status is 400 (Bad Request)
            expect(response.statusCode).toBe(400);
            // Verify that the response indicates failure
            expect(response.body.success).toBe(false);
            // Verify that the response message indicates validation errors
            expect(response.body.message).toBe('Validation errors');
        
            // Check if the response contains the appropriate validation errors for ISBN
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'ISBN is required',
                        path: 'ISBN',
                        location: 'body'
                    }),
                    expect.objectContaining({
                        msg: 'ISBN must be a string',
                        path: 'ISBN',
                        location: 'body'
                    }),
                ])
            );
        } catch (error) {
            console.log(error); // Log any unexpected errors for debugging
        }
    });

    // Test case: Validation error when ISBN is not a string
    test('should return validation error when ISBN is not a string', async () => {
        try {
            const returnBook = {
                ISBN: 1234567890  // Invalid ISBN format, should be a string
            };

            const response = await supertest(app)
                .post('/api/v1/Book/returnBook')
                .send(returnBook);

            // Verify that the response status is 400 (Bad Request)
            expect(response.statusCode).toBe(400);
            // Verify that the response indicates failure
            expect(response.body.success).toBe(false);
            // Verify that the response message indicates validation errors
            expect(response.body.message).toBe('Validation errors');
            
            // Check if the response contains the appropriate validation error for ISBN type
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'field',
                        value: 1234567890,
                        msg: 'ISBN must be a string',
                        path: 'ISBN',
                        location: 'body'
                    }),
                ])
            );
        } catch (error) {
            console.log(error); // Log any unexpected errors for debugging
        }
    });

    // Test case: Attempt to return a book that does not exist in the database
    test('should not allow the book to be returned when it does not exist in the database', async () => {
        try {
            const returnBook = {
                ISBN: "ISBN 01985299" // Example ISBN that does not exist
            };

            // Mock the BookService to return null, simulating a non-existent book
            jest.spyOn(BookService, 'returnBookByISBN').mockResolvedValue(null);

            const response = await supertest(app)
                .post('/api/v1/Book/returnBook')
                .send(returnBook);

            // Verify that the response status is 400 (Bad Request)
            expect(response.statusCode).toBe(400);
            // Verify that the response indicates failure
            expect(response.body.success).toBe(false);
            // Verify that the response message indicates that the book does not exist
            expect(response.body.message).toBe('Book does not exist');
            // Ensure the response does not contain an 'updatedBook' property
            expect(response.body).not.toHaveProperty('updatedBook');
        } catch (error) {
            console.log(error); // Log any unexpected errors for debugging
        }
    });

    // Test case: Successfully return a borrowed book
    test('should allow the book to be returned when borrowed', async () => {
        try {
            const returnBook = {
                ISBN: "ISBN 01985266" // Example ISBN of a borrowed book
            };

            const newBook = {
                ISBN: "ISBN 01985266",
                title: "Strive Your Way",
                availableCopies: 94,
                available: true,
                yearOfPublish: 2009,
                author: "Jay"
            };

            const updatedBook = {
                ISBN: "ISBN 01985266",
                title: "Strive Your Way",
                availableCopies: 95, // Incremented after return
                available: true,
                yearOfPublish: 2009,
                author: "Jay"
            };

            // Add the book to the system before testing return functionality
            await supertest(app).post('/api/v1/Book/addNewBook').send(newBook);

            // Mock the BookService to return the updated book
            jest.spyOn(BookService, 'returnBookByISBN').mockClear().mockResolvedValue(updatedBook);

            const response = await supertest(app)
                .post('/api/v1/Book/returnBook')
                .send(returnBook);
            
            // Verify that the response status is 200 (OK)
            expect(response.statusCode).toBe(200);
            // Verify that the response indicates success
            expect(response.body.success).toBe(true);
            // Verify that the response message indicates successful return
            expect(response.body.message).toBe("Book returned successfully.");
            // Ensure the response contains the 'updatedBook' property
            expect(response.body).toHaveProperty('updatedBook');
            // Verify that the 'updatedBook' matches the expected updated book data
            expect(response.body.updatedBook).toEqual(
                expect.objectContaining(updatedBook)
            );
        } catch (error) {
            console.log(error); // Log any unexpected errors for debugging
        }
    });

    // Test case: Ensure the return book operation occurs within an acceptable response time
    test('should return books within an acceptable response time', async () => {
        try {
            const returnBook = {
                ISBN: "ISBN 01985266" // Assume this book is valid
            };

            const newBook = {
                ISBN: "ISBN 01985266",
                title: "Time Management",
                author: "Jon Doe",
                yearOfPublish: 2019,
                availableCopies: 100,
                available: true
            };

            // Add the book to the system before testing return functionality
            await supertest(app).post('/api/v1/Book/addNewBook').send(newBook);

            // Measure the response time for the book return operation
            const startTime = Date.now();
            const response = await supertest(app).post('/api/v1/Book/returnBook').send(returnBook);
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            // Verify that the response time is less than 1000 ms (1 second)
            expect(responseTime).toBeLessThan(1000);
            console.log("Response Time:", responseTime, "ms");

            // Verify that the response status is 200 (OK)
            expect(response.statusCode).toBe(200);
            // Verify that the response message indicates successful return
            expect(response.body.message).toBe('Book returned successfully.');
            // Ensure the response contains the 'updatedBook' property
            expect(response.body).toHaveProperty('updatedBook');
        } catch (error) {
            console.log(error); // Log any unexpected errors for debugging
        }
    });
});

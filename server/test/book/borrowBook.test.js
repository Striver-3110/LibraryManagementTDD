const supertest = require('supertest');
require('dotenv').config();

describe('Book Borrowing API', () => {

    // Test for successfully borrowing an available book
    test('should allow the book to be borrowed when available', async () => {
        const borrowBook = {
            ISBN: "ISBN 01985267" // Assume this ISBN refers to an available book
        };
        
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/borrowBook')
            .send(borrowBook);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Book borrowed successfully');
        expect(response.body).toHaveProperty("updatedBook");
    });

    // Test for failing to borrow a book when it's not available
    test('should not allow the book to be borrowed when not available', async () => {
        const borrowBook = {
            ISBN: "ISBN 01985260" // Assume this ISBN refers to an unavailable book
        };
        
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/borrowBook')
            .send(borrowBook);
        
        expect(response.statusCode).toBe(400); // Expecting 400 Bad Request or appropriate status code
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Book does not exist!');
        expect(response.body).not.toHaveProperty("updatedBook");
    });

    // Test for attempting to borrow a non-existent book
    test('should return an error when attempting to borrow a non-existent book', async () => {
        const borrowBook = {
            ISBN: "ISBN 99999999" // Assume this ISBN does not exist in the database
        };
        
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/borrowBook')
            .send(borrowBook);
        
        expect(response.statusCode).toBe(400); // Expecting 404 Not Found or appropriate status code
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Book does not exist!');
        expect(response.body).not.toHaveProperty("updatedBook");
    });

});

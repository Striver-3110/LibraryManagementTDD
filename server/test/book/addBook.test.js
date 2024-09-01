const supertest = require('supertest');
require('dotenv').config();

describe('Book Addition API', () => {

    // Test for successfully adding a new book
    test('should successfully add a new book', async () => {
        const newBook = {
            ISBN: "ISBN 01905250",
            title: "strive your way",
            author: "jay",
            yearOfPublish: 2009,
            available: true,
            availableCopies: 10,
        };

        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(newBook);

            console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Book added successfully!');
        expect(response.body).toHaveProperty('newBook');
    });

    // Test for attempting to add a book that already exists
    test('should restrict adding a book that already exists', async () => {
        const existingBook = {
            ISBN: "ISBN 01985267",
            title: "strive your way",
            author: "jay",
            yearOfPublish: 2009,
            available: true,
            availableCopies: 10,
        };

        // First, add the book to ensure it exists in the database
        await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(existingBook);

        // Attempt to add the same book again
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(existingBook);

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Book already exists');
    });

    // Test for missing required fields
    test('should return an error when required fields are missing', async () => {
        const incompleteBook = {
            ISBN: "ISBN 01985268", // Missing other required fields
        };

        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(incompleteBook);

        expect(response.statusCode).toBe(400); // Expecting 403 Forbidden or appropriate status code
        expect(response.body.success).toBe(false);
        expect(response.body).toHaveProperty('message');
    });
});

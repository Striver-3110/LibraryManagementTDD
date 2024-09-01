const supertest = require('supertest');
require('dotenv').config();
const BookService = require('../../services/BookServices')

describe('Book Addition API', () => {
    
    // Test for successfully adding a new book
    test('should successfully add a new book', async () => {
        const newBook = {
            ISBN: "ISBN 24934252",
            title: "Strive Your Way",
            author: "Jay",
            yearOfPublish: 2009,
            available: true,
            availableCopies: 10,
        };

        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(newBook);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Book added successfully!');
        expect(response.body).toHaveProperty('newBook');
        expect(response.body.newBook).toMatchObject(newBook);
    });

    // Test for attempting to add a book that already exists
    test('should restrict adding a book that already exists', async () => {
        const existingBook = {
            ISBN: "ISBN 01985267",
            title: "Strive Your Way",
            author: "Jay",
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
    test('should return validation error when required fields are missing', async () => {
        const incompleteBook = {
            ISBN: "ISBN 01985268", // Missing other required fields
        };
    
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(incompleteBook);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Validation errors');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String),
                    path: expect.any(String), 
                    location: expect.any(String),
                })
            ])
        );
    });
    

    test('should return validation error when incorrect data types are provided', async () => {
        const invalidBook = {
            ISBN: 12345,  // Should be a string
            title: "Mystery of the Blue",
            author: "Alice",
            yearOfPublish: "2010",  // Should be a number
            available: "true",  // Should be a boolean
            availableCopies: "5"  // Should be a number
        };
    
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/addNewBook')
            .send(invalidBook);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Validation errors');
        expect(response.body).toHaveProperty('errors');
    
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    msg: 'ISBN must be a string',
                    path: 'ISBN',  // Replace 'param' with 'path'
                    location: 'body',
                    value: 12345,
                    type: 'field'  // Include the 'type' field as per the actual response
                }),
            ])
        );
        
    });
    
    
    
    
    
});

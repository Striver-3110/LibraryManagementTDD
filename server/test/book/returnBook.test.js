const { describe } = require('node:test');
const supertest = require('supertest');
require('dotenv').config();

describe('Book returning API', () => {
    
    // Test for successfully returning a borrowed book
    test('should allow the book to be returned when borrowed', async () => {
        const returnBook = {
            ISBN: "ISBN 01985267"
        };
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/returnBook')
            .send(returnBook);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Book returned successfully.");
        expect(response.body).toHaveProperty('updatedBook');
    });
    
    // Test for book not existing in the database
    test('should not allow the book to be returned when it does not exist in the database', async () => {
        const returnBook = {
            ISBN: "ISBN 01985299"
        };

        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/returnBook')
            .send(returnBook);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Book does not exist');
    });
    
    // Test for missing ISBN in the request body
    test('should return validation error when ISBN is missing in the request body', async () => {
        const returnBook = {};  // Missing ISBN
    
        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/returnBook')
            .send(returnBook);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Validation errors');
    
        // Check if the response contains the required and the string validation errors
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
                })
            ])
        );
    });
    
    
    // Test for invalid ISBN format (e.g., not a string)
    test('should return validation error when ISBN is not a string', async () => {
        const returnBook = {
            ISBN: 1234567890  // Invalid ISBN format, should be a string
        };

        const response = await supertest(process.env.APP)
            .post('/api/v1/Book/returnBook')
            .send(returnBook);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Validation errors');
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    msg: 'ISBN must be a string',
                    path: 'ISBN',
                    location: 'body',
                    value: 1234567890,
                    type: 'field',
                }),
            ])
        );
    });
});

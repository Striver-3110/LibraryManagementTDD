const { describe } = require('node:test');
const supertest = require('supertest');
require('dotenv').config();

describe('Book returning API', ()=>{
    // Test for successfully returning a borrowed book
    test('should allow the book to be returned when borrowed',async () => {
        const returnBook = {
            ISBN:"ISBN 01985267"
        }
        const response = await supertest(process.env.APP).post('/api/v1/Book/returnBook').send(returnBook);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Book returned successfully.")
    })
    
    test('should not allow the book to be returned when does not exists on the database',async () =>{
        const returnBook = {
            ISBN:"ISBN 01985299"
        }

        const response = await supertest(process.env.APP).post('/api/v1/Book/returnBook').send(returnBook)
        expect(response.statusCode).toBe(400)
        expect(response.body.success).toBe(false)
        expect(response.body).toHaveProperty('message')
    })
})

const supertest = require('supertest')
require('dotenv').config();

describe('View available book API',()=>{
    // returns all the available books
    test('should return all the available books', async () =>{
        const response = await supertest(process.env.APP).get('/api/v1/Book/viewAvailableBooks')
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('All the available books returned successfully')
        expect(response.body).toHaveProperty('availableBooks')
    })
})
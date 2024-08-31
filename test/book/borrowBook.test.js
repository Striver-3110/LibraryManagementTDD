const supertest = require('supertest');
require('dotenv').config();

test('should handle POST request to /borrowBook',async()=>{
    // console.log(process.env.APP)
    const borrowBook = {
        ISBN:"ISBN 01985260"
    }
    const response = await supertest(process.env.APP).post('/api/v1/Book/borrowBook').send(borrowBook);
    // console.log(response.body)
    expect(response.statusCode).toBe(200);
    // expect(response.body.success).toBe(true);
    // expect(response.body.message).toBe('Book borrowed successfully')
    // expect(response.body).toHaveProperty("updatedBook");
})

test('allow the book to be borrowed when available', async () =>{
    const borrowBook = {
        ISBN:"ISBN 01985260"
    }
    const response = await supertest(process.env.APP).post('/api/v1/Book/borrowBook').send(borrowBook)
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Book borrowed successfully')
    expect(response.body).toHaveProperty("updatedBook");
})
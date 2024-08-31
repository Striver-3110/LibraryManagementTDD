const supertest = require('supertest')
const APP = 'http://localhost:5001'


test('should handle POST request to /addBook', async()=>{
    const newBook = {
        ISBN: "ISBN 01985266",
        title: "strive your way",
        author: "jay",
        yearOfPublish: 2009,
        available: true,
        availableCopies: 10,
    };

    const response = await supertest(APP).post('/api/v1/Book/addNewBook').send(newBook);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('book');
})
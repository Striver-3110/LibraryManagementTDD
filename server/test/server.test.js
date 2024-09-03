const supertest = require('supertest');
const { describe } = require('node:test');

const APP = 'http://localhost:5001';

describe('server is running properly',()=>{
    // should respond to the GET request at the root url
    test('should respond to the GET request at the root url',async()=>{
        const response = await supertest(APP).get('/');
        // failing test case passed
        expect(response.statusCode).toBe(200);
    })
})

// should return 404 for a non-existent route
test('should return 404 for a non-existent route', async () => {
    const response = await supertest(APP).get('/non-existent-route');
    expect(response.statusCode).toBe(404);
});
const supertest = require('supertest');
const express = require('express');
const { describe } = require('node:test');
const { request } = require('http');

describe('server is running properly',()=>{
    let app;

    beforeAll(()=>{
        // Initialize the express app
        app = express();
    })
    
    // 
    test('should respond to the GET request at the root url',async()=>{
        const response = await supertest('http://localhost:5001').get('/');

        // failing test case
        expect(response.statusCode).toBe(200);
    })
})


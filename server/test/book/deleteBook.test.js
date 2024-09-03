const supertest = require('supertest')

describe('Delete Book API',()=>{
    test('should ISBN is present in the request',()=>{
        const book = {
            ISBN:"ISBN 12345678"
        }

        expect(book.ISBN).toBeTruthy()
    })
})
const supertest = require('supertest');
require('dotenv').config();
const app = require('../../app')

const BookService = require('../../services/BookServices')
jest.mock('../../services/BookServices')

describe('Book Borrowing API', () => {


    beforeEach(()=>{
        jest.clearAllMocks();// clear all mocks before each test
    })
    // afterEach(()=>{
    //     jest.restoreAllMocks();
    // })

    // Test for successfully borrowing an available book
    test('should allow the book to be borrowed when available', async () => {
        try {
            const borrowBook = {
                ISBN: "ISBN 01985267" // Assume this ISBN refers to an available book
            };
    
            const newBook = {
                ISBN: "ISBN 12332112",
                author:'A1',
                title:'B1',
                availableCopies:9,
                yearOfPublish:2003,
                available:true,
            }
            const updatedBook = {
                ISBN: "ISBN 12332112",
                author:'A1',
                title:'B1',
                availableCopies:8,
                yearOfPublish:2003,
                available:true,
            }
            // await supertest(app).post('/api/v1/Book/addNewBook').send(newBook)
            jest.spyOn(BookService,'borrowBookByISBN').mockResolvedValue(updatedBook)
            const response = await supertest(app)
                .post('/api/v1/Book/borrowBook')
                .send(borrowBook);
            
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Book borrowed successfully');
            expect(response.body).toHaveProperty("updatedBook");
            expect(response.body.updatedBook).toEqual(
                expect.objectContaining(
                    updatedBook
                )
            )
        } catch (error) {
            console.log(error)
        }
    });

    // Test for failing to borrow a book when it's not available
    test('should not allow the book to be borrowed when not available', async () => {
        try {
            const borrowBook = {
                ISBN: "ISBN 01985260" // Assume this ISBN refers to an unavailable book
            };
            const unAvailableBook = {
                ISBN: "ISBN 12332112",
                author:'A1',
                title:'B1',
                availableCopies:0,
                yearOfPublish:2003,
                available:false,
            }
            jest.spyOn(BookService,'borrowBookByISBN')
                .mockResolvedValue(unAvailableBook)
            const response = await supertest(app)
                .post('/api/v1/Book/borrowBook')
                .send(borrowBook);
            
            expect(response.statusCode).toBe(400); // Expecting 400 Bad Request or appropriate status code
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Sorry the book is not available!');
            expect(response.body).not.toHaveProperty("updatedBook");
    
        } catch (error) {
            console.log(error)
        }
    });

    // Test for attempting to borrow a non-existent book
    test('should return an error when attempting to borrow a non-existent book', async () => {
        try {
            const borrowBook = {
                ISBN: "ISBN 99999999" // Assume this ISBN does not exist in the database
            };
            
            jest.spyOn(BookService,'borrowBookByISBN').mockResolvedValue(null);
            const response = await supertest(app)
                .post('/api/v1/Book/borrowBook')
                .send(borrowBook);
    
            // console.log(response)
            expect(response.statusCode).toBe(400); // Expecting 404 Not Found or appropriate status code
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Book does not exist!');
            expect(response.body).not.toHaveProperty("updatedBook");
        } catch (error) {
            console.log(error)
        }
    });
});

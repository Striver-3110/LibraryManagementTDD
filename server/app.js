//? imports
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const BookRoutes = require('./Routes/BookRoute');
const UserRoutes = require('./Routes/UserRoute');
const { connectToMongo } = require('./config/database');

//? Middleware to parse JSON bodies
app.use(express.json());
app.use(require('cors')());

//? Database connection
connectToMongo();

//? API routes
app.use('/api/v1/Book', BookRoutes);
app.use('/api/v1/User', UserRoutes);

//? Root route
app.get('/', (req, res) => {
    return res.status(200).send('Hello from server');
});

//? Middleware to handle 404 errors for non-existent routes
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


if(process.env.NODE_ENV !== 'test')
    {
        const start = () => {
            try {
                app.listen(PORT, () => {
                    console.log(`app is running at port : ${PORT}`);
                });
            } catch (error) {
                console.log(error);
            }
        }
        
        start();
    }
//? Start the server


module.exports = app;

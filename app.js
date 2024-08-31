// initialize express app
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const BookRoutes = require('./Routes/BookRoute')



// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/v1/Book',BookRoutes);


app.get('/',(req,res)=>{
    return res.status(200).send('Hello from server')
})

// Middleware to handle 404 errors for non-existent routes
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const start = () =>{
    try {
        app.listen(PORT,()=>{
            console.log(`app is running at port : ${PORT}`)
        })
    } catch (error) {
        console.log(error)   
    }
}



start();

module.exports = app
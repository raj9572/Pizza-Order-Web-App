require('dotenv').config()
const express = require('express')
const middleware = require('./middleware/middleware')
require('colors')
 const connectDB = require("./config/config")
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 4000



// middleware 

app.use(express.json())
app.use(morgan('dev'))


// route

app.use('/api/pizzas',require("./routes/pizzaRoute"))
app.use('/api/user',require("./routes/userRoute"))
app.use('/api/orders',require("./routes/orderRoute"))


app.listen(port, () => {
    connectDB()
  console.log(`server running on ${process.env.NODE_ENV} ${port}`.bgMagenta.white)
})
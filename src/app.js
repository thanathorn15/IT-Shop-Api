require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const authRoute = require("./routes/authRoute");

const notFoundMiddleware = require('./middlewares/notfound')
const errorMiddleware = require('./middlewares/error')

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'))
}


app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/auth", authRoute);

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 8000;
app.listen(port,() => console.log('server running on port' + port))
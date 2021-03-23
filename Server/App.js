const express = require('express');
const bookRouter = require('./Routes/Book')
require('./boot/dbConnection');
const app = express();

/* Environment variables */
const PORT = process.env.PORT || 3000


/** MiddleWares */

app.use(express.json())
app.use(express.urlencoded)
app.use((req, res, next) => {
    console.log(`${new Date()} -- ${req.method} -- ${req.url}`);
    next();
})

/** Routes */
app.use('/book', bookRouter)


/** Started Services */

app.listen(PORT, (err) => {
    if (!err) return console.log(`Server Started at PORT ${PORT}`);
})


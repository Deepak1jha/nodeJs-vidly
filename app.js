const express = require('express');
const config = require('config');
const logger = require('morgan');
const helmet = require('helmet');
const bookRouter = require('./routes/book/bookRoute')
const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api/books',bookRouter);

if (app.get(`env`) === `development`) {
    console.log(config.get('name'));
    app.use(logger('dev'));
}
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listing to this port => ${port}`)
})
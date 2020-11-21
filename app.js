// const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

/*
 view engine setup
*/

const books = [
    {id: "1", name: "book name 1"},
    {id: "2", name: "book name 2"},
    {id: "3", name: "book name 3"},
    {id: "4", name: "book name 4"},
    {id: "5", name: "book name 5"},
]
// app.set('view engine', 'pug');
const app = express();
app.use(express.json());
app.use(helmet())
if (app.get(`env`)==='development'){
    app.use(logger('dev'));
}
// app.set('views', path.join(__dirname, 'views'));

app.get('/books/:id', (req, res) => {
    console.log(req.params)
    const book = books.find(item => item.id === req.params.id);
    if (!book){
        res.status(404).send("Cant find any book with this id");
    }
    res.send(book)
})

app.post('/books',((req, res) => {
    console.log("--------------")
    console.log(req.body.book)
    res.send("POST METHOD")
}))
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listing to this port => ${port}`)
})
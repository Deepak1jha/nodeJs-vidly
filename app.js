const express = require('express');
const config = require('config');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const bookRouter = require('./routes/book/bookRoute')
const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api/books', bookRouter);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to mongoDb database"))
    .catch((error) => {
        console.error("cant connect to mongoDB", error);
    });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    category: {
        type: String,
        required: true,
        enum: ['Java', 'Javascript', 'React']
    },
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
});

const Course = mongoose.model('course', courseSchema);
const courseObj = new Course({
    name: "NodeJs",
    author: "Deepak",
    category: "Java",
    tags: ["Advance", "Basic"],
    isPublished: true
});
try {
    // courseObj.save().then(res => console.log(res));
} catch (ex) {
    console.log(ex)
}
if (app.get(`env`) === `development`) {
    console.log(config.get('name'));
    app.use(logger('dev'));
}
const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`Listing to this port => ${port}`)
})
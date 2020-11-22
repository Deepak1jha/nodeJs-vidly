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

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));
const Course = mongoose.model('course', new mongoose.Schema({
    name: String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Author
    }
}));

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     category: {
//         type: String,
//         required: true,
//         enum: ['Java', 'Javascript', 'React']
//     },
//     date: {type: Date, default: Date.now()},
//     isPublished: Boolean
// });
async function createAuthor(name, bio, website) {
    const author = new Author({name, bio, website});
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}

async function getCourseList() {
    const courses = await Course
        .find()
        // .populate('author')
        .select('name author');
    console.log(courses);
}

const courseObj = new Course({
    name: "NodeJs",
    author: "Deepak",
    category: "Java",
    tags: ["Advance", "Basic"],
    isPublished: true
});
try {
    // courseObj.save().then(res => console.log(res));
    // createAuthor('deepak','student',"deepak1jha.github.io");
    // createCourse("Java","5fba25aa803ce167451c7d42");
    getCourseList();
} catch (ex) {
    console.log(ex)
}

if (app.get(`env`) === `development`) {
    console.log(config.get('name'));
    app.use(logger('dev'));
}
const port = process.env.PORT || 2072
app.listen(port, () => {
    console.log(`Listing to this port => ${port}`)
})
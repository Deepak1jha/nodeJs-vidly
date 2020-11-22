const express = require('express');
const config = require('config');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const bookRouter = require('./routes/book/bookRoute');
const authRouter = require('./routes/auth/authRoute');
const userRouter = require('./routes/user/userRoute');
const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to mongoDb database"))
    .catch((error) => {
        console.error("cant connect to mongoDB", error);
    });

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const courseSchema = new mongoose.Schema({
    name: String,
    author: authorSchema
});
const Course = mongoose.model('course', courseSchema);

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
    // createCourse("Java emb",new Author({name:"Deepaak"}));
    // getCourseList();
} catch (ex) {
    console.log(ex)
}

if (app.get(`env`) === `development`) {
    console.log(config.get('name'));
    app.use(logger('dev'));
}
const port = process.env.PORT || 2022
app.listen(port, () => {
    console.log(`Listing to this port => ${port}`)
})
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const books = [
    {id: "1", name: "book name 1"},
    {id: "2", name: "book name 2"},
    {id: "3", name: "book name 3"},
    {id: "4", name: "book name 4"},
    {id: "5", name: "book name 5"},
]

router.get('/:id', auth, async (req, res, next) => {
    try {
        const book = await books.find(item => item.id === req.params.id);
        if (!book) {
            res.status(404).send("Cant find any book with this id");
        }
        res.send(book);
    } catch (e) {
        next(e);
    }
});

router.get('/', (req, res) => {
    res.send(books)
});

router.post('/', ((req, res) => {
    res.send("POST METHOD")
}));

module.exports = router;
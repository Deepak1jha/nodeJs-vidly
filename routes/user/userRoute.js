const express = require('express');
const router = express.Router();
const User = require('../../model/user/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/register', (async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already Exist");
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
}));

module.exports = router;
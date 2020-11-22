const express = require('express');
const router = express.Router();
const User = require('../../model/user/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth/auth');

router.post('/register', (async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already Exist");
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = jwt.sign({_id: user._id}, config.get('secretKey'));
    await user.save();
    res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email']));
}));

router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;
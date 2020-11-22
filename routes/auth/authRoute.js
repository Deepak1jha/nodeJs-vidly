const express = require('express');
const router = express.Router();
const User = require('../../model/user/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Invalid username and password");
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Invalid username and password");
    res.send(true);
});

module.exports = router;
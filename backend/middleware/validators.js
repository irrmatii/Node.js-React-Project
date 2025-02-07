const usersInfo = require("../modules/functions");

module.exports = {

    validateUser: function (req, res, next) {

        const {email, username, password, password2 } = req.body;
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const users = usersInfo.getUsers();

        const userExists = users.find(user => user.username === username)

        if (!pattern.test(email)) return res.status(400).send({message: 'Invalid email', error: true});
        if (userExists) return res.status(400).send({message: 'User already exist', error: true});
        if (!username) return res.status(400).send({message: 'Username is required', error: true});
        if (username[0]!== username[0].toUpperCase()) return res.status(400).send({message: 'Username should start with upper letter', error: true});
        if (!password  || !password2) return res.status(400).send({message: 'Password is required', error: true});
        if (username.length < 4) return res.status(400).send({message: 'Username is too short', error: true});
        if (username.length > 15) return res.status(400).send({message: 'Username is too long', error: true});
        if (password.length < 5) return res.status(400).send({message: 'Password is too short', error: true});
        if (password !== password2) return res.status(400).send({message: 'Passwords does not match', error: true});
        if (Object.keys(req.body).length > 4) return res.status(400).send({message: 'Object has too much keys', error: true});


        next()
    },

    validateLogin: function (req, res, next) {

        const { username} = req.body;
        const users = usersInfo.getUsers();

        const userExists = users.find(user => user.username === username)

        if (!userExists) return res.status(400).send({message: 'User does not exist', error: true});

        next()
    },

    validateMessage: function (req, res, next) {
        const { to, text } = req.body;

        if (!to) return res.status(400).send({message: 'Receiver must be selected', error: true});
        if (!text) return res.status(400).send({message: 'Text field can not be empty', error: true});

        next()
    }

}
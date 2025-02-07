const usersInfo = require("../modules/functions")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    getUsers: (req, res) => {
        res.send(usersInfo.getUsers());
        console.log("Users info sent");
    },

    getIcons: (req, res) => {
        res.send(usersInfo.showUserIcons());
        console.log("icon info sent", usersInfo.showUserIcons());
    },

    getAllIcons: (req, res) => {
        res.send(usersInfo.getIcons());
        console.log("icon info sent", usersInfo.showUserIcons());
    },


    register: (req, res) => {

        const {email, username, password} = req.body;

        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {

                console.log(hash);
                usersInfo.addUser({email, username, password: hash})

                /*Add random icons for each new user*/
                const AllIcons = usersInfo.icons();
                const randomIcons = [];

                for (let i = 0; i < 10; i++) {
                    let icon;
                    // Get a random icon and ensure it's unique in the array
                    do {
                        icon = AllIcons[usersInfo.randomIndex(AllIcons)];
                    } while (randomIcons.includes(icon)); // If icon is already in the array, try again

                    randomIcons.push(icon);
                }

                usersInfo.addIcons({username, icons: randomIcons});

                res.send({message: 'User registered successfully'});
                console.log("registered successfully", usersInfo.getUsers(), usersInfo.getIcons())
            })
        })
    },


    logIn: (req, res) => {

        const { username, password} = req.body;
        const users = usersInfo.getUsers();
        const Allicons = usersInfo.getIcons();

        const userExists = users.find(user => user.username === username)
        if (!userExists) return res.status(400).send({message: 'User does not exist', error: true});

        const iconExists = Allicons.find(icon => icon.username === username)
        if (!iconExists) return res.status(400).send({message: 'Icons does not exist', error: true});

        const {icons} = iconExists

        bcrypt.compare(password, userExists.password, (err, result) => {
            console.log(result);
            if (!result) return res.send({message: 'Incorrect password'});

            let copyUser = {...userExists}

            delete copyUser.password;
            const token = jwt.sign(copyUser, process.env.SECRET_KEY)

            usersInfo.getOnlineUsersIcons(icons)

            console.log(token, usersInfo.showUserIcons())
            return res.send({message: 'User logIn successfully', token, username});
        })
    },

    createPost: (req, res) => {

        const {color, id, user } = req.body;

        usersInfo.addPost({color, id, username: user.username})

        return res.send({
            message: "Post created successfully",
            allCards: usersInfo.getPosts(),
        });
    },

    getPosts: (req, res) => {
        res.send(usersInfo.getPosts());
        console.log("Posts received");
    },

    deletePost: (req, res) => {

        const posts = usersInfo.getPosts();
        const { id, user } = req.body
        const ownersUsername = user.username

        const postExists = posts.find(post => post.id === id)

        if (!postExists) return res.status(400).send({message: 'Post does not exist', error: true});

        if (postExists.username !== ownersUsername){
            return res.status(400).send({message: 'This is not your post', error: true});
        }

        const updatedPosts = posts.filter(post => post.id !== id);
        usersInfo.replacePost(updatedPosts);

        return res.send({
            message: "Post deleted successfully",
            allCards: updatedPosts,
        });
    },


    message: (req, res) => {

        usersInfo.addMessage(req.body)

        res.send({message: 'Message was sent'})
        console.log("Message was sent", req.body)
    },

    getMessage: (req, res) => {
        res.send(usersInfo.getMessage());
        console.log("Message received");
    },

    visitprofile: (req, res) => {
        const { username } = req.params;
        const Allicons = usersInfo.getIcons();

        const iconExists = Allicons.find(icon => icon.username === username)

        if (!iconExists) return res.status(400).send({message: 'Icons does not exist', error: true});

        res.send(iconExists)
        console.log(iconExists)
    },

    sendRequest: (req, res) => {
        usersInfo.addRequest(req.body)

        res.send({message: 'Request was sent'})
        console.log("Request was sent", req.body)
    },

    getRequest: (req, res) => {

        res.send(usersInfo.getRequest());
        console.log("Request received");
    },

    acceptRequest: (req, res) => {
        const { id, username, icon } = req.body
        const AllRequests = usersInfo.getRequest()
        const AllIcons = usersInfo.getIcons()

        const findRequest = AllRequests.filter(request => request.id !== id)
        if (!findRequest) return res.status(400).send({message: 'Icon id was not found', error: true});

        const findUser = AllIcons.find(user => user.username === username)
        if (!findUser) return res.status(400).send({message: 'User was not found', error: true});

        usersInfo.replaceRequest(findRequest)

    //     add Icon to user
        icon.forEach(icons => {
            findUser.icons.push(icons)
        })

        const newIcons = AllIcons.filter(user => user.username !== username)
        newIcons.push(findUser)
        const finalIcons = newIcons

        usersInfo.replaceIcons(finalIcons)

        res.send({message: 'Icon was sent', requestsSent: usersInfo.getRequest()})
        console.log(usersInfo.getIcons, findUser)
    },


    declineRequest: (req, res) => {
        const { id } = req.body
        const AllRequests = usersInfo.getRequest()

        const findRequest = AllRequests.filter(request => request.id !== id)
        if (!findRequest) return res.status(400).send({message: 'Icon id was not found', error: true});

        usersInfo.replaceRequest(findRequest)

        res.send({message: 'Icon request was deny', requestsSent: usersInfo.getRequest()})
        console.log('Icon request was deny')
    }

}
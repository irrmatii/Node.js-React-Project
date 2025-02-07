const express = require('express');
const router = express.Router();


const {
    getUsers,
    register,
    logIn,
    message,
    getMessage,
    createPost,
    getPosts,
    deletePost,
    getIcons,
    visitprofile,
    sendRequest,
    getRequest,
    acceptRequest,
    declineRequest,
    getAllIcons
} = require('../controllers/mainController')

const {
    validateUser,
    validateLogin,
    validateMessage
} = require('../middleware/validators')

const
    userAuth
= require('../middleware/userAuth')

router.get('/users', getUsers)

router.get('/AllIcons', getAllIcons)

router.post('/register', validateUser, register)

router.post('/logIn', validateLogin, logIn)

router.post('/sendMessage', validateMessage, message)

router.get('/message', getMessage)

router.post('/createCard', userAuth , createPost)

router.get('/colorCards',  getPosts)

router.delete('/deletePost', userAuth, deletePost)

router.get('/icons', getIcons)

router.get('/users/:username', visitprofile)

router.post('/sendRequest', sendRequest)

router.get('/request', getRequest)

router.post('/acceptRequest', acceptRequest)

router.post('/declineRequest', declineRequest)



module.exports = router;

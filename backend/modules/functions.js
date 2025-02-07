let users = [];
let messages = [];
let posts = [];
let usersIcons = []
let onlineUsersIcons = []
let requests = []

module.exports = {
    getUsers: () => users,
    addUser: (user) => users.push(user),

    getMessage: () => messages,
    addMessage: (message) => messages.push(message),

    getPosts: () => posts,
    addPost: (post) => posts.push(post),
    replacePost: (post) => posts = post,

    icons : () => [
        "🤖", "🦄", "🌈", "🚴", "🎸",
        "🍔", "🥑", "🌞", "🎃", "🐱",
        "🧩", "🚀", "🎭", "🕹️", "✈️",
        "🐉", "⚽", "🎨", "🍉", "🏄",
        "🍩", "🦖", "🌊", "🛸", "🌺",
        "🍒", "🐙", "☃️", "🛷", "🌵"
    ],
    getIcons: () => usersIcons,
    addIcons: (icon) => usersIcons.push(icon),
    replaceIcons: (icon) => usersIcons = (icon),
    getOnlineUsersIcons: (icon) => onlineUsersIcons = (icon),
    showUserIcons: () => onlineUsersIcons,
    randomIndex: (icons) => Math.floor(Math.random() * icons.length),

    getRequest: () => requests,
    addRequest: (request) => requests.push(request),
    replaceRequest: (request) => requests = request,

};
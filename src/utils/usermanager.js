const users = []

const addUser = ({ id, username }) => {

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username }
    users.push(user)

    return {
        user 
    }
}

const getUsers = () => {
    
    return users;
}

const getUsersById = (socketId) => {

    console.log(socketId)

    // console.log(users.filter((user) => user.id !== socketId))

    return users.filter((user) => user.id !== socketId);
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getSocketId = (username) => {
    return users.find((user) => user.username === username)
}

const getTotalConnectedUsers = () => {
    return users.length - 1;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getTotalConnectedUsers,
    getUsers,
    getUsersById,
    getSocketId
}
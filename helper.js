const fs = require('fs');

function getUsers() {
    const usersStr = fs.readFileSync('./users.json', 'utf-8');

    const users = JSON.parse(usersStr);

    return users;
}

module.exports = {
    getUsers,
};

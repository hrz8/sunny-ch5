const express = require('express');
const { getUsers } = require('./helper');

const server = express();

server.set('view engine', 'ejs');
server.set('views', 'public');

server.use(express.json());
server.use('/static', express.static('public/static'));

server.get('/', function(req, res) {
    // res.sendFile(`public/chapter3.html`, { root: __dirname });
    res.render(`chapter3.ejs`, {
        headerText: 'PLAY TRADITIONAL GAME',
        headerSubText: 'Experience new traditional game play',
    });
});

server.get('/game', function(req, res) {
    res.sendFile(`public/chapter4.html`, { root: __dirname });
});

server.get('/test', function(req, res) {
    const { name } = req.query;
    const users = getUsers();

    const result = users.map(function(user) {
        return {
            username: user.username,
        }
    });
    
    res.render('test.ejs', {
        name,
        lain: 'non abstrak',
        users: result,
    });
    // res.sendFile(`public/test.html`, { root: __dirname });
    // res.send(`
    //     <html>
    //         <body>
    //             <h1>Hello, ${name}</h1>
    //         </body>
    //     </html>
    // `);
});

server.get('/api/v1/accounts', function(req, res) {
    const users = getUsers();

    const result = users.map(function(user) {
        return {
            username: user.username,
        }
    });

    res.json(result);
});

server.post('/api/v1/accounts/login', function(req, res) {
    const { username, password } = req.body;

    const users = getUsers();

    const found = users.find(function(user) {
        return user.username === username;
    });

    if (found) {
        const passwordMatch = found.password === password;

        if (!passwordMatch) {
            res.status(400);
            res.json({
                error: 'password or user is wrong'
            });
        } else {
            res.json({
                id: found.id
            });
        }
    } else {
        res.status(400);
        res.json({
            error: 'password or user is wrong'
        });
    }
});

server.listen(4000);

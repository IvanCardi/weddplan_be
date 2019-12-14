const http = require('http');
const app = require('./app');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Listening on port: ' + port);
    //console.log(process.env.USER_ID);
});
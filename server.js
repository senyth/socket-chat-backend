/**
 * Name:          Server.js
 * Description:   Starting point of the application
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
let express = require('express');
let mongoose = require('mongoose');
let bluebird = require('bluebird');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');
let socketMVC = require('socket.mvc');

const app = express();
let config = require('./config');
let {host, dbport, name:dbName, user:dbuser, pass:dbpass} = config.db;
let port = config.app.port;
let apis = require('./routes/api');

let dbConnection = dbuser ? `mongodb://${dbuser}:${dbpass}@${host}:${dbport}/${dbName}` :
                            `mongodb://${host}:${dbport}/${dbName}`;

// set promise
mongoose.Promise = bluebird;

// initialize mongodb
mongoose.connect(dbConnection, { useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
    console.log('Connected to ' + dbName + ' database...');
  }).on('disconnected', () => {
    console.log('Connection disconnected!');
  }).on('reconnected', () => {
    console.log('Connection reconnected!');
  }).on('error', (err) => {
    console.log('Connection error : ' + err);
    mongoose.disconnect();
  });

// set body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

// Set CORS ORIGIN HEADERS
app.use(cors({
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
}));

app.use('/api', apis);

const server = app.listen(port, (err) => { 
    if(err) {
        console.log("Error connecting to port. " + err);
    } else {
        console.log('Running on port ' + port);
    }
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socketMVC.init(io, socket, {
      debug: true,
      filePath: ['./routes/api/socket.route.js']
  });
});
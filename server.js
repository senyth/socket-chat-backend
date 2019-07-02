let express = require('express');
let mongoose = require('mongoose');
let bluebird = require('bluebird');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');
// let client = require('socket.io').listen(4000).sockets;
// let io = require('socket.io').listen(4000);
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

    // connect to socket.io
    // client.on('connection', function(socket) {
    //   let chat = dbName.collection('chats');

    //   sendStatus = function(status) {
    //     socket.emit('status', status);
    //   }
  
    //   chat.find().limit(100).sort({_id: 1}).toArray(function(err, res) {
    //     if (err) {
    //       throw err;
    //     }
  
    //     socket.emit('output', res);
    //   });
  
    //   socket.on('input'), function(data) {
    //     let name = data.name;
    //     let message = data.message;
  
    //     if (name == '' || message == '') {
    //       // send error status
    //       sendStatus('Please enter a name and message');
    //     } else {
    //       chat.insert({name: name, message: message}, function() {
    //         client.emit('output', [data]);
  
    //         sendStatus({message: 'Message sent', clear: true});
    //       });
    //     }
    //   }
    // });

    

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
  // methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}));

app.use('/api', apis);

var server = app.listen(port, (err) => { 
    if(err) {
        console.log("Error connecting to port. " + err);
    } else {
        console.log('Running on port ' + port);
    }
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socketMVC.init(io, socket, {
      debug: true,
      filePath: ['./routes/api/socket.js']
  });
});



// app.listen(3000, () => console.log(`Express server running on port 3000`));
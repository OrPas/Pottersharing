var http = require('http');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
});

// Socket.io server listens to our app
//cors part to resolve cors not allowed bug(due to differrent port)
//add maxHttpBufferSize for big files
//here be dragons

const io = require('socket.io')(
    app, 
    {
        maxHttpBufferSize: 1e8,
        cors: {
            origin: "http://192.168.1.23",
            methods: ["GET", "POST"]  
        }
    },
    {'pingTimeout': 500000,'maxHttpBufferSize':10e6}
    );
var XMLHttpRequest = require('xhr2');
const fs = require('fs');
var FormData = require('form-data');
// Emit welcome message on connection
io.on('connect', function connect(){});
io.on('connection', (socket) => {  
    socket.on('wresponse', (msg) => {    
        console.log('message: ' + msg);  
    });
    socket.on('hpageloaded', (msg) => {    
        console.log('...done !');  
    });
    socket.on('mpage', (msg) => {    
        console.log('New connection on ' + socket.id);  
        console.log("Request to /index.html...");
        console.log("...done !");
    }
    );
    socket.on('hpagedemand', (msg) => {    
        console.log('Request to /hpage.html...'); 
    }
    );
    socket.on('file', (fileObj) => {
        file = fileObj[0];
        var filername = fileObj[1];
        var type = fileObj[2]; 
        var fs = require('fs');
        console.log("Filename : ",filername)
        console.log("Type detected : ",type)
        // strip off the data: url prefix to get just the base64-encoded bytes
        var data = file.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        
        fs.writeFile('/opt/lampp/htdocs/pottersharing/' + type + '/' + filername, buf,() => {});
        console.log('/opt/lampp/htdocs/pottersharing/' + type + '/' + filername)
        socket.emit("filecreated")
        console.log("File created !")
    });
}
);
app.listen(3000);
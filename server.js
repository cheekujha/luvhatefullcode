var connect = require('connect'),
    serveStatic = require('serve-static'),
    http = require('http'),
    bodyParser = require('body-parser');

var app = connect();

app.use(serveStatic(__dirname));
http.createServer(app).listen(5555);
const Configuration = require('./config');
console.log(`NODE_ENV=${Configuration.NODE_ENV}`);
console.log(`NODE_PORT=${Configuration.PORT}`);
console.log(`NODE_PORT=${Configuration.HOST}`);

const bodyParser = require('body-parser');
const express = require('express');
const cpai = require('./routes/cpai.routes');
const winston = require('winston'),  expressWinston = require('express-winston');

const app = express();
const port = process.env.PORT || '8000';

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use('/CPAI', cpai);

app.listen(Configuration.PORT, () => {
    console.log(`Listening to requests on port:${port}`);
});
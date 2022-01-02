'use strict'

global.Promise = require('bluebird')

const express = require('express')
const path = require('path')
const morgan = require('morgan');
const appConfig = require('config').get('app')
const webConfig = require('config').get('webServer')


const logger = require('@open-age/logger')('server')
const port = process.env.PORT || appConfig.port || webConfig.port

const http = require('http');
const app = express()
 const server = http.createServer(app).listen('6700');
// server=app.listen('6700')

const io = require('socket.io').listen(server);
const locationMap=new Map();
//   app.listen('6700');
app.use(express.static(path.join(__dirname, '/public/tracker.html')))
io.on('connection', socket => {
    locationMap.set(socket.id, { lat: null, lng: null })
    socket.on('updateLocation', pos => {
        if (locationMap.has(socket.id)) {
            locationMap.set(socket.id, pos)
            console.log(socket.id, pos)
        }
    })
    socket.on('disconnect', () => {
        locationMap.delete(socket.id)
    })
})

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
//   mongoose.set('useCreateIndex', true);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
const boot = () => {
    const log = logger.start('app:boot')
    log.info(`environment:  ${process.env.NODE_ENV}`)
    log.info('starting server ...')

    app.listen(port, () => {
        console.log(`listening on port: ${port}`)
        log.end()
    })
}

const init = () => {
    require('./settings/database').configure(logger)
    require('./settings/express').configure(app, logger)
    require('./settings/routes').configure(app, logger)
    boot()
}


app.use(morgan('dev'));
init()
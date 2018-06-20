/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */

// const requires
const express = require('express');
const pg = require('pg-promise')();
const http = require('http');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const Chalk = require('chalk').constructor;
const clk = new Chalk({enabled: true});
const moment = require('moment');
const fs = require('fs');
const version = JSON.parse(fs.readFileSync('./package.json')).version;
const app = express();

// globals - defined everywhere
global.baseRoute = `/api/v${version.charAt(1)}`;
global.router = express.Router();
global.db = pg(process.env.POSTGRES_URL || 'postgres://admin:admin@localhost:5432/database');
global.Promise = require('bluebird');
global.baseDir = __dirname;

const log = (req, res, next) => {
    const logRequest = () => {
        const date = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        const ip = clk.blue.bold(`(${req.ip})`);
        const status = rstat(res.statusCode || undefined);
        const method = clk.bold(req.method);
        const path = clk.magenta.bold(req.path);
        console.log(date, ip, status, method, path);

    };
    onFinished(res, logRequest);
    next();
};

const rstat = s => {
    return s >= 500 ? clk.red.bold(s)
        : s >= 400 ? clk.yellow.bold(s)
            : s >= 300 ? clk.cyan.bold(s)
                : s >= 200 ? clk.green.bold(s)
                    : clk.gray.italic(s);
};

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died. \nCode: ${code}`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);
    
    const server = http.createServer(app);

    server.on('listening', () => console.log(`Started listening on port 3002`));

    server.on('error', err => {
        if (err.syscall !== 'listen') return console.error(err);

        switch (err.code) {
            case 'EACCES': {
                console.error(`Port ${'9827' || process.env.PORT} is blocked on your network :<`);
                process.exit();
                break;
            }
            case 'EADDRINUSE': {
                console.log(`Something is already using port ${'9827' || process.env.PORT} :<`);
                process.exit();
                break;
            }
            default: {
                console.error(err);
                break;
            }
        }
    });
    
    app.use(log);
    app.use(bodyParser.json());

    /* routes */

    app.use(`${baseRoute}/mods/submit`, require('./routes/mods.js'));
    app.use(`${baseRoute}/mods`, require('./routes/mods.js'));
    app.use('/', require('./routes/index.js'));

    /* end */
    server.listen(9827 || process.env.PORT, '0.0.0.0');
}
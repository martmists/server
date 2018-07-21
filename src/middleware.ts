/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {json, NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const logger = morgan('common', {
    skip: (req: Request) => /\/favicon\.ico/i.test(req.path) // ignore browsers that try to get /favicon.ico automatically.
});

function cors(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === 'OPTIONS') res.send(200);
    else next();
}

export default [
    cors,
    logger,
    json(),
    helmet()
];

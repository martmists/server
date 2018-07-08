/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import express, {Application, Request, Response} from 'express';
import morgan from 'morgan';
import {Connection, createConnection} from 'typeorm';

import v1 from './routes/v1';

const PORT: number = Number(process.env.SAYONIKA_PORT || process.env.PORT || 8080);
const DOCS_REDIRECT: string = process.env.SAYONIKA_DOCS || 'https://sudc.maidcafe.me/';

const app: Application = express();
const logger = morgan('common', {
    skip: (req: Request) => /\/favicon\.ico/i.test(req.path) // ignore browsers that try to get /favicon.ico automatically.
});

app.use(express.json);
app.use(logger);
app.use('/v1', v1);

app.get('/', (req: Request, res: Response) => {
    res.redirect(301, DOCS_REDIRECT);
});

createConnection(async (conn: Connection) => {
    app.$conn = conn;

    app.listen(PORT);
});

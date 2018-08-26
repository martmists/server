/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response, Router, urlencoded} from 'express';
import url = require('url');

import {loginCallback} from './callBacks/loginCallback';

const router = Router();
router.use(urlencoded());

router.post('/login', (req, res, next) => {
    loginCallback(req, res, next);
});
router.post('/logout');
router.post('/register');
router.get('/verify');

export default router;

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response, Router} from 'express';

import auth from './auth';
import mods from './mods';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/mods', mods);
router.use('/users', users);

router.get('/', (req: Request, res: Response) => {
    res.json({
        v: 1
    });
});

export default router;

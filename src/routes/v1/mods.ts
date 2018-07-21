/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response, Router} from 'express';

import Mod from '../../models/db/Mod';
import {handlePagination} from '../queryHandlers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const mods = handlePagination<Mod>(req, res, Mod);

    res.json(mods);
});

export default router;

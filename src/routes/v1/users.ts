/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {NextFunction, Request, Response, Router} from 'express';

import IUser, {convertFromDB} from '../../models/api/IUser';
import User from '../../models/db/User';
import {handlePagination} from '../queryHandlers';

const router = Router();
const selfRelations = [''];
const publicRelations = [''];

router.get('/', (req: Request, res: Response) => {
    let users = handlePagination<User>(req, res, User);
    users = users.map(convertFromDB);

    res.json(users);
});

router.route('/@me')
    .all(async (req: Request, res: Response, next: NextFunction) => {
        if (!res.locals.authenticated) res.sendStatus(404);
        else next();
    })
    .get(async (req: Request, res: Response) => {
        let user = await User.findOne({id: res.locals.user.id});
        user = convertFromDB(user);

        res.json(user);
    })
    .patch(async (req: Request, res: Response) => {

    })
    .delete(async (req: Request, res: Response) => {

    })

router.route('/:user')
    .get(async (req: Request, res: Response) => {
        let user = await User.findByIds([req.params.user]);

        if (!user.length) return res.sendStatus(404);
        else {
            user = convertFromDB(user[0]);
            res.json(user);
        }
    });

router.route('/:user/mods')
    .get(async (req: Request, res: Response) => {
        const user = await User.count({where: {
            id: req.params.user
        }});

        if (!user) return res.sendStatus(404);
        else {
            const {mods} = await User.findByIds([req.params.user], {relations: ['mods']})[0];
            res.json(mods);
        }
    });

router.route('/:user/favourites')
    .get(async (req: Request, res: Response) => {

    });

router.route('/:user/reviews')
    .get(async (req: Request, res: Response) => {

    });

export default router;

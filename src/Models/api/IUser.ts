/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {Snowflake, URL} from '../commonTypes';

import IConnection from './IConnection';
import IMod from './IMod';

export default interface IUser extends IAPIBase {
    username: string;
    avatar: URL;
    bio: string;
    donator: boolean;
    developer: boolean;
    moderator: boolean;
    mods: IMod[];
    favourites: Mod[];
    reviews: IReview[];
    connections: IConnection[];
}

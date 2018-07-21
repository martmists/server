/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {Snowflake, URL} from '../commonTypes';
import User from '../db/User';
import IReview from './IReview';

import IConnection, {convertFromDB as convertConnection} from './IConnection';
import IMod from './IMod';

// Helps cut down code needed to copy common attributes straight from the DB result.
interface ICommonUser extends IAPIBase {
    username: string;
    avatar: URL;
    bio: string;
    donator: boolean;
    developer: boolean;
    moderator: boolean;
}

export default interface IUser extends ICommonUser {
    mods: Snowflake[];
    favourites: Snowflake[];
    reviews: IReview[];
    connections: IConnection[];
}

export function convertFromDB(obj: User): IUser {
    const ret = obj as ICommonUser as IUser;

    ret.mods = obj.mods.map(v => v.id);
    ret.favourites = obj.favourites.map(v => v.id);
    ret.reviews = obj.reviews.map(v => v.id);
    ret.connections = obj.connections.map(convertConnection);

    return ret;
}

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import bcrypt = require('bcrypt');

import {IAPIBase} from '../Base';
import {Snowflake, URL} from '../commonTypes';
import User from '../db/User';

import IConnection, {convertFromDB as convertConnection} from './IConnection';
import IMod from './IMod';
import IReview from './IReview';

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

/**
 * Compares entered plaintext password to bcrypted version.
 * @param password password to check if salt exists. 
 * @param saltedHash the salted hash saved in your database.
 */
export async function verifyPassword(password: string, saltedHash: string) {
    // first lets hash the resulting password to compare them both
    let match = await bcrypt.compare(password, saltedHash);

    if (!match) {
        await JSON.stringify({consentAuth: false});
        throw new Error('password does not match. Do not auth');
    } else {
        await JSON.stringify({consentAuth: true});
        console.log('password matches. Authentication consent granted.');
    }
}

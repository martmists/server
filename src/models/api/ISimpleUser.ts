/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {URL} from '../commonTypes';
import User from '../db/User';

export default interface ISimpleUser extends IAPIBase {
    username: string;
    avatar: URL;
}

export function convertFromDB(obj: User): ISimpleUser {
    return obj as ISimpleUser;
}

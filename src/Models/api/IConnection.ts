/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPISnowflake} from '../Base';
import {ConnectionServices} from '../commonTypes';

export default interface IConnection extends IAPISnowflake {
    service: ConnectionServices;
    username: string;
    verified: boolean;
}

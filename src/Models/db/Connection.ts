/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToOne} from 'typeorm';

import {DBBase} from '../Base';
import {ConnectionServices} from '../commonTypes';

import User from './User';

@Entity()
export default class Connections extends DBBase {
    @Column({
        type: 'enum',
        enum: ConnectionServices,
        unique: true
    })
    service: ConnectionServices;

    @Column()
    username: string;

    @Column()
    verified: boolean;

    @ManyToOne(type => User, user => user.connections)
    owner: User;
}

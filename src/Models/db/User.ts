/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm';

import {DBBase} from '../Base';

import Connection from './Connection';
import Mod from './Mod';
import Review from './Review';

@Entity()
export default class User extends DBBase {
    @Column()
    username: string;

    @Column({nullable: true})
    avatar: string;

    @Column()
    bio: string;

    @Column()
    donator: boolean;

    @Column()
    developer: boolean;

    @Column()
    moderator: boolean;

    @ManyToMany(type => Mod)
    @JoinTable()
    mods: Mod[];

    @ManyToMany(type => Mod)
    @JoinTable()
    favourites: Mod[];

    @OneToMany(type => Review, review => review.author)
    reviews: Review[];

    @OneToMany(type => Connection, conn => conn.owner)
    connections: Connection[];

    @Column()
    password: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastPasswordReset: Date;
}

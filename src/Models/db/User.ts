/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany} from 'typeorm';

import {DBBase} from '../Base';

import Connection from './Connection';
import Mod from './Mod';
import Review from './Review';

@Entity('users')
export default class User extends DBBase {
    @Column()
    username: string;

    @Column({
        nullable: true
    })
    avatar: string;

    @Column({
        nullable: true
    })
    bio: string;

    @Column()
    donator: boolean;

    @Column()
    developer: boolean;

    @Column()
    moderator: boolean;

    @ManyToMany(() => Mod)
    @JoinTable()
    mods: Mod[];

    @ManyToMany(() => Mod)
    @JoinTable()
    favourites: Mod[];

    @OneToMany(() => Review, review => review.author)
    @JoinColumn()
    reviews: Review[];

    @ManyToMany(() => Review, review => review.upvotes)
    @JoinColumn()
    upvotedReviews: Review[];

    @ManyToMany(() => Review, review => review.downvotes)
    @JoinColumn()
    downvotedReviews: Review[];

    @ManyToMany(() => Review, review => review.foundHelpful)
    @JoinTable()
    reviewsFoundHelpful: Review[];

    @OneToMany(() => Connection, conn => conn.owner)
    @JoinColumn()
    connections: Connection[];

    @Column()
    password: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastPasswordReset: Date;
}

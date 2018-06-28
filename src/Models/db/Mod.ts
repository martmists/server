/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToMany, OneToMany} from 'typeorm';

import {DBBase} from '../Base';
import {IMedia, ModState, Snowflake, URL} from '../commonTypes';

import Review from './Review';
import User from './User';

@Entity()
export default class Mod extends DBBase {
    @Column()
    title: string;

    @Column()
    icon: URL;

    @Column()
    media: IMedia[];

    @Column()
    tagline: string;

    @Column()
    description: string;

    @Column()
    website: URL;

    @Column()
    category: string;

    @OneToMany(type => Review, review => review.mod)
    reviews: Review[];

    @Column()
    owner: Snowflake;

    @ManyToMany(type => User)
    authors: User[];

    @Column()
    verified: boolean;

    @Column({
        type: 'enum',
        enum: ModState
    })
    devState: ModState;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    releaseDate: Date;
}

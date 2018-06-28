/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToMany, OneToMany} from 'typeorm';

import {DBBase} from '../Base';
import {Snowflake, URL} from '../typedefs';

import Review from './Review';
import User from './User';

@Entity()
export default class Mod extends DBBase {
    @Column()
    title: string;

    @Column()
    icon: URL;

    @Column()
    tagline: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    state: string;

    @Column()
    website: URL;

    @Column()
    owner: Snowflake;

    @ManyToMany(type => User)
    authors: User[];

    @Column()
    verified: boolean;

    @OneToMany(type => Review, review => review.mod)
    reviews: Review[];

    @Column()
    releaseDate: number;

    @Column()
    released: boolean;
}

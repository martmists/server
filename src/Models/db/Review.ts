/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToOne} from 'typeorm';

import {DBBase} from '../Base';

import Mod from './Mod';
import User from './User';

@Entity()
export default class Review extends DBBase {
    @Column()
    rating: number;

    @Column()
    content: string;

    @Column()
    upvotes: number;

    @Column()
    downvotes: number;

    @Column()
    foundHelpful: number;

    @ManyToOne(type => User, user => user.reviews)
    author: User;

    @ManyToOne(type => Mod, mod => mod.reviews)
    mod: Mod;
}

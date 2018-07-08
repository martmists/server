/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Check, Column, Entity, ManyToMany, ManyToOne} from 'typeorm';

import {DBBase} from '../Base';
import {Rating} from '../commonTypes';

import Mod from './Mod';
import User from './User';

@Entity('reviews')
@Check('"rating" <= 5 AND MOD("rating", .5) = 0')
export default class Review extends DBBase {
    @Column({
        type: 'numeric'
    })
    rating: Rating;

    @Column()
    content: string;

    @ManyToMany(() => User, user => user.upvotedReviews)
    upvotes: User[];

    @ManyToMany(() => User, user => user.downvotedReviews)
    downvotes: User[];

    @ManyToMany(() => User, user => user.reviewsFoundHelpful)
    foundHelpful: User[];

    @ManyToOne(() => User, user => user.reviews)
    author: User;

    @ManyToOne(() => Mod, mod => mod.reviews)
    mod: Mod;
}

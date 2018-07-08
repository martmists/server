/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany} from 'typeorm';

import {DBBase} from '../Base';
import {ModCategory, ModState, Snowflake, URL} from '../commonTypes';

import Media from './Media';
import Review from './Review';
import User from './User';

@Entity('mods')
export default class Mod extends DBBase {
    @Column()
    title: string;

    @Column()
    icon: URL;

    @OneToMany(type => Media, media => media.mod)
    @JoinColumn()
    media: Media[];

    @Column()
    tagline: string;

    @Column()
    description: string;

    @Column()
    website: URL;

    @Column({
        type: 'enum',
        enum: ModCategory
    })
    category: ModCategory;

    @OneToMany(type => Review, review => review.mod)
    @JoinColumn()
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

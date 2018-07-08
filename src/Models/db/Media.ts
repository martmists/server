/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToOne} from 'typeorm';

import {DBBase} from '../Base';
import {MediaTypes, URL} from '../commonTypes';

import Mod from './Mod';

@Entity()
export default class Media extends DBBase {
    @Column({
        type: 'enum',
        enum: MediaTypes
    })
    type: MediaTypes;

    @Column()
    url: URL;

    @ManyToOne(type => Mod, mod => mod.media)
    mod: Mod[];
}

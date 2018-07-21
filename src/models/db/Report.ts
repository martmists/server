/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Column, Entity, ManyToOne} from 'typeorm';

import {DBBase} from '../Base';
import {ReportClassification, Snowflake} from '../commonTypes';

import Mod from './Mod';
import User from './User';

@Entity('reports')
export default class Report extends DBBase {
    @Column({
        type: 'enum',
        enum: ReportClassification
    })
    classification: ReportClassification;

    @Column({
        nullable: true
    })
    body?: string;

    @ManyToOne(() => User, user => user.reports)
    author: User;

    @ManyToOne(() => Mod, mod => mod.reports)
    mod: Mod;
}

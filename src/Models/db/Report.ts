/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */
 
import {Column, Entity, JoinColumn, JoinTable} from 'typeorm';

import {DBBase} from '../Base';
import {Snowflake} from '../commonTypes';
import User from './User';
import {ReportClassification} from '../api/IReport';

@Entity('reports')
export default class Report extends DBBase {
    @Column()
    modSnowflake: Snowflake;

    @Column({
        type: 'enum',
        enum: ReportClassification
    })
    violationType: ReportClassification;

    @Column()
    author: User;
}
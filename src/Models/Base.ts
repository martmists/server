/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

import {Snowflake} from './commonTypes';

/**
 * Base class for DB models with anything that needs a Snowflake ID.
 */
export abstract class DBSnowflake extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: Snowflake; // TODO: make snowflake generator thingy
}

/**
 * Base class for DB models with anything that needs both a Snowflake ID and a creation date.
 */
export abstract class DBBase extends DBSnowflake {
    @CreateDateColumn({
        select: false
    })
    created: number;
}

export interface IAPIBase {
    id: Snowflake;
}

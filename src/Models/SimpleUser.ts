/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

type Snowflake = number;
type URL = string;

@Entity()
export default class SimpleUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Snowflake;

    @Column()
    username: string;

    @Column()
    avatar?: URL;
}
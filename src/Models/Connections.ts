/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

type URL = string;

@Entity()
export default class Connections extends BaseEntity
{
    @PrimaryGeneratedColumn()
    service: string;

    @Column()
    usernameOnService: string;

    @Column()

    accountHyperlink: URL;

}
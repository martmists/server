/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import SimpleUser from "./SimpleUser";

type Snowflake = number;
type URL = string;

@Entity()

export default class Mod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Snowflake;

    @Column()
    title: string;

    @Column()
    icon?: URL;

    @Column()
    trailer?: URL;

    @Column()
    pictures: URL[];

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    owner: Snowflake;

    @Column()
    authors: SimpleUser[];

    @Column()
    verified: boolean;
}
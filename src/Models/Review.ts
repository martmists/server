/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import SimpleUser from "./SimpleUser";

type Snowflake = number;

@Entity()
export default class Review extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: Snowflake;

    @Column()
    review: string;

    @Column()
    rating: number;

    @Column()
    user: SimpleUser;
}
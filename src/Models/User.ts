/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import Mod from "./Mods";
import Connections from './Connections';
type Snowflake = number;
type URL = string;

@Entity()
export class User extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: Snowflake;

    @Column()
    username: string;
    
    @Column()
    avatar?: URL;
    @Column()
    bio?: string;

    @Column()
    donator: boolean;

    @Column()
    developer: boolean;

    @Column()
    moderator: boolean;

    @Column()
    connections: Connections[];

    @Column()
    mods: {
        authored: Mod[];
        collaborated: Mod[];
    }
}
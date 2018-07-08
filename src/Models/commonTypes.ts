/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

export type Snowflake = number;
export type URL = string;

export enum ConnectionServices {
    Discord = 'discord',
    GitHub = 'github',
    GitLab = 'gitlab',
    Reddit = 'reddit'
}

export enum ModCategory {
    Todo
}

export enum ModState {
    Planning,
    InDevelopment,
    Playtesting,
    Released
}

export enum MediaTypes {
    Image = 'image',
    Video = 'video'
}

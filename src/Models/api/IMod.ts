/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {IMedia, ModState, Snowflake, URL} from '../commonTypes';

import IUser from './IUser';

export default interface IMod extends IAPIBase {
    title: string;
    icon: URL;
    media: IMedia[];
    tagline: string;
    description: string;
    website: URL;
    category: Category;
    reviews: IReview[];
    rating: number;
    owner: Snowflake;
    authors: IUser[];
    verified: boolean;
    devState: ModState;
    releaseDate: Date;
}

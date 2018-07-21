/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {ModCategory, ModState, Snowflake, URL} from '../commonTypes';
import Mod from '../db/Mod';

import IMedia, {convertFromDB as convertMedia} from './IMedia';
import IReview, {convertFromDB as convertReview} from './IReview';
import ISimpleUser, {convertFromDB as convertSimpleUser} from './ISimpleUser';
import IUser from './IUser';

interface ICommonMod extends IAPIBase {
    title: string;
    icon: URL;
    tagline: string;
    description: string;
    website: URL;
    category: ModCategory;
    owner: Snowflake;
    verified: boolean;
    devState: ModState;
    downloadURL?: URL;
    releaseDate: Date;
}

export default interface IMod extends ICommonMod {
    media: IMedia[];
    reviews: IReview[];
    rating: number;
    authors: ISimpleUser[];
}

export function convertFromDB(obj: Mod): IMod {
    const ret = obj as ICommonMod as IMod;

    ret.media = obj.media.map(convertMedia);
    ret.reviews = obj.reviews.map(convertReview);
    ret.rating = ret.reviews.reduce((m, v) => m + v.rating, 0) / ret.reviews.length;
    ret.authors = obj.authors.reduce(convertSimpleUser);

    return ret;
}

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {Rating, Snowflake} from '../commonTypes';
import Review from '../db/Review';

interface ICommonReview extends IAPIBase {
    rating: Rating;
    content: string;
}

export default interface IReview extends ICommonReview {
    upvotes: number;
    downvotes: number;
    foundHelpful: number;
    author: Snowflake;
    mod: Snowflake;
}

export function convertFromDB(obj: Review): IReview {
    const ret = obj as ICommonReview as IReview;

    ret.upvotes = obj.upvotes.length;
    ret.downvotes = obj.downvotes.length;
    ret.foundHelpful = obj.foundHelpful.length;

    return ret;
}

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {Snowflake} from '../commonTypes';

export default interface IReview extends IAPIBase {
    rating: number;
    content: string;
    upvotes: number;
    downvotes: number;
    foundHelpful: number;
    author: Snowflake;
    mod: Snowflake;
}

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response} from 'express';
import {BaseEntity} from 'typeorm';

/**
 * Handle's query string pagination for a route.
 *
 * @param req Request object to paginate.
 * @param res Response object relating to the request.
 * @param target The active record class to paginate through. Should be the uninstantiated constructor object for T.
 * @returns Paginated array of T.
 */
export function handlePagination<T extends BaseEntity>(req: Request, res: Response, target: T): T[] {
    /*
     * Available pagination options:
     *
     * ?limit=number - Limits the amount of results from the API. Default: 20, Max: 100.
     * ?page=number - How many pages of `limit` results to skip. Default: 1.
     * ?filter=field1,value1,...,fieldN,valueN - Filter to pass results under, in an AND operation. Return an error if not even length.
     * ?filterOr=field1,value1,...,fieldN,valueN - Same as `?filter` but an OR operation instead. Return an error if not even length.
     * ?fuzzy=field1,value1,...,fieldN,valueN - Same as `?filter` but fuzzy matching instead of exact. Return an error if not even length.
     * ?fuzzyOr=field1,value1,...,fieldN,valueN - Same as `?filterOr` but fuzzy matching instead of exact. Return an error if not even length
     */
    target.find();

    return [];
}

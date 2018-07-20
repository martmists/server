/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response, Router} from 'express';
import assert = require('assert');
import {request} from '../util';

//required sanity check before init.

function _checkReadiness() {
    request('GET', 'http://localhost:4444/health/ready', {}, null)
    .then(async res => {
        try {
           await assert(res.body.status === 'ok');
           Promise.resolve('Health is OK - Link ready.')
        } catch(AssertionError) {
           Promise.reject(`Health is not OK - Link not ready\n ${e.stack}`);
        }      
    })
}
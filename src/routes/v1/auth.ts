/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {Request, Response, Router} from 'express';
import https = require('https');
import URL = require('url');
import assert = require('assert');

//required sanity check before init.

function _checkReadiness() {
    _request('GET', 'http://localhost:4444/health/ready', {}, null)
    .then(async res => {
        try {
           await assert(res.body.status === 'ok');
           Promise.resolve('Health is OK - Link ready.')
        } catch(AssertionError) {
           Promise.reject(`Health is not OK - Link not ready\n ${e.stack}`);
        }      
    })
}

function _request(method, url, options={}, payload) {
    return new Promise((resolve, reject) => {
        let req = https.request(Object.assign(URL.parse(url), options, {method}), res => {
            let chunked = '';

            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));

            res.setEncoding('utf8');
            res.on('data', chunk => chunked += chunk);
            res.on('error', reject);
            res.on('end', () => {
                let val;

                try {
                    val = JSON.parse(chunked);
                } catch(e) {
                    return resolve(chunked);
                }

                if (val.error) return reject(new Error(val.error));
                else return resolve(val);
            });
        });

        req.on('error', reject);
        if (payload) req.write(payload);
        req.end();
    });
}

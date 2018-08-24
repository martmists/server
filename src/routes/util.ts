/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */
import https = require('https');
import URL = require('url');

// a simple function that returns a Promise<Object> on query.
/**
 * Requests from a specified URL with optional passing of a JSON payload. Only used for JSON requests.
 * @arg {String} method The method to be used. valid methods are POST, GET, PATCH, DELETE.
 * @arg {Object} options options to pass
 * @arg {String} url The target URL to pass. Must be a valid URL.
 * @arg {Object} payload the payload to pass on the target URL.
 * @returns {Promise<Object>} the JSON response from the endpoint.
 */
export function request(method, url, options={}, payload) {
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
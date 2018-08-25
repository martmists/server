/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import https = require('https');
import URL = require('url');

/**
 * Simple Function to handle Promisified HTTP/S requests.
 * @param  method the HTTP method to perform to a specified remote service
 * @param  url the URL to perform the request
 * @param  options other options to pass to the URL, Authentication and such can be passed here.
 * @param  payload the JSON payload to pass to the remote.
 * @returns a Promise containing the response from the remote.
 */
export function request(method: string, url: string, options: object = {}, payload: string) {

    return new Promise((resolve, reject) => {

      const allowedMethods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'].includes(method);

      if (!allowedMethods) throw new Error('Method is not a valid HTTP query method.');

      const req = https.request(Object.assign(URL.parse(url), options, {method}), res => {
        let chunked = '';

        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));

        res.setEncoding('utf8');
        res.on('data', chunk => chunked += chunk);
        res.on('error', reject);
        res.on('end', () => {
          let val;

          try {
            val = JSON.parse(chunked);
          } catch (e) {
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

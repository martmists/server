/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */
import url = require('url');

import HydraAuthProvider from '../../../services/auth/hydraAuthProvider';

 export async function loginCallback(req, res, next) {
     const query = url.parse(req.url, true).query;
     const challenge = query.login_challenge;

     const a = await HydraAuthProvider.getLoginRequest(challenge);

     if (a.skip) HydraAuthProvider.acceptConsentRequest(challenge, {subject: a.subject});

     // do nothing atm
 }

/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

 // this service queries the ORY Hydra service that will handle Authentication.
//  since we still require a handbuilt function just to query with Hydra, this
//  was created.

import csrf = require('csurf');

import { request } from '../../helpers/request';

const hydraEndpoint = process.env.HYDRA_ENDPOINT;

export default class HydraConsentProvider {
 public static getLoginRequest(challenge) {
      return this.get('login', challenge);
   }
 public static acceptLoginRequest(challenge, body) {
     return this.put('login', 'accept', challenge, body);
 }
 /**
  * gets a specific flow and challenge from ORY Hydra
  * @param flow the auth flow to use. Can be a valid OAuth2 provider call.
  * @param challenge the challenge to return to the consumer.
  * @param action the action to fulfill by the HYDRA server.
  */
 private static get(flow, challenge) {
     request('GET', `${hydraEndpoint}/oauth2/auth/requests/${flow}/${challenge}`, undefined, {})
      .then(res => res)
      .catch(err => new Error(`Failed to get flow ${flow} from ${hydraEndpoint}.\n ${err.stack}`));
  }
 private static put(flow, action, challenge, body) {
     request('PUT', `${hydraEndpoint}/oauth2/auth/requests/${flow}/${challenge}/${action}`, {headers: { 'Content-Type': 'application/json'}}, JSON.stringify(body))
     .then(res => res)
     .catch(err => new Error(`Failed to put flow ${flow} from ${hydraEndpoint}.\n ${err.stack}`));
  }
}

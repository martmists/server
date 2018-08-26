/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

 // this service queries the ORY Hydra service that will handle Authentication.
//  since we still require a handbuilt function just to query with Hydra, this
//  was created.
import {Request, Response, Router, urlencoded} from 'express';

import { request } from '../../helpers/request';

const hydraEndpoint = process.env.HYDRA_ENDPOINT;

export default class HydraAuthProvider {
   /**
    * Gets a login request from ORY Hydra
    * @param challenge the challenge query.
    */
   public static async getLoginRequest(challenge) {
     const val = await this.get('login', challenge);

     return val;
    }

    /**
     * Acknowledges and accepts the login request from/to ORY Hydra.
     * @param challenge the challenge query
     * @param body Object of the body to payload with the request.
     */
   public static async acceptLoginRequest(challenge, body: object) {
     const val =  await this.put('login', 'accept', challenge, body);

     return val;
    }

   public static async rejectLoginRequest(challenge, body: object) {
       const val = await this.put('login', 'reject', challenge, body);

       return val;
   }

   public static async getConsentRequest(challenge) {
       const val = await this.get('consent', challenge);

       return val;
   }

   public static async acceptConsentRequest(challenge, body: object) {
     const val = await this.put('consent', 'accept', challenge, body);

     return val;
   }

   public static async rejectConsentRequest(challenge, body) {
     const val = await this.put('consent', 'reject', challenge, body);

     return val;
   }
 /**
  * gets a specific flow and challenge from ORY Hydra
  * @param flow the auth flow to use. Can be a valid OAuth2 provider call.
  * @param challenge the challenge to return to the consumer.
  * @param action the action to fulfill by the HYDRA server.
  */
   private static get(flow: string, challenge) {
     return new Promise((resolve, reject) => {
     request('GET', `${hydraEndpoint}/oauth2/auth/requests/${flow}/${challenge}`, undefined, '')
      .then(res => res)
      .catch(err => new Error(`Failed to get flow ${flow} from ${hydraEndpoint}.\n ${err.stack}`));
     });
    }
  /**
   * puts a specific flow and challenge from ORY Hydra
   * @param flow the auth flow to use. Can be a valid OAuth2 provider call.
   * @param challenge the challenge to return to the consumer.
   * @param action the action to fulfill by the HYDRA server.
   */
   private static put(flow: string, action: string, challenge, body: object) {
     return new Promise((resolve, reject) => {
     request('PUT', `${hydraEndpoint}/oauth2/auth/requests/${flow}/${challenge}/${action}`, {headers: { 'Content-Type': 'application/json'}}, JSON.stringify(body))
     .then(res => res)
     .catch(err => new Error(`Failed to put flow ${flow} from ${hydraEndpoint}.\n ${err.stack}`)); 
    });
  }
}

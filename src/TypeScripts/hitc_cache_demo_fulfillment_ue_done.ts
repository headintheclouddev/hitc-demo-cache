/**
 * hitc_cache_demo_fulfillment_ue_done.ts
 *
 * @NScriptName HITC Cache Demo - IF UE - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import cache = require('N/cache');
import https = require('N/https');
import log = require('N/log');
import runtime = require('N/runtime');

export function afterSubmit(context: EntryPoints.UserEvent.afterSubmitContext) {
  log.debug('afterSubmit', `${context.type} IF ${context.newRecord.id}`);
  if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT) {
    // We're going to simulate sending this fulfillment to a 3PL, using a bearer token for authentication
    const startTime = Date.now();
    const tokenCache = cache.getCache({ name: '3pl-token' })
    let serverResponse = tokenCache.get({ key: 'token', loader: getNewBearerToken });
    let responseData = JSON.parse(serverResponse) as { token: string, expires: number };
    log.debug('afterSubmit', `Token expires at ${responseData.expires} => ${new Date(responseData.expires)}.`);
    if (responseData.expires <= Date.now()) { // The token is expired, so get a new one
      log.debug('afterSubmit', `Getting a new token at ${new Date()}, previous one is expired.`);
      tokenCache.remove({ key: 'token' });
      serverResponse = tokenCache.get({ key: 'token', loader: getNewBearerToken });
      responseData = JSON.parse(serverResponse) as { token: string, expires: number };
    }
    // Now that we have our bearer token, simulate sending this fulfillment to a 3PL
    log.debug('afterSubmit', `Sending fulfillment to 3PL using token ${responseData.token} time ${Date.now() - startTime}, usage: ${runtime.getCurrentScript().getRemainingUsage()}`);
    // const headers = { Authorization: `Bearer ${responseData.token}` };
    // const response = https.post({ url: 'https://www.your3pl.com', headers, body: JSON.stringify(context.newRecord) });
  }
}

function getNewBearerToken(): string {
  const tokenResponse = https.post({
    url: 'https://tstdrv1264278.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1131&deploy=1&compid=TSTDRV1264278&ns-at=AAEJ7tMQkVsQ6xyJMPVVMRfKGAJbBDbcm2V5TuNy3xPA8-n8K10&mode=generateToken',
    body: { refresh_token: 'not-real' }
  });
  log.debug('getNewBearerToken', `New token response at ${new Date()}: ${tokenResponse.body}`);
  return tokenResponse.body;
}

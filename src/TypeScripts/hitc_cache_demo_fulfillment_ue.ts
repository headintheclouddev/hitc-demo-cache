/**
 * hitc_cache_demo_fulfillment_ue.ts
 *
 * @NScriptName HITC Cache Demo - IF User Event
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import log = require('N/log');

export function afterSubmit(context: EntryPoints.UserEvent.afterSubmitContext) {
  log.debug('afterSubmit', `${context.type} IF ${context.newRecord.id}`);
}

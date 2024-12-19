/**
 * hitc_cache_demo_customer_ue.ts
 *
 * @NScriptName HITC Cache Demo - Customer User Event
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import log = require('N/log');

export function beforeSubmit(context: EntryPoints.UserEvent.beforeSubmitContext) {
  log.debug('beforeSubmit', `${context.type} customer ${context.newRecord.id}`);
}

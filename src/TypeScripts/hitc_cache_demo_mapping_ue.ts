/**
 * hitc_cache_demo_mapping_ue.ts
 *
 * @NScriptName HITC Cache Demo - Mapping - User Event
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import log = require('N/log');

export function afterSubmit(context: EntryPoints.UserEvent.afterSubmitContext) {
  log.debug('afterSubmit', `${context.type} county/rep mapping record ${context.newRecord.id}`);
}

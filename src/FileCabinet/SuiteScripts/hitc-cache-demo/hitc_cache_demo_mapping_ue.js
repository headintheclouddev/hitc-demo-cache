/**
 * hitc_cache_demo_mapping_ue.ts
 *
 * @NScriptName HITC Cache Demo - Mapping - User Event
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/log"], function (require, exports, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.afterSubmit = afterSubmit;
    function afterSubmit(context) {
        log.debug('afterSubmit', `${context.type} county/rep mapping record ${context.newRecord.id}`);
    }
});

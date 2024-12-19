/**
 * hitc_cache_demo_customer_ue.ts
 *
 * @NScriptName HITC Cache Demo - Customer User Event
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/log"], function (require, exports, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = beforeSubmit;
    function beforeSubmit(context) {
        log.debug('beforeSubmit', `${context.type} customer ${context.newRecord.id}`);
    }
});

/**
 * hitc_cache_demo_mapping_ue_done.ts
 *
 * @NScriptName HITC Cache Demo - Mapping - UE - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/cache", "N/log"], function (require, exports, cache, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.afterSubmit = afterSubmit;
    function afterSubmit(context) {
        log.debug('afterSubmit', `${context.type} county/rep mapping record ${context.newRecord.id}`);
        if (context.type == context.UserEventType.EDIT) {
            const county = context.newRecord.getValue('name');
            const salesRep = context.newRecord.getValue('custrecord_county_sales_rep_mapping_rep');
            const repCache = cache.getCache({ name: 'County-Sales-Rep-Mapping', scope: cache.Scope.PROTECTED });
            log.debug('afterSubmit', `Updating cached value for county ${county} to sales rep: ${salesRep}`);
            repCache.put({ key: county, value: salesRep });
        }
        else if (context.type == context.UserEventType.DELETE) {
            const county = context.newRecord.getValue('name');
            const repCache = cache.getCache({ name: 'County-Sales-Rep-Mapping', scope: cache.Scope.PROTECTED });
            repCache.remove({ key: county });
            log.debug('afterSubmit', `Removed cached value for county ${county}.`);
        }
    }
});

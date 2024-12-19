/**
 * hitc_cache_demo_customer_ue_done.ts
 *
 * @NScriptName HITC Cache Demo - Customer UE - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/cache", "N/log", "N/query", "N/runtime"], function (require, exports, cache, log, query, runtime) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = beforeSubmit;
    function beforeSubmit(context) {
        log.debug('beforeSubmit', `${context.type} customer ${context.newRecord.id}`);
        if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT) {
            const county = context.newRecord.getValue('custentity_county');
            if (county) {
                const repCache = cache.getCache({ name: 'County-Sales-Rep-Mapping', scope: cache.Scope.PROTECTED });
                const salesRep = repCache.get({
                    key: county,
                    loader: function () {
                        const results = query.runSuiteQL({
                            query: `
              SELECT custrecord_county_sales_rep_mapping_rep
              FROM customrecord_county_sales_rep_mapping
              WHERE isInactive = 'F' AND name = ?
            `,
                            params: [county]
                        }).asMappedResults();
                        log.debug('beforeSubmit', `Looked up non-cached value for county ${county}: ${JSON.stringify(results)}`);
                        return results.length > 0 ? String(results[0].custrecord_county_sales_rep_mapping_rep) : '';
                    }
                });
                log.debug('beforeSubmit', `Sales rep for county ${county}: ${salesRep}, usage: ${runtime.getCurrentScript().getRemainingUsage()}`);
                if (salesRep)
                    context.newRecord.setValue('salesrep', salesRep);
            }
        }
    }
});

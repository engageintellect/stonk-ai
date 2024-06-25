import hash from '../lib/hash';
function serializeKeyDefault(key) {
    if (typeof key === 'function') {
        try {
            key = key();
        }
        catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    if (Array.isArray(key)) {
        key = hash(key);
    }
    else {
        // convert null to ''
        key = String(key || '');
    }
    return key;
}
var SWRVCache = /** @class */ (function () {
    function SWRVCache(ttl) {
        if (ttl === void 0) { ttl = 0; }
        this.items = new Map();
        this.ttl = ttl;
    }
    SWRVCache.prototype.serializeKey = function (key) {
        return serializeKeyDefault(key);
    };
    SWRVCache.prototype.get = function (k) {
        var _key = this.serializeKey(k);
        return this.items.get(_key);
    };
    SWRVCache.prototype.set = function (k, v, ttl) {
        var _key = this.serializeKey(k);
        var timeToLive = ttl || this.ttl;
        var now = Date.now();
        var item = {
            data: v,
            createdAt: now,
            expiresAt: timeToLive ? now + timeToLive : Infinity
        };
        this.dispatchExpire(timeToLive, item, _key);
        this.items.set(_key, item);
    };
    SWRVCache.prototype.dispatchExpire = function (ttl, item, serializedKey) {
        var _this = this;
        ttl && setTimeout(function () {
            var current = Date.now();
            var hasExpired = current >= item.expiresAt;
            if (hasExpired)
                _this.delete(serializedKey);
        }, ttl);
    };
    SWRVCache.prototype.delete = function (serializedKey) {
        this.items.delete(serializedKey);
    };
    return SWRVCache;
}());
export default SWRVCache;
//# sourceMappingURL=index.js.map
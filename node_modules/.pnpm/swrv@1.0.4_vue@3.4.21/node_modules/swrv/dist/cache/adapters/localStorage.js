"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
/**
 * LocalStorage cache adapter for swrv data cache.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
var LocalStorageCache = /** @class */ (function (_super) {
    __extends(LocalStorageCache, _super);
    function LocalStorageCache(key, ttl) {
        if (key === void 0) { key = 'swrv'; }
        if (ttl === void 0) { ttl = 0; }
        var _this = _super.call(this, ttl) || this;
        _this.STORAGE_KEY = key;
        return _this;
    }
    LocalStorageCache.prototype.encode = function (storage) { return JSON.stringify(storage); };
    LocalStorageCache.prototype.decode = function (storage) { return JSON.parse(storage); };
    LocalStorageCache.prototype.get = function (k) {
        var item = localStorage.getItem(this.STORAGE_KEY);
        if (item) {
            var _key = this.serializeKey(k);
            var itemParsed = JSON.parse(item)[_key];
            if ((itemParsed === null || itemParsed === void 0 ? void 0 : itemParsed.expiresAt) === null) {
                itemParsed.expiresAt = Infinity; // localStorage sets Infinity to 'null'
            }
            return itemParsed;
        }
        return undefined;
    };
    LocalStorageCache.prototype.set = function (k, v, ttl) {
        var _a;
        var payload = {};
        var _key = this.serializeKey(k);
        var timeToLive = ttl || this.ttl;
        var storage = localStorage.getItem(this.STORAGE_KEY);
        var now = Date.now();
        var item = {
            data: v,
            createdAt: now,
            expiresAt: timeToLive ? now + timeToLive : Infinity
        };
        if (storage) {
            payload = this.decode(storage);
            payload[_key] = item;
        }
        else {
            payload = (_a = {}, _a[_key] = item, _a);
        }
        this.dispatchExpire(timeToLive, item, _key);
        localStorage.setItem(this.STORAGE_KEY, this.encode(payload));
    };
    LocalStorageCache.prototype.dispatchExpire = function (ttl, item, serializedKey) {
        var _this = this;
        ttl && setTimeout(function () {
            var current = Date.now();
            var hasExpired = current >= item.expiresAt;
            if (hasExpired)
                _this.delete(serializedKey);
        }, ttl);
    };
    LocalStorageCache.prototype.delete = function (serializedKey) {
        var storage = localStorage.getItem(this.STORAGE_KEY);
        var payload = {};
        if (storage) {
            payload = this.decode(storage);
            delete payload[serializedKey];
        }
        localStorage.setItem(this.STORAGE_KEY, this.encode(payload));
    };
    return LocalStorageCache;
}(__1.default));
exports.default = LocalStorageCache;
//# sourceMappingURL=localStorage.js.map
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.trace = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArrays(["<T> " + new Date().toLocaleString() + ":"], msg));
    };
    Log.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.info.apply(console, __spreadArrays(["<I> " + new Date().toLocaleString() + ":"], msg));
    };
    Log.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.warn.apply(console, __spreadArrays(["<W> " + new Date().toLocaleString() + ":"], msg));
    };
    Log.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.error.apply(console, __spreadArrays(["<E> " + new Date().toLocaleString() + ":"], msg));
    };
    Log.test = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArrays(["<X> " + new Date().toLocaleString() + ":"], msg));
    };
    return Log;
}());
exports["default"] = Log;

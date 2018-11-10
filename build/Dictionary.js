"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DBObject_1 = require("./DBObject");
var Dictionary = /** @class */ (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary(DB, Language1, Language2) {
        if (Language1 === void 0) { Language1 = null; }
        if (Language2 === void 0) { Language2 = null; }
        var _this = _super.call(this, DB, "dictionaries") || this;
        _this.language1 = Language1;
        _this.language2 = Language2;
        return _this;
    }
    Dictionary.prototype.load = function (json) {
        this.id = json['ID'];
        this.language1 = json['Lang1'];
        this.language2 = json['Lang2'];
    };
    Dictionary.prototype.initializeDBParams = function () {
        this.DBparams = [
            { name: "Lang1", value: this.language1, fk_table: null },
            { name: "Lang2", value: this.language2, fk_table: null }
        ];
    };
    return Dictionary;
}(DBObject_1.DBObject));
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map
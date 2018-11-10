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
var Dictionary_1 = require("./Dictionary");
var Word = /** @class */ (function (_super) {
    __extends(Word, _super);
    function Word(DB, Word1, Word2, Dictionary) {
        if (Word1 === void 0) { Word1 = null; }
        if (Word2 === void 0) { Word2 = null; }
        if (Dictionary === void 0) { Dictionary = null; }
        var _this = _super.call(this, DB, "Words") || this;
        _this.word1 = Word1;
        _this.word2 = Word2;
        _this.dictionary = Dictionary;
        return _this;
    }
    Word.prototype.load = function (json) {
        this.id = json['ID'];
        this.word1 = json['word1'];
        this.word2 = json['word2'];
        this.dictionary = new Dictionary_1.Dictionary(this.db);
        this.dictionary.load(this.getMany("dictionaries", [{ name: "ID", value: json['DictID'], fk_table: null }])[0]);
    };
    Word.prototype.initializeDBParams = function () {
        this.DBparams = [
            { name: "word1", value: this.word1, fk_table: null },
            { name: "word2", value: this.word2, fk_table: null },
            { name: "DictID", value: this.dictionary.id, fk_table: "dictionaries" }
        ];
    };
    return Word;
}(DBObject_1.DBObject));
exports.Word = Word;
//# sourceMappingURL=Words.js.map
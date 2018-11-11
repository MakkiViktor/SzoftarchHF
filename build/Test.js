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
var User_1 = require("./User");
var Words_1 = require("./Words");
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test(DB, Dictionary, Creator, Level) {
        if (Dictionary === void 0) { Dictionary = null; }
        if (Creator === void 0) { Creator = null; }
        if (Level === void 0) { Level = null; }
        var _this = _super.call(this, DB, "test") || this;
        _this.dictionary = Dictionary;
        _this.creator = Creator;
        _this.level = _this.level;
        _this.loadWords();
        _this.initializeDBParams();
        return _this;
    }
    Test.prototype.loadWords = function () {
        var _this = this;
        this.getMany("test_words", [{ name: "TestID", value: this.id, fk_table: null }]).forEach(function (element) {
            _this.getMany("Words", [{ name: "ID", value: element[0]['WordID'].value, fk_table: null }]).forEach(function (element2) {
                _this.words[_this.words.length] = new Words_1.Word(_this.db);
                _this.words[_this.words.length - 1].load(element2);
            });
        });
        ;
    };
    Test.prototype.load = function (json) {
        this.id = json['ID'].value;
        this.creator = new User_1.User(this.db);
        this.creator.load(this.getMany("users", [{ name: "ID", value: json['CreatorID'].value, fk_table: null }])[0]);
        this.dictionary = new Dictionary_1.Dictionary(this.db);
        this.dictionary.load(this.getMany("dictionaries", [{ name: "ID", value: json['DictID'].value, fk_table: null }])[0]);
        this.level = json['Level'].value;
        this.loadWords();
    };
    Test.prototype.initializeDBParams = function () {
        this.DBparams = [
            { name: "Name", value: this.name, fk_table: null },
            { name: "Level", value: this.level, fk_table: null },
            { name: "DictID", value: this.dictionary.id, fk_table: "dictionaries" },
            { name: "CreatorID", value: this.creator.id, fk_table: "users" }
        ];
    };
    return Test;
}(DBObject_1.DBObject));
exports.Test = Test;
//# sourceMappingURL=Test.js.map
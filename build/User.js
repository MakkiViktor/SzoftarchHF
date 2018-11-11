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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    //TODO:A users tábla talán user
    function User(DB, Username, Password, Permission, FirstName, LastName) {
        if (Username === void 0) { Username = null; }
        if (Password === void 0) { Password = null; }
        if (Permission === void 0) { Permission = null; }
        if (FirstName === void 0) { FirstName = null; }
        if (LastName === void 0) { LastName = null; }
        var _this = _super.call(this, DB, "users") || this;
        _this.username = Username;
        _this.password = Password;
        _this.permission = Permission;
        _this.firstName = FirstName;
        _this.lastName = LastName;
        return _this;
    }
    User.prototype.load = function (json) {
        this.id = json['ID'];
        this.username = json['Username'];
        this.password = json['Password'];
        this.permission = json['Permission'];
        this.firstName = json['FirstName'];
        this.lastName = json['LastName'];
    };
    User.prototype.initializeDBParams = function () {
        this.DBparams = [
            { name: "Username", value: this.username, fk_table: null },
            { name: "Password", value: this.password, fk_table: null },
            { name: "Permission", value: this.permission, fk_table: null },
            { name: "FirstName", value: this.firstName, fk_table: null },
            { name: "LastName", value: this.lastName, fk_table: null }
        ];
    };
    return User;
}(DBObject_1.DBObject));
exports.User = User;
//# sourceMappingURL=User.js.map
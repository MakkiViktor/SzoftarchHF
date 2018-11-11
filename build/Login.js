"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var App_1 = require("./App");
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.validate = function () {
        document.addEventListener("submit", function () {
            var doc = document.forms['login'];
            var user = new User_1.User(App_1.App.db, doc['UserName'].value);
            if (user.loadFromDB()) {
                if (user.password === doc['UserPassword'].value) {
                    App_1.App.activeUser = user;
                    return true;
                }
            }
            else
                alert("hibás felhasználó név, vagy jelszzó");
            return false;
        });
    };
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=Login.js.map
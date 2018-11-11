"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBContext_1 = require("./DBContext");
var Login_1 = require("./Login");
//Tartalmazza az aktív usert és az app paramétereket
var App = /** @class */ (function () {
    function App() {
        this.login = new Login_1.Login();
        document.addEventListener("submit", this.login.validate);
    }
    App.main = function () {
        console.log("MAIN");
    };
    App.db = new DBContext_1.DBContext();
    return App;
}());
exports.App = App;
var app = new App();
//# sourceMappingURL=App.js.map
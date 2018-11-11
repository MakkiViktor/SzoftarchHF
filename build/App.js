"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBContext_1 = require("./DBContext");
var Login_1 = require("./Login");
//Tartalmazza az aktív usert és az app paramétereket
var App = /** @class */ (function () {
    function App() {
    }
    App.main = function () {
        console.log("MAIN");
        document.addEventListener("submit", this.login.validate);
    };
    App.db = new DBContext_1.DBContext();
    App.login = new Login_1.Login();
    return App;
}());
exports.App = App;
App.main();
//# sourceMappingURL=App.js.map
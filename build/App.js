"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBContext_1 = require("./DBContext");
//Tartalmazza az aktív usert és az app paramétereket
var App = /** @class */ (function () {
    function App() {
    }
    App.db = new DBContext_1.DBContext();
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBContext_1 = require("./DBContext");
var $ = require("jquery");
//Tartalmazza az aktív usert és az app paramétereket
var button = $("<button/>").html("click").on('click', function () {
    alert("Test");
});
$('body').append(button);
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.main = function () {
        console.log("MAIN");
    };
    App.db = new DBContext_1.DBContext();
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map
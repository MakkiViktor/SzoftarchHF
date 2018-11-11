"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DBContext = /** @class */ (function () {
    //itt a titkositásra valamit ki kellene találni
    function DBContext() {
        this.connection = mysql.createConnection({
            host: "tudvari.ddns.net:3306",
            user: "viktor",
            password: "viktor",
        });
    }
    //Ez atomi
    DBContext.prototype.execute = function (command) {
        var fields;
        this.connection.connect(this.exception);
        this.connection.query(command, function (err, result) {
            if (err)
                this.exception(err);
            fields = result;
        });
        this.connection.commit(this.exception);
        this.connection.end();
        return fields;
    };
    DBContext.prototype.exception = function (err) {
        if (err) {
            this.connection.rollback();
            this.connection.end();
            console.log(err);
            throw err;
        }
    };
    return DBContext;
}());
exports.DBContext = DBContext;
//# sourceMappingURL=DBContext.js.map
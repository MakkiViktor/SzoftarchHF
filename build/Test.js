"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test(ID, Permission, FirstName, LastName, DB) {
        this.getIDSql = "SELECT * FROM user WHERE ID = " + this.id + ";";
        this.updateSql = "UPDATE user SET FName = " + this.firstName + ", LName = " + this.lastName + ", Perm = " +
            this.permission + ", Password = " + this.password + ", UserName = " + this.userName + " WHERE ID = " + this.id + ";";
        this.insertSql = "INSERT INTO user (FName, LName, Perm, UserName, Password)" + "VALUES (" +
            this.firstName + "," + this.lastName + "," + this.permission + "," + this.userName + "," + this.password + ");";
        this.id = ID;
        this.permission = Permission;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.db = DB;
    }
    Test.prototype.save = function () {
        var json;
        var id;
        json = this.db.execute(this.getIDSql);
        id = json[0].ID;
        if (id === this.id) {
            this.db.execute(this.updateSql);
        }
        else
            this.db.execute(this.insertSql);
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=Test.js.map
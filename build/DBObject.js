"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBObject = /** @class */ (function () {
    //Átveszi a paramétereket, ID-t beállítja a sorok számára, Autoincrement miatt, azt DB-ben be kell állítani
    function DBObject(DB, TableName) {
        this.db = DB;
        this.tableName = TableName;
        var result = this.db.execute("SELECT COUNT(*) AS Amount FROM " + TableName);
        this.id = result[0]["Amount"];
        this.initializeDBParams();
        this.initializeCommands();
    }
    //A meglévő adatok alapján betölt a DB-ből
    DBObject.prototype.loadFromDB = function () {
        var dbParams;
        var json;
        this.DBparams.forEach(function (element) {
            if (element.value !== null)
                dbParams[dbParams.length] = element;
        });
        json = this.getMany(this.tableName, dbParams);
        if (json.length === 1) {
            this.load(this.getMany(this.tableName, dbParams)[0]);
            return true;
        }
        return false;
    };
    //t0bb paraméter szerint is lehet lekérdezni
    DBObject.prototype.getMany = function (table, keyValue) {
        this.initializeGetManyCommand(table, keyValue);
        return this.db.execute(this.getManySql);
    };
    DBObject.prototype.existsInDB = function () {
        return this.db.execute(this.getByIDSql)[0]['ID'] === this.id;
    };
    DBObject.prototype.save = function () {
        this.initializeCommands();
        if (this.existsInDB()) {
            this.db.execute(this.updateSql);
        }
        else
            this.db.execute(this.insertSql);
    };
    DBObject.prototype.fkSql = function (table, id) {
        return "(SELECT ID FROM " + table + " WHERE ID = " + id + " )";
    };
    DBObject.prototype.initializeGetManyCommand = function (table, keyValue) {
        this.getManySql = "SELECT * FROM " + table + "WHERE ";
        for (var i = 0; i < keyValue.length; i++) {
            if (i < keyValue.length - 1) {
                this.getManySql = this.getManySql + keyValue[i].name + " = " + keyValue[i].value + " AND ";
            }
            else
                this.getManySql = this.getManySql + keyValue[i].name + " = " + keyValue[i].value + ";";
        }
    };
    DBObject.prototype.initializeCommands = function () {
        this.getByIDSql = "SELECT * FROM " + this.tableName + " WHERE ID = " + this.id + ";";
        this.updateSql = "UPDATE " + this.tableName + " SET ";
        for (var i = 0; i < this.DBparams.length; i++) {
            if (this.DBparams[i].fk_table === null)
                this.updateSql = this.updateSql + this.DBparams[i].name + "= " + this.DBparams[i].value;
            else
                this.updateSql = this.updateSql + this.DBparams[i].name + "= " + this.fkSql(this.DBparams[i].fk_table, this.DBparams[i].value);
            if (i < this.DBparams.length - 1)
                this.updateSql = this.updateSql + ",";
        }
        this.updateSql = this.updateSql + "WHERE ID = " + this.id + ";";
        this.insertSql = "INSERT INTO " + this.tableName + " (";
        for (var i = 0; i < this.DBparams.length; i++) {
            this.insertSql = this.insertSql + this.DBparams[i].name;
            if (i < this.DBparams.length - 1)
                this.insertSql = this.insertSql + ",";
        }
        this.insertSql = this.insertSql + ")" + "VALUES (";
        for (var i = 0; i < this.DBparams.length; i++) {
            if (this.DBparams[i].fk_table === null)
                this.insertSql = this.insertSql + this.DBparams[i].value;
            else
                this.insertSql = this.insertSql + this.fkSql(this.DBparams[i].fk_table, this.DBparams[i].value);
            if (i < this.DBparams.length - 1)
                this.insertSql = this.insertSql + ",";
        }
        this.insertSql = this.insertSql + ");";
    };
    return DBObject;
}());
exports.DBObject = DBObject;
//# sourceMappingURL=DBObject.js.map
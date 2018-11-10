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
var User_1 = require("./User");
var Course = /** @class */ (function (_super) {
    __extends(Course, _super);
    function Course(DB, Teacher, Name, Level) {
        if (Teacher === void 0) { Teacher = null; }
        if (Name === void 0) { Name = null; }
        if (Level === void 0) { Level = null; }
        var _this = _super.call(this, DB, "user") || this;
        _this.teacher = Teacher;
        _this.name = Name;
        _this.level = Level;
        _this.loadStudents();
        return _this;
    }
    //TODO:A users tábla talán user
    Course.prototype.loadStudents = function () {
        var _this = this;
        this.getMany("user_course", [{ name: "CourseID", value: this.id, fk_table: null }]).forEach(function (element) {
            _this.getMany("user", [{ name: "ID", value: element[0]['UserID'], fk_table: null }]).forEach(function (element) {
                if (_this.students.length !== 0)
                    _this.students[_this.students.length] = new User_1.User(_this.db);
                else
                    _this.students[0] = new User_1.User(_this.db);
                _this.students[_this.students.length - 1].load(element);
            });
        });
        ;
    };
    //TODO:A users tábla talán user
    Course.prototype.load = function (json) {
        this.id = json['ID'];
        this.teacher = new User_1.User(this.db);
        this.teacher.load(this.getMany("user", [{ name: "ID", value: json['TeacherID'], fk_table: null }])[0]);
        this.name = json['Name'];
        this.level = json['Level'];
        this.loadStudents();
    };
    //TODO:A users tábla talán user
    Course.prototype.initializeDBParams = function () {
        this.DBparams = [
            { name: "Name", value: this.name, fk_table: null },
            { name: "Level", value: this.level, fk_table: null },
            { name: "TeacherID", value: this.teacher.id, fk_table: "user" }
        ];
    };
    return Course;
}(DBObject_1.DBObject));
exports.Course = Course;
//# sourceMappingURL=Course.js.map
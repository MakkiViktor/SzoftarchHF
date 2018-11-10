import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";
import { User } from './User';

export class Course extends DBObject{
    teacher: User;
    students: User[];
    name : string;
    level : number;

    constructor(DB : DBContext, Teacher:User= null, Name: string= null, Level : number= null){
        super(DB, "course");
        this.teacher = Teacher;
        this.name = Name;
        this.level = Level;
        this.loadStudents();
    }

    private loadStudents(){
        this.getMany("user_course", [{name: "CourseID", value : this.id, fk_table : null}]).forEach(element => {
            this.getMany("users", [{name : "ID", value : element[0]['UserID'], fk_table : null}]).forEach(element => {
                if(this.students.length !== 0)
                    this.students[this.students.length] = new User(this.db);
                else this.students[0] = new User(this.db);
                this.students[this.students.length - 1].load(element);
            });
        });;
    }
  
    load(json: JSON){
        this.id = json['ID'];
        this.teacher = new User(this.db);
        this.teacher.load(this.getMany("users", [{name : "ID", value : json['TeacherID'], fk_table : null}])[0]);
        this.name = json['Name'];
        this.level = json['Level'];
        this.loadStudents();
    }

    initializeDBParams(){
        this.DBparams = [
            { name : "Name", value : this.name, fk_table : null},
            { name : "Level", value : this.level, fk_table : null},
            { name : "TeacherID", value : this.teacher.id, fk_table : "users"}
        ]
    }
}
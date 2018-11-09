import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";

export class User extends DBObject{
    username : string;
    password : string;
    permission : number;
    firstName : string;
    lastName : string;  


    constructor(DB : DBContext, ID: number= null, Username: string, Password: string, Permission: number, FirstName: string, LastName: string){
        super(DB, ID, "users");
        this.username = Username;
        this.password = Password;
        this.permission = Permission;
        this.firstName = FirstName; 
        this.lastName = LastName;             
    }

    load(json: JSON){
        this.id = json['ID'];
        this.username = json['Username'];
        this.password = json['Password'];
        this.permission = json['Permission'];
        this.firstName = json['FirstName'];
        this.lastName = json['LastName'];
    }

    commit(){
        this.DBparams = [
            { name : "Username", value : this.username, fk_table : null},
            { name : "Password", value : this.password, fk_table : null },
            { name : "Permission", value : this.permission, fk_table : null },
            { name : "FirstName", value : this.firstName, fk_table : null },
            { name : "LastName", value : this.lastName, fk_table : null }
        ]
    }
}
import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";

export class User extends DBObject{
    permission : number;
    password : string;
    userName : string;
    firstName : string;
    lastName : string;  


    constructor(DB : DBContext, ID: number= null, Permission: number= null, FirstName: string= null, LastName: string= null){
        super(DB, ID, "user");
        this.permission = Permission;
        this.firstName = FirstName; this.lastName = LastName;             
    }

    load(json: JSON){
        this.id = json['ID'];
        this.permission = json['Perm'];
        this.password = json['Password'];
        this.firstName = json['FName'];
        this.lastName = json['LName'];
        this.userName = json['UserName'];
    }

    commit(){
        this.DBparams = [
            { name : "FName", value : this.firstName, fk_table : null },
            { name : "LName", value : this.lastName, fk_table : null },
            { name : "Perm", value : this.permission, fk_table : null },
            { name : "UserName", value : this.userName, fk_table : null},
            { name : "PassWord", value : this.password, fk_table : null }
        ]
    }
}
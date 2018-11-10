import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";

export class User extends DBObject{
    username : string;
    password : string;
    permission : number;
    firstName : string;
    lastName : string;  


    
    //TODO:A users tábla talán user
    constructor(DB : DBContext, Username: string = null, Password: string = null, Permission: number = null, FirstName: string = null, LastName: string = null){
        super(DB, "user");
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

    initializeDBParams(){
        this.DBparams = [
            { name : "Username", value : this.username, fk_table : null},
            { name : "Password", value : this.password, fk_table : null },
            { name : "Permission", value : this.permission, fk_table : null },
            { name : "FirstName", value : this.firstName, fk_table : null },
            { name : "LastName", value : this.lastName, fk_table : null }
        ]
    }
}
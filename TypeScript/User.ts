import { DALObj, DBContext } from './DBContext';

export class User implements DALObj{
    id : number;
    permission : number;
    password : string;
    userName : string;
    firstName : string;
    lastName : string;  
    private db : DBContext;  
    private getIDSql = "SELECT * FROM user WHERE ID = " + this.id + ";";
    private updateSql = "UPDATE user SET FName = " + this.firstName + ", LName = " + this.lastName + ", Perm = " +  
                        this.permission + ", Password = " + this.password + ", UserName = " + this.userName + " WHERE ID = " + this.id + ";";
    private insertSql = "INSERT INTO user (FName, LName, Perm, UserName, Password)" + "VALUES ("+
                        this.firstName + "," + this.lastName + "," + this.permission + "," + this.userName + "," + this.password + ");"       

    constructor( ID, Permission, FirstName, LastName , DB){
        this.id = ID; this.permission = Permission;
        this.firstName = FirstName; this.lastName = LastName;
        this.db = DB;
    }

    save(){
        let json : JSON;
        let id: number;                  
        json = this.db.execute(this.getIDSql);
        id = json[0].ID;
        if(id === this.id){
            this.db.execute(this.updateSql);
        }
        else
            this.db.execute(this.insertSql);
    }
}
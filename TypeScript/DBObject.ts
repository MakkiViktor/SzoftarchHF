import { DALObj, DBContext } from './DBContext';

export interface DBParam{
    name:string;
    value:any;
    fk_table: string;
}

export abstract class DBObject implements DALObj{
    protected getIDSql : string;
    protected updateSql : string;
    protected insertSql : string;

    protected getManySql : string;

    protected tableName : string;
    protected DBparams : DBParam[];

    id : number;
    protected db : DBContext;
    
    constructor(DB : DBContext, TableName: string){
        this.db = DB; 
        this.tableName = TableName;
        var result = this.db.execute("SELECT COUNT(*) AS Amount FROM " + TableName);
        this.id = result[0]["Amount"];
        this.initializeCommands(); 
    }

    //update-eli a parancsokat osztálytól függően
    abstract commit();

    abstract load(json : JSON);

    getMany(table : string, keyValue : DBParam){
        this.getManySql = "SELECT * FROM "+ table + "WHERE " + keyValue.name + " = " + keyValue.value + ";";  
        return this.db.execute(this.getManySql);
    }

    save(){
        if(this.id == null)
            return;      
        this.commit();
        if(this.db.execute(this.getIDSql)[0].ID === this.id){
            this.db.execute(this.updateSql);
        }
        else
            this.db.execute(this.insertSql);
    }

    private fkSql(table: string, id: number){
        return "(SELECT ID FROM " + table + " WHERE ID = " +  id +" )";
    }

    private initializeCommands(){

        this.getIDSql = "SELECT * FROM "+ this.tableName +" WHERE ID = " + this.id + ";";

        this.updateSql = "UPDATE " + this.tableName + " SET ";
        for(var i = 0; i < this.DBparams.length; i++){
            if(this.DBparams[i].fk_table === null)
                this.updateSql = this.updateSql + this.DBparams[i].name + "= " + this.DBparams[i].value;
            else 
                this.updateSql = this.updateSql + this.DBparams[i].name + "= " + this.fkSql(this.DBparams[i].fk_table, this.DBparams[i].value);
            if(i < this.DBparams.length - 1)
                this.updateSql = this.updateSql + ",";
        }
        this.updateSql = this.updateSql + "WHERE ID = "+ this.id + ";";


        this.insertSql = "INSERT INTO "+ this.tableName + " ("
        for(var i = 0; i < this.DBparams.length; i++){
            this.insertSql = this.insertSql + this.DBparams[i].name;
            if(i < this.DBparams.length - 1)
                this.insertSql = this.insertSql + ",";
        }
        this.insertSql = this.insertSql + ")" + "VALUES (";
        for(var i = 0; i < this.DBparams.length; i++){
            if(this.DBparams[i].fk_table === null)
                this.insertSql = this.insertSql + this.DBparams[i].value;
            else 
                this.insertSql = this.insertSql + this.fkSql(this.DBparams[i].fk_table, this.DBparams[i].value);
            if(i < this.DBparams.length - 1)
                this.insertSql = this.insertSql + ",";
        }
        this.insertSql = this.insertSql +");";
    }

}
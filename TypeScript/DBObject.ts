import { DALObj, DBContext } from './DBContext';

export interface DBParam{
    name:string;
    value:any;
    fk_table: string;
}

export abstract class DBObject implements DALObj{
    protected getByIDSql : string;
    protected updateSql : string;
    protected insertSql : string;

    protected getManySql : string;

    protected tableName : string;
    protected DBparams : DBParam[];

    id : number;
    protected db : DBContext;
    
    //Átveszi a paramétereket, ID-t beállítja a sorok számára, Autoincrement miatt, azt DB-ben be kell állítani
    constructor(DB : DBContext, TableName: string){
        this.db = DB; 
        this.tableName = TableName;
        let result = this.db.execute("SELECT COUNT(*) AS Amount FROM " + TableName);
        this.id = result[0]["Amount"];
        this.initializeDBParams();
        this.initializeCommands(); 
    }

    abstract initializeDBParams();

    abstract load(json : JSON);

    //A meglévő adatok alapján betölt a DB-ből
    loadFromDB() : boolean{
        let dbParams : DBParam[];
        let json : JSON[];
        this.DBparams.forEach(element => {
            if(element.value !== null)
                dbParams[dbParams.length] = element;
        });
        json = this.getMany(this.tableName, dbParams);
        if(json.length === 1){
            this.load(this.getMany(this.tableName, dbParams)[0]);
            return true;
        }
        return false;
    }

    //t0bb paraméter szerint is lehet lekérdezni
    getMany(table : string, keyValue : DBParam[]){
        this.initializeGetManyCommand(table, keyValue);
        return this.db.execute(this.getManySql);
    }

    existsInDB() {
        return this.db.execute(this.getByIDSql)[0]['ID'] === this.id;
    }

    save(){
        this.initializeCommands();
        if(this.existsInDB()){
            this.db.execute(this.updateSql);
        }
        else
            this.db.execute(this.insertSql);
    }

    private fkSql(table: string, id: number){
        return "(SELECT ID FROM " + table + " WHERE ID = " +  id +" )";
    }

    private initializeGetManyCommand(table : string, keyValue : DBParam[]){
        this.getManySql = "SELECT * FROM "+ table + "WHERE ";  
        for(var i = 0; i < keyValue.length; i++){
            if(i < keyValue.length - 1){
                this.getManySql = this.getManySql +  keyValue[i].name + " = " + keyValue[i].value + " AND ";
            }
            else
                this.getManySql = this.getManySql +  keyValue[i].name + " = " + keyValue[i].value + ";";
        }
    }

    private initializeCommands(){

        this.getByIDSql = "SELECT * FROM "+ this.tableName +" WHERE ID = " + this.id + ";";

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
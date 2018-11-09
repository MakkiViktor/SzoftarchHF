import mysql = require('mysql');

export interface DALObj{
    save();
}

export class DBContext{
    connection : mysql.Connection;
    
    //itt a titkositásra valamit ki kellene találni
    constructor(){
        this.connection = mysql.createConnection({
            host: "tudvari.ddns.net:3306",
            user : "viktor",
            password: "viktor"
        })
    }

    //Ez atomi
    execute(command: string,){
        let fields;
        this.connection.connect(this.exception);
        this.connection.query(command, function(err, result, fields){
            if (err)
                this.exception(err);
        });
        this.connection.commit(this.exception);
        this.connection.end();
        return fields;
    }

    private exception(err){
        this.connection.rollback();
        this.connection.end();
        console.log(err);
        throw err;
    }
}
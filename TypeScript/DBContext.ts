import mysql = require('mysql');


class DBContext{
    connection : mysql.Connection;
    
    //itt a titkositásra valamit ki kellene találni
    constructor(){
        this.connection = mysql.createConnection({
            host: "213.222.166.231:3306",
            user : "viktor",
            password: "viktor"
        })
    }

    execute(command: string){
        this.connection.connect(this.exception);
        this.connection.query(command, this.exception);
        this.connection.commit(this.exception);
        this.connection.end();
    }

    private exception(err){
        this.connection.end();
        console.log(err);
    }
}
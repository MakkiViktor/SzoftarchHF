import { User } from "./User";
import { DBContext } from "./DBContext";
import{ Login } from "./Login";
import * as $ from 'jquery';
//Tartalmazza az aktív usert és az app paramétereket

export class App{
    static activeUser : User;
    static db : DBContext = new DBContext();
    login : Login;
    
    constructor(){
        this.login = new Login();
        document.addEventListener("submit", this.login.validate);
    }

    static main(){
        console.log("MAIN");
    }
}

var app = new App();

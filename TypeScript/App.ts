import { User } from "./User";
import { DBContext } from "./DBContext";
import{ Login } from "./Login";
import * as $ from 'jquery';
//Tartalmazza az aktív usert és az app paramétereket

export class App{
    static activeUser : User;
    static db : DBContext = new DBContext();
    static login : Login = new Login();
    
    constructor(){
    }

    static main(){
        console.log("MAIN");
        document.addEventListener("submit", this.login.validate);
    }
}

App.main();

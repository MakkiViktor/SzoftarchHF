import { User } from "./User";
import {App} from "./App";

class Login{
    constructor(){}

    validation() : boolean{
        let doc : JSON = document.forms['login'];
        let user : User = new User(App.db, doc['UserName']);
        if(user.loadFromDB()){
            if(user.password === doc['UserPassword']){
                App.activeUser = user;
                return true;
            }
        }
        else alert("hibás felhasználó név, vagy jelszzó");
        return false;
    }
}
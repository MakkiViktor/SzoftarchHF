import { User } from "./User";
import {App} from "./App";

export class Login{
    constructor(){}

    validate() : boolean{
        let doc = document.forms['login'];
        let user : User = new User(App.db, doc['UserName'].value);
        if(user.loadFromDB()){
            if(user.password === doc['UserPassword'].value){
                App.activeUser = user;
                return true;
            }
        }
        else alert("hibás felhasználó név, vagy jelszzó");
        return false;
    }
}
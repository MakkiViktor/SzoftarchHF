import { User } from "./User";
import { DBContext } from "./DBContext";
import * as $ from 'jquery';

//Tartalmazza az aktív usert és az app paramétereket

var button = $("<button/>").html("click").on('click', function(){
    alert("Test");
})

$('body').append(button);


export class App{
    static activeUser : User;
    static db : DBContext = new DBContext();

    main(){
        console.log("MAIN");
    }
}
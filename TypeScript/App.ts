import { User } from "./User";
import { DBContext } from "./DBContext";

//Tartalmazza az aktív usert és az app paramétereket

export class App{
    static activeUser : User;
    static db : DBContext = new DBContext();

}
import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";

export class Dictionary extends DBObject{
    language1 : string;
    language2 : string;  


    constructor(DB : DBContext, Language1: string= null, Language2: string= null){
        super(DB, "dictionaries");
        this.language1 = Language1;
        this.language2 = Language2;             
    }

    load(json: JSON){
        this.id = json['ID'].value;
        this.language1 = json['Lang1'].value;
        this.language2 = json['Lang2'].value;
    }

    initializeDBParams(){
        this.DBparams = [
            { name : "Lang1", value : this.language1, fk_table : null },
            { name : "Lang2", value : this.language2, fk_table : null }
        ]
    }
}
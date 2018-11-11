import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";
import { Dictionary} from './Dictionary';
import { User } from './User';
import { Word } from './Words';


export class Test extends DBObject{
    dictionary : Dictionary;
    creator : User;  
    name : string;
    level : number;
    words : Word[];

    constructor(DB : DBContext, Dictionary : Dictionary = null, Creator : User = null, Level : number= null){
        super(DB, "test");
        this.dictionary = Dictionary;
        this.creator = Creator;
        this.level = this.level;
        this.loadWords();
        this.initializeDBParams();
    }

    private loadWords(){
        this.getMany("test_words", [{name: "TestID", value : this.id, fk_table : null}]).forEach(element => {
            this.getMany("Words", [{name : "ID", value : element[0]['WordID'].value, fk_table : null}]).forEach(element2 => {
                this.words[this.words.length] = new Word(this.db);
                this.words[this.words.length - 1].load(element2);
            });
        });;
    }

    load(json: JSON){
        this.id = json['ID'].value;
        this.creator = new User(this.db);
        this.creator.load(this.getMany("users", [{name : "ID", value : json['CreatorID'].value, fk_table : null}])[0]);
        this.dictionary = new Dictionary(this.db);
        this.dictionary.load(this.getMany("dictionaries", [{name : "ID", value : json['DictID'].value, fk_table : null}])[0]);
        this.level = json['Level'].value;
        this.loadWords();
    }

    initializeDBParams(){
        this.DBparams = [
            { name : "Name", value : this.name, fk_table : null },
            { name : "Level", value : this.level, fk_table : null },
            { name : "DictID", value : this.dictionary.id, fk_table : "dictionaries" },
            { name : "CreatorID", value : this.creator.id, fk_table : "users"}
        ]
    }
}
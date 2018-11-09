import { DALObj, DBContext } from './DBContext';
import {DBObject} from "./DBObject";
import { Dictionary } from './Dictionary';

export class Word extends DBObject{
    word1: string;
    word2 : string; 
    dictionary: Dictionary; 


    constructor(DB : DBContext, ID : number= null, Word1: string= null, Word2: string= null, Dictionary : Dictionary= null){
        super(DB, ID, "Words");
        this.word1 = Word1;
        this.word2 = Word2;
        this.dictionary = Dictionary;         
    }

    load(json: JSON){
        this.id = json['ID'];
        this.word1 = json['word1'];
        this.word2 = json['word2'];
        this.dictionary = new Dictionary(this.db);
        this.dictionary.load(this.getMany("dictionaries", {name : "ID", value : json['DictID'], fk_table : null}))
    }
    commit(){
        this.DBparams = [
            { name : "word1", value : this.word1, fk_table : null },
            { name : "word2", value : this.word2, fk_table : null },
            { name : "DictID", value : this.dictionary.id, fk_table : "dictionaries" }
        ]
    }
}
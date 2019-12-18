import SymbolTable from "./SymbolTable";

export default function checkingSemantics(){
    var ST=new SymbolTable()
    if(!ST.insertST("a","int",1)){
        console.log("Redeclation Error")
    }
    if(!ST.insertST("a","int",2)){
        console.log("Redeclation Error")
    }
    if(!ST.insertST("a","int",3)){
        console.log("Redeclation Error")
    }
    if(!ST.insertST("a","int",1)){
        console.log("Redeclation Error this")
    }   
    ST.display()
}
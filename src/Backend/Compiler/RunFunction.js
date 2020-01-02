import { store } from './../../Redux/store';
import { lexicalAnalyzer } from '../LexicalAnalyzer/lexicalAnalyzer';
import { SyntaxAnalyzer } from '../SyntaxAnalyzer/SyntaxAnalyzer';
import SymbolTable from "../SemanticAnalyzer/SymbolTable"
import { savingIntermediateCode } from '../ICG/ICGfunctions';
import { saveTokenSetAs } from '../fileHandler';

export const RunCompiler=(text)=>{
    console.clear()
    var text = store.getState().files.selectedFile.text
    var token= lexicalAnalyzer(text)
    console.log("tokenset",token)
    saveTokenSetAs(token)
    var ST=new SymbolTable()
    if(SyntaxAnalyzer(token,ST)){
        console.log("Valid Syntax | Congratulations")
        console.log("ST",ST)
        savingIntermediateCode()
    }

}
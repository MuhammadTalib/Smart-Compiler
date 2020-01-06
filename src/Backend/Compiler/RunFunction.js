import { store } from './../../Redux/store';
import { lexicalAnalyzer } from '../LexicalAnalyzer/lexicalAnalyzer';
import { SyntaxAnalyzer } from '../SyntaxAnalyzer/SyntaxAnalyzer';
import SymbolTable from "../SemanticAnalyzer/SymbolTable"
import { savingIntermediateCode,initICG } from '../ICG/ICGfunctions';
import { saveTokenSetAs } from '../fileHandler';

export const RunCompiler=(text)=>{
    console.clear()
    text = store.getState().files.selectedFile.text
    var token= lexicalAnalyzer(text)
    console.log("tokenset",token)
    initICG()
    saveTokenSetAs(token)
    var ST=new SymbolTable()
    if(SyntaxAnalyzer(token,ST)){
        console.log("Valid Syntax | Congratulations")
        console.log("ST",ST)
    }
    
    savingIntermediateCode()

}
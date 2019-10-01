import { wordBreaker } from './wordBreaker';
import { isIdentifier, isKeyWord, isPunctuator, isOperator, isStringConstant,isIntConstant, isFloatConstant } from './validationFunctions';
import { isAlphabet } from './validationFunctions';
import { saveTokenSetAs } from '../fileHandler';

export const lexicalAnalyzer = (text) => {
    console.log("lexical analyzer starts...")

    var i, temp,linenum=0,tokenSet=[]

    for (i = 0; i < text.length;) { 
        temp = wordBreaker(text, i,linenum)
        //console.log("temp",temp)
        if(temp!==undefined){
            i = temp.index
            linenum=temp.lineNum
            if(temp.word[0]==="_"){
                if(isIdentifier(temp.word)){
                    tokenSet.push({CP:"ID",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
                }
                else{
                    tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
                }
            }
            else if(isAlphabet(temp.word[0])){
                if(isKeyWord(temp.word)){
                    tokenSet.push({CP:"KW",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
                }
                else if(isIdentifier(temp.word)){
                    tokenSet.push({CP:"ID",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
                }
                else{
                    tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
                }
            }
            else if(isPunctuator(temp.word)){
                tokenSet.push({CP:temp.word,VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }
            else if(isOperator(temp.word)){
                tokenSet.push({CP:isOperator(temp.word),VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }
            else if(isIntConstant(temp.word)){
                console.log("int ")
                tokenSet.push({CP:"INT_CONST",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }
            else if(isStringConstant(temp.word)){
                console.log("string ")
                var t=temp.word.replace('"','').replace('"','').replace("'",'').replace("'",'')
                tokenSet.push({CP:"STRING_CONST",VP:t,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }
            else if(isFloatConstant(temp.word)){
                console.log("float")
                tokenSet.push({CP:"FLOAT_CONST",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }   
            else{
                tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
            }
        }else{
            i++
        }
    }
    saveTokenSetAs(tokenSet)


}


// import { wordBreaker } from './wordBreaker';
// import { isIdentifier, isKeyWord, isPunctuator, isOperator, isStringConstant,isIntConstant, isFloatConstant } from './validationFunctions';
// import { isAlphabet } from './validationFunctions';
// import { saveTokenSetAs } from '../fileHandler';

// export const lexicalAnalyzer = (text) => {
//     console.log("lexical analyzer starts...")

//     var i, temp,linenum=0,tokenSet=[]

//     for (i = 0; i < text.length;) {
//         temp = wordBreaker(text, i,linenum)
//         if(temp!==undefined){
//             i = temp.index
//             linenum=temp.lineNum
//             if(temp.word[0]==="_"){
//                 if(isIdentifier(temp.word)){
//                     tokenSet.push({CP:"ID",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//                 }
//                 else{
//                     tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//                 }
//             }
//             else if(isAlphabet(temp.word[0])){
//                 if(isKeyWord(temp.word)){
//                     tokenSet.push({CP:"KW",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//                 }
//                 else if(isIdentifier(temp.word)){
//                     tokenSet.push({CP:"ID",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//                 }
//                 else{
//                     tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//                 }
//             }
//             else if(isPunctuator(temp.word)){
//                 tokenSet.push({CP:temp.word,VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }
//             else if(isOperator(temp.word)){
//                 tokenSet.push({CP:isOperator(temp.word),VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }
//             else if(isIntConstant(temp.word)){
//                 tokenSet.push({CP:"CONST",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }
//             else if(isStringConstant(temp.word)){
//                 var t=temp.word.replace('"','').replace('"','').replace("'",'').replace("'",'')
//                 tokenSet.push({CP:"CONST",VP:t,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }
//             else if(isFloatConstant(temp.word)){
//                 tokenSet.push({CP:"CONST",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }   
//             else{
//                 tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
//             }
//         }else{
//             i++
//         }
//     }

//     console.log("tokens",tokenSet)
//     saveTokenSetAs(tokenSet)


// }

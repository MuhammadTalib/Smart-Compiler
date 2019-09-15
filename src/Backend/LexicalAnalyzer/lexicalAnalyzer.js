import { wordBreaker } from './wordBreaker';
import { isIdentifier, isKeyWord, isPunctuator, isOperator } from './validationFunctions';
import { isAlphabet } from './validationFunctions';

export const lexicalAnalyzer = (text) => {
    console.log("lexical analyzer starts...")

    var i, temp,linenum=0,tokenSet=[]
    console.log("length",text.length)

    for (i = 0; i < text.length;) {
        temp = wordBreaker(text, i,linenum)
        console.log("temp", temp)
        i = temp.index
        linenum=temp.lineNum
        console.log("i",i,temp.lineNum)
        console.log("temp[o]",temp.word[0])
        if(temp.word[0]==="_"){
            console.log("word",temp.word,isIdentifier(temp.word))
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
        else{
            tokenSet.push({CP:"Invalid Lexene",VP:temp.word,line:temp.lineNum,index:temp.index-temp.word.length+1})
        }
    }
    console.log("tokens",tokenSet)



}
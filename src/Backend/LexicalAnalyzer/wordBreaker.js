import { isPunctuator,isNumber } from "./validationFunctions"

export const wordBreaker = (text, index,lineNum) => {
    var word = "",num="",str="",strstart=0
    var i
    for (i = index; i < text.length; i++) {
        
        if(text[i] === "\n") {
            lineNum+=1
            if (word.length>0) return { index: i, word,lineNum }
            if (num.length>0) return { index: i, word:num,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }
        }
        else if(text[i]==="\"" || str.length>0){
            if(strstart===2){
                if (str.length>0) return { index: i, word:str,lineNum }
            }
            if(text[i]==="\""){
                if(strstart===0) strstart=1
                else strstart=2
            }
            str=str+text[i]
        }
        else if (text[i] === " " ) {
            if (word.length>0) return { index: i, word ,lineNum}
            if (num.length>0) return { index: i, word:num,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }
        }
        else if ((text[i] >= "0" && text[i] <= "9") || (text[i] >= "A" && text[i] <= "Z")
                ||(text[i] >= "a" && text[i] <= "z") || text[i]==="_"
                ||text[i]==="." ) {
                    if (str.length>0) return { index: i, word:str,lineNum }
            if(word.length===0 && ((text[i] >= "0" && text[i] <= "9"))){
                 num=num+text[i]
            }
            else if(text[i]==="."){
                if(word.length>0)  return { index: i, word,lineNum }
                if(num.indexOf(".")===-1){
                    if(!(text[i+1] >= "0" && text[i+1] <= "9")){
                        if(num.length>0)  return { index: i, word:num ,lineNum}
                        return { index: i+1, word:text[i],lineNum }
                    }
                    else{
                        num=num+text[i]
                    }
                }
                else{
                    return { index: i, word:num,lineNum }
                }
            }
            else {
                if(num.length>0) { 
                    return { index: i, word:num,lineNum }
                }
                word = word + text[i]
            }
        }
        else if (text[i] === "+" ||      //Those operators that can appear 2 at a time and assignment operators
            text[i] === "-" ||
            text[i] === "/" ||
            text[i] === "=" ||
            text[i] === "&" ||
            text[i] === "|" ||
            text[i] === "<" ||
            text[i] === ">"
        ){ 
            if (word.length>0) return { index: i, word,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }

            if (text[i + 1] === text[i]) {
                if (num.length>0) return { index: i, word:num,lineNum }

                word = word + text[i]
                word = word + text[i+1]
                i++
                return { index: i+1, word,lineNum}
            }
            else if (text[i + 1] === "=") {
                if (num.length>0) return { index: i, word:num,lineNum }
                word = word + text[i]
                word = word + text[i+1]
                i++
                return { index: i+1, word,lineNum}
            }
            else if(num.length===0 && text[i] === "+" && isNumber(text[i+1]) && !isNumber(text[i-1])){
                num=num+text[i]
            }
            else if(num.length===0 && text[i] === "-" && isNumber(text[i+1]) && !isNumber(text[i-1])){
               num=num+text[i]
            }
            else {
                if (num.length>0) return { index: i, word:num,lineNum }
                word = word + text[i]
                if (word.length>0) return { index: i+1, word,lineNum}
            }
        }
        else if (text[i] === "*" || text[i] === "%" || text[i] === "!") {   // those operators that appears ones
            if (word.length>0) return { index: i, word ,lineNum}
            if (str.length>0) return { index: i, word:str,lineNum }
            word = word + text[i]
            if (text[i + 1] === "=") {
                word = word + text[i+1]
                i++
            }
            return { index: i+1, word,lineNum }
        }
        else if (isPunctuator(text[i])) {
            if (word.length>0) return { index: i, word,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }
            else return { index: i+1, word:text[i],lineNum }
        }
        else if(text[i] === "_"){
            word = word + text[i]
        }
        else {
            word = word + text[i]
        }
    }
    if (word.length>0) return { index: i, word ,lineNum}
    if (num.length>0) return { index: i, word:num,lineNum }
    if (str.length>0) return { index: i, word:str,lineNum }

}
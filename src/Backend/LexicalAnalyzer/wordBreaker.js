import { isPunctuator,isNumber ,isOperator, isAlphabet} from "./validationFunctions"

export const wordBreaker = (text, index,lineNum) => {
    var word = "",num="",str="",strstart=0,str2="",str2start=0,error=""
    var i
    for (i = index; i < text.length; i++) {
        //console.log("text[i]",text[i])
        if(text[i] === "\n") {
            if (word.length>0) return { index: i, word,lineNum }
            if (num.length>0) return { index: i, word:num,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }
            if (str2.length>0) return { index: i, word:str2,lineNum }
            if (error.length>0) return { index: i, word:error,lineNum }
            lineNum+=1
        }
        else if((text[i]==="\"" || str.length>0)){
            if (error.length>0) return { index: i, word:error,lineNum }
            if (word.length>0) return { index: i, word ,lineNum}
            if (num.length>0) return { index: i, word:num,lineNum }

            if(strstart===2){
                if (str.length>0) return { index: i, word:str,lineNum }
            }
            if(text[i]==="\""){
                if(strstart===0){
                    strstart=1
                }
                else{ 
                    str=str+text[i]
                    return { index: i+1, word:str,lineNum }
                }
            }
            str=str+text[i]
        }
        else if(text[i]==="'" || str2.length>0){
            if (error.length>0) return { index: i, word:error,lineNum }
            if (word.length>0) return { index: i, word ,lineNum}
            if (num.length>0) return { index: i, word:num,lineNum }

            if(str2start===2){
                if (str2.length>0) return { index: i, word:str2,lineNum }
            }
            if(text[i]==="'"){
                if(str2start===0) str2start=1
                else str2start=2
            }
            str2=str2+text[i]
        }
        else if(text[i]==="/" && text[i+1]==="/" ){
           // console.log("commenting")
            i++
            while(text[i+1]!=="\n"){
                i++
            }
        }
        else if (text[i] === " " || isOperator(text[i]) ) {
            if (word.length>0) return { index: i, word ,lineNum}
            if (num.length>0) return { index: i, word:num,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }
            if (str2.length>0) return { index: i, word:str2,lineNum }
            if (error.length>0) return { index: i, word:error,lineNum }
            
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
                if (str2.length>0) return { index: i, word:str2,lineNum }
                if (error.length>0) return { index: i, word:error,lineNum }
    
                if(text[i]==="=" && text[i+1]===">"){
                    if (num.length>0) return { index: i, word:num,lineNum }
    
                    word = word + text[i]
                    word = word + text[i+1]
                    i++
                    console.log("returning",word)
                    return { index: i+1, word,lineNum}
                }
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
                else if(num.length===0 && text[i] === "+" && !isNumber(text[i-1]) && !isAlphabet(text[i-1]) && text[i-1]!==")" ){
                    num=num+text[i]
                }
                else if(num.length===0 && text[i] === "-" && isNumber(text[i+1]) && !isNumber(text[i-1]) && !isAlphabet(text[i-1]) && text[i-1]!==")"){
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
                if (str2.length>0) return { index: i, word:str2,lineNum }
                if (error.length>0) return { index: i, word:error,lineNum }
    
                word = word + text[i]
                if (text[i + 1] === "=") {
                    word = word + text[i+1]
                    i++
                }
                return { index: i+1, word,lineNum }
            }
        }
        else if ((text[i] >= "0" && text[i] <= "9") || (text[i] >= "A" && text[i] <= "Z")
                ||(text[i] >= "a" && text[i] <= "z") || text[i]==="_"
                ||text[i]==="." ) {
            
             if(text[i]==="." && error.length>0){
                return { index: i, word:error,lineNum }
            }
            if (error.length>0){  
                error=error+text[i]
            }            
            else if (str.length>0) return { index: i, word:str,lineNum }        
            else if (str2.length>0) return { index: i, word:str2,lineNum }
            
            else if(num.length>0 && !(text[i] >= "0" && text[i] <= "9") && text[i]!=="." ){
                error=num
                error=error+text[i]
                num=""
            }
            else if(word.length===0 && error.length===0 && ((text[i] >= "0" && text[i] <= "9"))){
                num=num+text[i]   
            }
            else if(text[i]==="."){
                if(word.length>0){
                    return { index: i, word,lineNum }
                }
                else if(error.length>0){
                    return { index: i, word:error,lineNum }
                }
                else if(text[i]==="." && text[i+1]==="." && text[i+2]==="."){
                    word="..."
                    return { index: i+3, word:word,lineNum }
                } 
                else if(num.indexOf(".")===-1){
                    if (error.length>0){
                        return { index: i, word:error,lineNum }
                    } 
                    else if(!(text[i+1] >= "0" && text[i+1] <= "9")){
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
        else if (isPunctuator(text[i])) {
            if (error.length>0) return { index: i, word:error,lineNum }
            if (word.length>0) return { index: i, word,lineNum }
            if (num.length>0) return { index: i, word:num,lineNum }
            if (str.length>0) return { index: i, word:str,lineNum }     
            if (str2.length>0) return { index: i, word:str2,lineNum }

            else return { index: i+1, word:text[i],lineNum }
        }
        else if(text[i] === "_" || (text[i] >= "A" && text[i] <= "Z") ||(text[i] >= "a" && text[i] <= "z")){
            word = word + text[i]
        }
        else {
            if (str.length>0) return { index: i, word:str,lineNum }     
            if (str2.length>0) return { index: i, word:str2,lineNum }
            if(word.length>0){
                error=word
                error=error+text[i]
                word=""
            } else {
                error=error+text[i]
            }
        }
    }
    if(error.length>0) return { index: i, word:error,lineNum }
    if (word.length>0) return { index: i, word ,lineNum}
    if (num.length>0) return { index: i, word:num,lineNum }
    if (str.length>0) return { index: i, word:str,lineNum }     
    if (str2.length>0) return { index: i, word:str2,lineNum }

}
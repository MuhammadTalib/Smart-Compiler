import { operators } from "./operators"
import { punctuators } from "./punctuator"
import { keywords } from './keywords';

export const isKeyWord = (word) => {
    var i
    for (i in keywords) {
        if (keywords[i].word === word) {
            return {word:word,class:keywords[i].class}
        }
    }
    return false
}
export const isPunctuator = (word) => {
    var i
    for (i in punctuators) {
        if (punctuators[i].punctuator === word) {
            return true
        }
    }
    return false
}
export const isOperator = (word) => {
    var i
    for (i in operators) {
        if (operators[i].operator === word) {
            return operators[i].class
        }
    }
    return false
}
export const isIdentifier = (word) => {
    var a = /^([A-Z]|[a-z])\w*$/.test(word)
    return a
}
export const isStringConstant = (word) => {
    var a=/^"(.*)"$/.test(word) || /^'(.*)'$/.test(word)
    return a
}
export const isIntConstant = (word) => {
    var a = /^[+|-]\d$/.test(word)
    return a
}
export const isFloatConstant = (word) => {
    var a = /^([+|-]?\d+)?.\d*$/.test(word)
    return a
}
export const CharConstant = (word) => {

}
export const isAlphabet=(l)=>{
    return ((l>='a'&&l<='z')||(l>='A'&&l<='Z'))
}
export const isNumber=(l)=>{
    return (l>="0"&&l<="9")
}
export const isConst=(c)=>{
    if(c==="INT_CONST" || c==="STRING_CONST" || c==="FLOAT_CONST"){
        return true
    }
}
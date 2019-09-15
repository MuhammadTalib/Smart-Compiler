import { operators } from "./operators"
import { punctuators } from "./punctuator"
import { keywords } from './keywords';

export const isKeyWord = (word) => {
    var i
    for (i in keywords) {
        if (keywords[i].word === word) {
            return true
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
export const isStringContant = (word) => {

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
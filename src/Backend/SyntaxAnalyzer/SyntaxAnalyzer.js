import { find, Start1, DEFS1, DEFS3, DEFS2, MST1, MST2, CLASS_MST1,
    //DP11, 
    SST11, SSTNEXT1, ELSE1, FOR_PARAM_21, FirstOfEXP, 
    FirstOfINIT_VALUE_2, NextConstDT1, GT_INIT1, GT_INIT2, CALLING_PARAMS1,
    DEC11, E1, EXP11, CONST, EXP12,
    N_INIT_VALUE1, ARRAY1, ARRAY_VALUES1, FirstOfMOV, FirstOfMergedInit, 
    FollowOfMergedN_ARR, FollowOfINIT_VALUE1, FirstOfOTHER_VALUE, DEC21 } from "./SelectionSets"
import SymbolTable from "../SemanticAnalyzer/SymbolTable"
import React from 'react';


var i,t,syntax=true,inFuncP=false
var ST=new SymbolTable()
// var a={a:{a:0,b:()=>{}}}
// a.a.b().a=2
// console.log("a",a)

function syntaxFalse(){
    syntax=false
    if(inFuncP===true) syntax=true
    return syntax
}
export const SyntaxAnalyzer=(token)=>{
    syntax=true
    i=0
    t=token
    if(START()){
        if(t[i].CP==="$"){
            i++
            console.log("VALID SYNTAX! Congratulations!")
            console.log("ST",ST.ScopeTable)
            console.log("CT",ST.ClassTable)
        }
    }
    else {
        console.log("token",t[i])
        console.log("INVALID SYNTAX at line "+t[i].line+":"+t[i].index)
    }
    return false
}
function START(){
    var scope=ST.createScope()
    if(find(Start1,t[i].CP)){
        if(DEFS(scope)){
            ST.deleteScope()
            return true
        }
    }
    return false
}
function DEFS(scope){
    if(t[i].CP==="$"){
        return true
    }
    else if(find(DEFS1,t[i].CP)){
        if(MST(scope)){
            if(DEFS(scope)){
                return true
            }
        }
    }
    else if(find(DEFS2,t[i].CP)){
        if(CLASS(scope)){
            if(DEFS(scope)){
                return true
            }
        }
    }
    else if(find(DEFS3,t[i].CP)){
        if(FUNCTION_DEC()){
            if(DEFS(scope)){
                return true
            }
        }
    }
    return false
}
function MST(scope,RT) {
    if(find(MST1,t[i].CP)){
        if(SST(scope,RT)){
            if(MST(scope,RT)){
                return true
            }
        }
    }
    else if(find(MST2,t[i].CP)){
        return true
    }
    return false
}
function SST(scope,RT){
    if(SST1(scope,RT)){
        if(find(SSTNEXT1, t[i].CP)){
            return true
        }
    }
    return false
}
function SST1(scope, RT){
    if(find(SST11,t[i].CP)){
        if(syntax && t[i].CP==="DT" && DEC(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="while" && WHILE(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="for" && FOR(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if( syntax && t[i].CP==="do" && DO_WHILE(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="const" && CONST_DT(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="inc_dec" && INC_DEC_PRE(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="if" && IF_ELSE(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="switch" && SWITCH_CASE(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="return" && RETURN(scope,RT)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        } 
        else if(syntax && t[i].CP==="ID" && GTSWID(scope)){
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
    }
    return false
}
// function SSTNEXT(){
//     if(find(SSTNEXT1, t[i].CP)){
//         return true
//     }
//     return false;
// }
function WHILE(scope){
    if(t[i].CP==="while"){
        i++
        if(t[i].CP==="("){
            i++
            var T=React.createRef()
            if(EXP(T,scope)){
               var Tr=ST.compatibility(T.current,"bool","cond")
               if(!Tr){ console.log("Condition Type Mismatch at line", t[i].line)}
               if(t[i].CP===")"){
                   i++
                   if(BODY(scope)){
                       return true
                   }
               } 
            }
        }
    }
    return syntaxFalse()
}
function FOR(){
    if(t[i].CP==="for"){
        i++
        if(t[i].CP==="("){
            i++
            if(FOR_PARAM()){
                if(t[i].CP===")"){
                    i++
                    if(BODY()){
                        return true
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function FOR_PARAM(){
    if(t[i].CP==="ID"){
        i++
        if(FOR_PARAM_2()){
            return true
        }
    }
    else if(t[i].CP==="DT"){
        if(DEC()){
            if(t[i].CP===";"){
                i++
                if(C2()){
                    if(t[i].CP===";"){
                        i++
                        if(C3()){
                            return true
                        }
                    }
                }
            }
        }
    }
    else if(t[i].CP===";"){
        i++
        if(C2()){
            if(t[i].CP===";"){
                i++
                if(C3()){
                    return true
                }
            }
        }
    }
    return false
}
function FOR_PARAM_2(){
    if(find(FOR_PARAM_21,t[i].CP)){
        if(INIT_VALUE()){
            if(t[i].CP==="AOR" || t[i].CP==="AOP"){
                i++
                if(INIT_VALUE_2()){
                    if(t[i].CP===";"){
                        i++
                        if(C2()){
                            if(t[i].CP===";"){
                                i++
                                if(C3()){
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if(t[i].CP==="in"){
        if(RANGE_FOR()){
            return true
        }
    }
    return false
}
function RANGE_FOR(){
    if(t[i].CP==="in"){
        i++
        if(FOR_R()){
            return true
        }
    }
}
function FOR_R(){
    if(t[i].CP==="ID"){
        i++
        if(N_INIT_VALUE()){
            return true
        }
    }
}
function C2(){
    if(find(FirstOfEXP,t[i].CP)){
        if(EXP()){
            return true
        }
    }
    else if(t[i].CP===";"){
        return true
    }
    return false
}
function C3(){
    if(t[i].CP==="ID"){
        if(GTSWID()){
            return true
        }
    }
    else if(t[i].CP===")"){
        return true
    }
    return false
}
function DO_WHILE(){
    if(t[i].CP==="do"){
        i++
        if(BODY()){
            if(t[i].CP==="while"){
                i++
                if(t[i].CP==="("){
                    i++
                    if(EXP()){
                        if(t[i].CP===")"){
                            i++
                            return true
                        }
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function CONST_DT(){
    if(t[i].CP==="const"){
        i++
        if(t[i].CP==="ID"){
            i++
            if(CONST_DT1()){
                if(NEXT_CONST_DT()){
                    return true
                }
            }
        }
    }
    return syntaxFalse()
}
function CONST_DT1(){
    if(t[i].CP==="AOR"||t[i].CP==="AOP"){
        i++
        if(CONST_DT2()){
            return true
        }
    }
    return false
}
function CONST_DT2(){
    if(t[i].CP==="new"){
        i++
        if(t[i].CP==="ID"){
            i++
            if(t[i].CP==="("){
                i++
                if(CALLING_PARAM()){
                    if(t[i].CP===")"){
                        i++
                        return true
                    }
                }
            }
        }
    }
    
    else if(t[i].CP==="("){
        i++
        if(DEC_PARAMS()){
            if(t[i].CP===")"){
                i++
                if(t[i].CP==="=>"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        if(MST()){
                            if(t[i].CP==="}"){
                                i++
                                return true
                            }
                        }
                    }

                }
            }
        }
    }
    else if(find(FirstOfINIT_VALUE_2,t[i].CP)){
        if(INIT_VALUE_2()){
            return true
        }
    }
    else if(t[i].CP==="function"){
        i++
        if(t[i].CP==="("){
            i++
            if(DEC_PARAMS()){
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        if(MST()){
                            if(t[i].CP==="}"){
                                i++
                                return true
                            }
                        }
                    }
                }
            }
            return true
        }
    }
    return false
}
function NEXT_CONST_DT(){
    if(t[i].CP===","){
        if(DEC_PARAMS()){
            return true
        }
    }
    else if(find(NextConstDT1,t[i].CP)){
        return true
    }
    return false
}
function GTSWID(){
    if(t[i].CP==="ID"){
        i++
        if(INIT_VALUE()){
            if(NEXT_GTSWID()){
                return true
            }
        }
    }
    return false
}
function NEXT_GTSWID(){
    if(t[i].CP==="inc_dec"){
        i++
        return true
    }
    else if(t[i].CP==="("){
        i++
        if(CALLING_PARAM()){
            if(t[i].CP===")"){
                i++
                return true
            }
        }
    }
    else if(t[i].CP==="AOR" || t[i].CP==="AOP"){
        i++
        if(GTSDEC()){
            return true
        }
    }
    return false
}
function GTSDEC(){
    if(find(DEC21,t[i].CP)){
        if(DEC2()){
            return true
        }
    }
    else if(t[i].CP==="{"){
        if(OBJECT()){
            return true
        }
    }
    else if(t[i].CP==="["){
        if(ARRAY()){
            return true
        }
    }
    return false
}
function GT_INIT(){
    if(find(GT_INIT1,t[i].CP)){
        return true
    }
    else if(t[i].CP==="(" || t[i].CP==="."){
        if(GT_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(GT_ARR()){
                    return true
                }
            }
        }
    }
    return false
}
function GT_VALUE(){
    if(t[i].CP==="."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(NEXT_GT()){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        if(CALLING_PARAM()){
            if(t[i].CP===")"){
                i++
                if(GT_INIT()){
                    return true
                }
            }
        }
    }
    return false
}
function GT_ARR(){
    if(find(GT_INIT1,t[i].CP)){
        return true
    }
    else if(t[i].CP==="(" || t[i].CP==="."){
        if(GT_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(GT_ARR2()){
                    return true
                }
            }
        }
    }
}
function GT_ARR2(){
    if(find(GT_INIT1,t[i].CP)){
        return true
    }
    else if(t[i].CP==="(" || t[i].CP==="."){
        if(GT_VALUE()){
            return true
        }
    }
}
function NEXT_GT(){
    if(find(GT_INIT2,t[i].CP)){
        if(GT_INIT()){
            if(NEXT2_GT()){
                return true
            }
        }
    }
    return false
}
function NEXT2_GT(){
    if(t[i].CP==="inc_dec"){
        i++
        return true
    }
    else if(t[i].CP==="AOP" || t[i].CP==="AOR"){
        i++
        if(N_INIT_VALUE()){
            return true
        }

    }
    return false
}
function INC_DEC_PRE(){
    if(t[i].CP==="inc_dec"){
        i++
        if(t[i].CP==="ID"){
            i++
            if(N_INIT_VALUE()){
                return true
            }
        }
    }
    return syntaxFalse()
}
function IF_ELSE(){
    if(t[i].CP==="if"){
        i++
        if(t[i].CP==="("){
            i++
            var T = React.createRef()
            if(EXP(T, S)){
                if(t[i].CP===")"){
                    i++
                    if(BODY()){
                        if(ELSE()){
                            return true
                        }
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function ELSE(){
    if(t[i].CP==="else"){
        i++
        if(BODY()){
            return true
        }
    }
    else if(find(ELSE1,t[i].CP)){
        return true
    }
    return false
}
function SWITCH_CASE(){
    if(t[i].CP==="switch"){
        i++
        if(t[i].CP==="("){
            i++
            if(N_INIT_VALUE()){
                if(t[i].CP===")"){
                    i++
                    if(SW_BODY()){
                        return true
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function SW_BODY(){
    if(t[i].CP==="{"){
        i++
        if(CASES()){
            if(DEFAULT()){
                if(t[i].CP==="}"){
                    i++
                    return true
                }
            }
        }
    }
    return false
}
function CASES(){
    if(t[i].CP==="case"){
        i++
        if(CASE_VALUE()){
            if(t[i].CP===":"){
                i++
                if(BODY()){
                    return true
                }
            }
        }
    }
    return false
}
function DEFAULT(){
    if(t[i].CP==="default"){
        i++
        if(t[i].CP===":"){
            i++
            if(BODY()){
                return true
            }
        }
    }
    return false
}
function CASE_VALUE(){
    if(INNER_CASE_VALUE()){
        return true
    }
    return false
}
function INNER_CASE_VALUE(){
    if(EXP()){
        return true
    }
    return false
}
function CALLING_PARAM(){
    if(find(CALLING_PARAMS1,t[i].CP)){
        if(CP_VALUE()){
            return true
        }
    }
    return false
}
function CP_VALUE(){
    if(t[i].CP===")"){
        return true
    }
    else if(find(FirstOfINIT_VALUE_2,t[i].CP)){
        if(CP_VALUE2()){
            return true
        }
    }
    return false
}
function CP_VALUE2(){
    if(find(FirstOfINIT_VALUE_2,t[i].CP)){
        if(INIT_VALUE_2()){
            if(NEXT_CPVALUE()){
                return true
            }
        }
    }
    return false
}
function NEXT_CPVALUE(){
    if(t[i].CP===")"){
        return true
    }
    else if(t[i].CP===","){
        i++
        if(CP_VALUE2()){
            return true
        }
    }
    return false
}
function BODY(){
    if(t[i].CP===";"){
        i++
        return true
    }
    else if(SST()){
        return true
    }
    else if(t[i].CP==="{"){
        i++
        if(MST()){
            if(t[i].CP==="}"){
                i++
                return true
            }
        }
    }
}
function RETURN(){
    if(t[i].CP==="return"){
        i++
        if(INIT_VALUE_2()){
            return true
        }
    }
    return syntaxFalse()
}
function FUNCTION_DEC(){
    if(t[i].CP==="function" ){
        i++
        if(FUNC_DEF_1()){
            return true
        }
    }
    return false
}
function FUNC_DEF_1(){
    if(t[i].CP==="ID"){
        i++
        if(t[i].CP==="("){
            i++
            inFuncP=true
            if(DEC_PARAMS()){
                inFuncP=false
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        if(MST()){
                            if(t[i].CP==="}"){
                                i++
                                return true
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}
function CLASS(scope) {
    if(t[i].CP==='class'){
        i++
        if(t[i].CP==="ID"){
            var N=t[i].VP
            i++
            if(CLASS_STRUCT(N)){
                return true
            }
        }
    }
    return false
}
function CLASS_STRUCT(N){
    if(t[i].CP==="{"){
        if(CLASS_BODY(N,null)){
            return true
        }
    }
    else if(t[i].CP===":"){
        i++
        if(t[i].CP==="ID"){
            var PN=t[i].VP
            var PL=null
            if(ST.lookupCT(PN)){
                PL=PN
            }
            else{
                console.log("Undeclared Class ",PN, " Inherited at line", t[i].line,)
            }
            i++
            if(CLASS_BODY(N,PL)){
                return true
            }
        }
    }
    return true
}
function CLASS_BODY(N,PL){
    var ref=React.createRef()
    console.log("inserting",N, "parent", PL , ref)
    if(!ST.insertCT(N, "class", PL , ref)){
        console.log("Redeclaration Error | Name ",N," is Already in used")
    }
    if(t[i].CP==="{"){
        i++
        if(CLASS_MST(ref)){
            if(t[i].CP==="}"){
                i++
                return true
            }
        }
    }
    return true
}
function CLASS_MST(ref) {
    if(find(CLASS_MST1,t[i].CP)){
        if(CLASS_CONSTRUCTOR(ref)){
            if(CLASS_ST(ref)){
                if(CLASS_MST(ref)){
                    return true
                }
            }
        }
    }
    else if(t[i].CP==="}"){
        return true
    }
    return false    
}
function CLASS_CONSTRUCTOR(ref){
    if(t[i].CP==="constructor"){
        i++
        if(t[i].CP==="("){
            i++
            if(DEC_PARAMS()){
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        if(CONSTRUCTOR_BODY()){
                            if(t[i].CP==="}"){
                                i++
                                return true
                            }
                        }
                    }
                }
            }

        }
    }
    else if(find(CLASS_MST1,t[i].CP)){
        return true
    }
    return false
}
function CONSTRUCTOR_BODY(){
    if(t[i].CP==="}"){
        return true
    }
    else if(find(SST11,t[i].CP) || t[i].CP==="this"){
        if(C_B_I()){
            if(SST1()){
                return true
            }
        }
    }
    return false
}
function C_B_I(){
    if(t[i].CP==="this"){
        if(THIS_VAR()){
            return true
        }
    }
    else if(find(SST11,t[i].CP)){
        if(SST1()){
            return true
        }
    }
}
function THIS_VAR(){
    if(t[i].CP==="this"){
        i++
        if(t[i].CP==="."){
            i++
            if(t[i].CP==="ID"){
                i++
                if(t[i].CP==="AOR"){
                    i++
                    if(DEC2()){
                        return true
                    }
                }
            }
        }
    }
    return false
}
function CLASS_ST(){
    if(t[i].CP==="ID"){
        if(CLASS_FUNC()){
            return true
        }
    }
    else if(t[i].CP==="DT"){
        if(DEC()){
            return true
        }
    }
    else if(t[i].CP==="protected"){
        if(PROTECTED()){
            return true
        }
    }
    return true
}
function CLASS_FUNC(){
    if(t[i].CP==="ID"){
        i++
        if(FUNC_DEF()){
            return true
        }
    }
    return false
}
function FUNC_DEF(){
    if(t[i].CP==="AOR"){
        i++
        if(t[i].CP==="("){
            i++
            if(DEC_PARAMS()){
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="=>"){
                        i++
                        if(t[i].CP==="{"){
                            i++
                            if(MST()){
                                if(t[i].CP==="}"){
                                    i++
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        if(DEC_PARAMS()){
            if(t[i].CP===")"){
                i++
                if(t[i].CP==="{"){
                    i++
                    if(MST()){
                        if(t[i].CP==="}"){
                            i++
                            return true
                        }
                    }
                }
            }
        }
    }
    return false
}
function DEC_PARAMS(){
    if(t[i].CP==="DT"){
        i++
        if(t[i].CP==="ID"){
            i++ 
            if(DEC1()){
                if(NEXT_PARAMS()){
                    return true
                }
            }
        }
    }
    else if(t[i].CP==="ID"){
        i++
        if(CONST_DEC_PARAM()){
            if(NEXT_PARAMS()){
                return true
            }
        }
    }
    else if(t[i].CP===")"){
        return true
    }
    return false
}
function CONST_DEC_PARAM(){
    if(t[i].CP===")" || t[i].CP===","){
        return true
    }
    else if(t[i].CP==="AOR" || t[i].CP==="AOP"){
        if(CONST_DT1()){
            return true
        }
    }
    return false
}
function NEXT_DEC_PARAMS(){
    if(t[i].CP==="DT"){
        i++
        if(t[i].CP==="ID"){
            i++ 
            if(DEC1()){
                if(NEXT_PARAMS()){
                    return true
                }
            }
        }
    }
    else if(t[i].CP==="ID"){
        i++
        if(CONST_DEC_PARAM()){
            if(NEXT_PARAMS()){
                return true
            }
        }
    }
    return false
}
function NEXT_PARAMS(){
    if(t[i].CP===","){
        i++
        if(NEXT_DEC_PARAMS()){
            return true
        }
    }
    else if(t[i].CP===")"){
        return true
    }
    return false
}
// function DP1(){
//     if(t[i].CP==="ID"){
//         i++ 
//         return true
//     }
//     if(t[i].CP==="AOR" || t[i].CP==="AOP"){
//         i++
//         if(EXP()){
//             return true
//         }
//     }
//     else if(find(DP11,t[i].CP)){
//         return true
//     }
//     return false
// }
// function NEXT_DEC_PARAM(){
//     if(t[i].CP===","){
//         i++
//         if(DEC_PARAMS()){
//             return true
//         }
//     }else if(t[i].CP===")"){
//         return true
//     }
//     return false
// }
function PROTECTED(){
    if(t[i].CP==="protected"){
        i++
        if(t[i].CP===":"){
            i++
            if(PRO_NEXT()){
                return true
            }
        }
    }
    return false
}
function PRO_NEXT(){
    if(t[i].CP==="ID" || t[i].CP==="DT"){
        if(CLASS_ST()){
            return true
        }
    }
    else if(t[i].CP==="{"){
        i++
        if(PRO_BODY()){
            if(t[i].CP==="}"){
                i++
                return true
            }
        }
    }
    return false
}
function PRO_BODY(){
    if(find(CLASS_MST1,t[i].CP)){
        if(CLASS_MST()){
            return true
        }
    }
}
function DEC(scope){
    if(t[i].CP==="DT"){
        var T = t[i].VP
        i++
        if(t[i].CP==="ID"){
            var N = t[i].VP
            i++
            if(DEC1(T,scope)){ 
                if(!ST.insertST(N,T,scope)){
                    console.log("Redeclaration Error at Line :", t[i].line,"Variable",N)
                }
                if(NEXT_DEC()){
                    return true
                }
            }
        }
    }
    return syntaxFalse()
}
function DEC1(Tl,scope){
    if(find(DEC11,t[i].CP) ){
        return true
    }
    else if(t[i].CP==="AOR"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(DEC2(Tr,scope)){
            console.log("Tr",Tr,Tl)
            if(!ST.compatibility(Tl,Tr.current,O)){
                console.log("Can't Assign variable to mismatch type")
            }
            return true
        }
    }
    return false
}
function DEC2(T,scope) {
    if(t[i].CP==="ID"){
        var N=t[i].VP
        var CN=React.createRef()
        i++
        if(DEC3(N,T,scope,CN)){
            return true
        }
    }
    else if(EXP(T,scope)){
        return true
    }
    return false
}
function DEC3(N,T,scope,CN){
    if(find(DEC11,t[i].CP) ){
        T.current=ST.lookupST(N)
        return true
    }
    else if(t[i].CP==="[" || t[i].CP==="." || t[i].CP==="(" || t[i].CP==="$"){
        var Tl=React.createRef()
        if(MERGED_INIT(N,Tl,scope,CN)){
            if(EXP1(Tl,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        Tl=React.createRef()
        Tl.current=ST.lookupST(N)
        console.log("yesssss")
        if(EXP1(Tl,T,scope)){
            console.log("pessed")
            return true
        }
    }
    return false
}
function MERGED_INIT(N,T,scope,CN){
    if(find(FirstOfMOV, t[i].CP) ){
        if(MOV(N,S,T,CN)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        if(EXP(Te)){
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(M_N_ARR(N,scope,T,CN)){
                    return true
                }
            }
        }
    }
    return false
}

function M_N_ARR(N,scope,T,CN){
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV(N,scope,T,CN)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        if(EXP(Te)){
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(M_N_ARR2(N,scope,T,CN)){
                    return true
                }
            }
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        if(CN.current===null){
            T.current=ST.lookupST(N)
        }else{
            T.current=ST.lookupCDT(N,CN)
        }
        return true
    }
    return false
}
function M_N_ARR2(N,scope,T,CN){
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV(N,scope,T,CN)){
            return true
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        if(CN.current===null){
            T.current=ST.lookupST(N)
        }else{
            T.current=ST.lookupCDT(N,CN)
        }
        return true
    }
    return false
}
function MOV(N,scope,T,CN){
    if(t[i].CP==="."){
        if(CN.current===null){
            CN.current=ST.lookupST(N)
        }else{
            CN.current=ST.lookupCDT(N,CN)
        }
        i++
        if(t[i].CP==="ID"){
            N=t[i].VP
            console.log("N",N)
            i++
            if(MERGED1(N,scope,T,CN)){
                console.log("CN=",CN.current)
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        var PL=React.createRef()
        if(CALLING_PARAM(PL)){
            if(t[i].CP===")"){
                CN.current=ST.lookupFT(N,PL,CN)
                if(CN.current===null){
                    console.log("Function ",N," is not defined at line ",t[i].line)
                }
                i++
                if(MERGED(N,scope,T,CN)){
                    return true
                }
            }
        }
    }
    return false
}
function MERGED(N,scope,T,CN){
    if(find(EXP11,t[i].CP)){
        
        if(EXP1(CN,T,scope)){
            return true
       }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        if(MERGED_INIT(N,T,scope,CN)){
            if(DEC1()){
                return true
            }
        }
    }
    return false
}
function MERGED1(N,scope,T,CN){
    if(find(EXP11,t[i].CP)){
        if(CN.current===null){
            CN.current=ST.lookupST(N)
        }else{
            CN.current=ST.lookupCDT(N,CN)
        }
        if(EXP1(CN,T,scope)){
            
            console.log("CN T ",CN,T)
            return true
        }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        if(MERGED_INIT(N,T,scope,CN)){
            if(DEC1()){
                return true
            }
        }
    }
    else if(t[i].CP==="AOR" || t[i].CP==="AOP"){
        if(DEC1()){
            return true
        }
    }
    return false
}
function NEXT_DEC(){
    if(t[i].CP===","){
        i++
        if(t[i].CP==="ID"){
            i++
            if(DEC1()){
                if(NEXT_DEC()){
                    return true
                }
            }
        }
    }
    else if(find(MST1,t[i].CP)){
        return true
    }
    else if(t[i].CP===";"){
        return true
    }
    else if(t[i].CP==="}"){
        return true
    }
    else if(t[i].CP==="$"){
        return true
    }
    return false
}
function EXP(T, scope){
    if(t[i].CP === "ID" || find(E1,t[i].CP)){
        var Tl=React.createRef()
        if(VAL(Tl,scope)){
            if(EXP1(Tl,T,scope)){
                return true
            }
        }
    }
    return false
}
function EXP1(Tl,T,scope){
    if(find(EXP12,t[i].CP)){
        T.current=Tl.current
        return true
    }
    if(find(EXP11,t[i].CP)){
        if(Q_DASH(Tl,T,scope)){
            if(R_DASH(Tl,T,scope)){
                if(S_DASH(Tl,T,scope)){
                    if(T_DASH(Tl,T,scope)){
                        if(E_DASH(Tl,T,scope)){
                            return true
                        }
                    }
                }
            }
        }
    }
    return false
}
function E_DASH(Tl,T,scope){
    if(t[i].CP==="||"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(L(Tr,scope)){
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(E_DASH(Ta,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        T.current=Tl.current
        return true
    }
    return false
}
function L(T,scope){
    if(find(EXP11,t[i].CP)){
        var Tl=React.createRef()
        if(S(Tl,scope)){
            if(T_DASH(Tl,T,scope)){
                return true
            }
        }
    }
    return false
}

function T_DASH(Tl,T,scope){
    if(t[i].CP==="&&"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(S(Tr,scope)){
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(T_DASH(Ta,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        T.current=Tl.current
        return true
    }
    return false
}
function S(T,scope){
    if(find(EXP11,t[i].CP)){
        var Tl=React.createRef()
        if(R(Tl,scope)){
            if(S_DASH(Tl,T,scope)){
                return true
            }
        }
    }
    return false
}

function S_DASH(Tl,T,scope){
    if(t[i].CP==="ROP"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(R(Tr)){
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(S_DASH(Ta,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        T.current=Tl.current
        return true
    }
    return false
}
function R(T,scope){
    if(find(EXP11,t[i].CP)){
        var Tl=React.createRef()
        if(Q(Tl,scope)){
            if(R_DASH(Tl,T,scope)){
                return true
            }
        }
    }
    return false
}

function R_DASH(Tl,T,scope){
    if(t[i].CP==="PM"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(Q(Tr,scope)){
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(R_DASH(Ta,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        T.current=Tl.current
        return true
    }
    return false
}
function Q(T,scope){
    if(find(EXP11,t[i].CP)){
        var Tl=React.createRef()
        if(VAL(Tl)){
            if(Q_DASH(Tl,T,scope)){
                return true
            }
        }
    }
    return false
}
function Q_DASH(Tl,T,scope){
    if(t[i].CP==="MDM"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        if(VAL(Tr)){
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(Q_DASH(Ta,T,scope)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        T.current=Tl.current
        return true
    }
    return false
}
function VAL(T,S){
    if(find(E1,t[i].CP)){
        if(E(T,S)){
            return true
        }
    }
    else if(t[i].CP==="ID"){
        if(F(T,S)){
            return true
        }
    }
    return false
}

function E(T,scope){
    if(t[i].CP==="("){
        i++
        if(EXP(T,scope)){
            if(t[i].CP===")"){
                i++
                return true
            }
        }
    }
    else if(t[i].CP==="!"){
         i++
        if(VAL(T,scope)){
            return true
        }
    }
    else if(t[i].CP==="inc_dec"){
        i++
        if(F(T,scope)){
            return true
        }
        
    }
    else if(find(CONST,t[i].CP)){
        T.current = t[i].CP
        i++
        return true
    }
    else if(t[i].CP==="this"){
        i++
        if(t[i].CP==="."){
            i++ 
            if(F(T,scope)){
                return true
            }
        }
    }
    return false
}
function F(T, scope){
    if(t[i].CP==="ID"){
        var N=t[i].CP.VP
        i++
        if(NEW_ASGN(N, T, scope)){
            return true
        }
    }
}
function NEW_ASGN(){
    if(t[i].CP==="inc_dec"){
        i++
        return true
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        if(N_INIT_VALUE()){
            return true
        }
    }
    return false
}
function N_INIT_VALUE(){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(N_ARR_N()){
                    return true
                }
            }
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        return true
    }
}
function OTHER_N_VALUE(){
    if(t[i].CP==="."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(N_INIT_VALUE()){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        if(CALLING_PARAM()){
            if(t[i].CP===")"){
                i++
                if(N_INIT_VALUE()){
                    return true
                }
            }
        }
    }
    return false
}
function N_ARR_N(){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(N_ARR_2N()){
                    return true
                }
            }
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        return true
    }
    
    return false
}
function N_ARR_2N(){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE()){
            return true
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        return true
    }
    return false
}
function INIT_VALUE_2(){
    if(find(FirstOfEXP,t[i].CP)){
        if(EXP()){
            return true
        }
    }
    else if(find(ARRAY1,t[i].CP)){
        if(ARRAY()){
            return true
        }
    }
    else if(t[i].CP==="{"){
        if(OBJECT()){
            return true
        }
    }
    return false
}
function OBJECT(){
    if(t[i].CP==="{"){
        i++
        if(PROP()){
            if(t[i].CP==="}"){
                i++
                return true
            }
        }
    }
    return false
}
function PROP(){
    if(t[i].CP==="ID" || t[i].CP==="..."){
        if(OBJECT1()){
            if(NEXT_PROP()){
                return true
            }
        }
    }
    return false
}
function OBJECT1(){
    if(t[i].CP==="ID"){
        i++
        if(t[i].CP===":"){
            i++
            if(EXP()){
                return true
            }
            
        }
    }
    else if(t[i].CP==="..."){
        if(SPREAD()){
            return true
        }
    }
}
function NEXT_PROP(){
    if(t[i].CP===","){
        i++
        if(PROP()){
            return true
        }
    }
    else if(t[i].CP==="}"){
        return true
    }
}
function SPREAD(){
    if(t[i].CP==="..."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(N_INIT_VALUE()){
                return true
            }
        }
    }
    return false
}
function ARRAY(){
    if(t[i].CP==="["){
        i++
        if(ARRAY_INNER()){
            if(t[i].CP==="]"){
                i++
                return true
            }
        }
    }
    return false
}
function ARRAY_INNER(){
    if(t[i].CP==="]"){
        return true
    }
    else if(find(ARRAY_VALUES1,t[i].CP)){
        if(ARRAY_VALUES()){
            return true
        }
    }
}
function ARRAY_VALUES(){

    if(find(ARRAY_VALUES1,t[i].CP)){
        if(ARRAY_VAL()){
            if(NEXT_VAL()){
                return true
            }
        }
    }
    return false
}
function ARRAY_VAL(){
    if(t[i].CP==="..."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(N_INIT_VALUE()){
                return true
            }
        }
    }
    else if(find(ARRAY_VALUES1,t[i].CP)){
        if(INIT_VALUE_2()){
            return true
        }
    }
    return false
}
function NEXT_VAL(){
    if(t[i].CP===","){
        i++
        if(ARRAY_VALUES()){
            return true
        }
    }
    else if(t[i].CP==="]"){
        return true
    }
}
function INIT_VALUE(){
    if(find(FollowOfINIT_VALUE1,t[i].CP)){
        return true
    }
    else if(find(FirstOfOTHER_VALUE,t[i].CP)){
        if(OTHER_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(N_ARR()){
                    return true
                }
            }
        }
    }
    return false
}
function OTHER_VALUE(){
    if(t[i].CP==="."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(INIT_VALUE()){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        if(CALLING_PARAM()){
            if(t[i].CP===")"){
                i++
                if(AFT_VALUE()){
                    return true
                }
            }
        }
    }
    return false
}
function AFT_VALUE(){
    if(find(FirstOfOTHER_VALUE,t[i].CP)){
        if(OTHER_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(N_ARR()){
                    return true
                }
            }
        }
    }
    return false
}
function N_ARR(){
    if(find(FollowOfINIT_VALUE1,t[i].CP)){
        return true
    }
    else if(find(FirstOfOTHER_VALUE,t[i].CP)){
        if(OTHER_VALUE()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(N_ARR2()){
                    return true
                }
            }
        }
    }
    return false
}
function N_ARR2(){
    if(find(FollowOfINIT_VALUE1,t[i].CP)){
        return true
    }
    else if(find(FirstOfOTHER_VALUE,t[i].CP)){
        if(OTHER_VALUE()){
            return true
        }
    }
    return false
}

// function EXP1(){
//     console.log("status",t[i].CP,"IN EXP")
//     if(find(EXP11,t[i].CP)){
//         if(T()){
//             if(E_DASH()){
//                 console.log("status",t[i].CP,"ret true from EXP1",syntax)
//                 return true
//             }
//         }
//     }
//     return false
// }
// function E_DASH(){
//     if(t[i].CP==="||"){
//         i++
//         if(N_Q()){
//             if(EXP1()){
//                 return true
//             }
//         }
//     }
//     else if(find(E_DASH1,t[i].CP)){
//         return true
//     }
//     return false
// }
// function T(){
//     if(find(EXP11,t[i].CP)){
//         if(S()){
//             if(T_DASH()){
//                 return true
//             }
//         }
//     }
//     return false
// }
// function T_DASH(){
//     if(t[i].CP==="&&"){
//         i++
//         if(N_Q()){
//             if(EXP1()){
//                 return true
//             }
//         }
//     }
//     else if(find(T_DASH1,t[i].CP)){
//         return true
//     }
//     return false
// }
// function S(){
//     if(find(EXP11,t[i].CP)){
//         if(R()){
//             if(S_DASH()){
//                 return true
//             }
//         }
//     }
//     return false
// }
// function S_DASH(){
//     if(t[i].CP==="ROP"){
//         i++
//         if(N_Q()){
//             if(EXP1()){
//                 return true
//             }
//         }
//     }
//     else if(find(S_DASH1,t[i].CP)){
//         return true
//     }
//     return false
// }
// function R(){
//     if(find(EXP11,t[i].CP)){
//         if(Q()){
//             if(R_DASH()){
//                 return true
//             }
//         }
//     }
//     return false
// }
// function R_DASH(){
//     if(t[i].CP==="PM"){
//         i++
//         if(N_Q()){
//             if(R()){
//                 return true
//             }
//         }
//     }
//     else if(find(R_DASH1,t[i].CP)){
//         return true
//     }
//     return false
// }
// function Q(){
//     if(find(EXP11,t[i].CP)){
//         if(Q_DASH()){
//             return true
//         }
//     }
//     return false
// }

// function Q_DASH(){
//     if(t[i].CP==="MDM"){
//         i++
//         if(N_Q()){
//             if(Q_DASH()){
//                 return true
//             }
//         }
//     }
//     else if(find(Q_DASH1,t[i].CP)){
//         console.log("Q_DASH1 true",t[i].CP)
//         return true
//     }
//     return false
// }
// function N_Q(){ 
//     console.log("status",t[i].CP,t[i].VP,"N_Q")
//     if(find(E1,t[i].CP)){
//         if(E()){
//             return true
//         }
//     }
//     else if(t[i].CP==="ID"){
//         if(F()){
//             return true
//         }
//     }
//     return false
// }

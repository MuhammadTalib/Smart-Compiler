import React from 'react';
import { find, Start1, DEFS1, DEFS3, DEFS2, MST1, MST2, CLASS_MST1, SST11, SSTNEXT1, ELSE1, FOR_PARAM_21, FirstOfEXP, 
        FirstOfINIT_VALUE_2, NextConstDT1, CALLING_PARAMS1,DEC11, E1, EXP11, CONST, EXP12, N_INIT_VALUE1, ARRAY1, ARRAY_VALUES1, 
        FirstOfMOV, FirstOfMergedInit, FollowOfMergedN_ARR, FollowOfINIT_VALUE1, FirstOfOTHER_VALUE, DEC21 } from "./SelectionSets"
import { createTemp,createLabel, Output } from "../ICG/ICGfunctions";

var i,t,syntax=true,inFuncP=false
var ST
function syntaxFalse(){
    syntax=false
    if(inFuncP===true) syntax=true
    return syntax
}
export const SyntaxAnalyzer=(token,SymbolTable)=>{
    ST=SymbolTable
    syntax=true
    i=0
    t=token
    if(ST && START()){
        if(t[i].CP==="$"){
            i++
            // console.log("VALID SYNTAX! Congratulations!")
            // console.log("ST",ST.ScopeTable)
            // console.log("CT",ST.ClassTable)
            // savingIntermediateCode()
            return true
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
            console.log("SST NECT 1 true",t[i].CP)
            return true
        }
    }
    return false
}
function SST1(scope, RT){
    if(find(SST11,t[i].CP)){
        if(syntax && t[i].CP==="DT" && DEC(scope)){ //DONE
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="while" && WHILE(scope)){   //DONE
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
        else if( syntax && t[i].CP==="do" && DO_WHILE(scope)){      //DONE
            if(t[i].CP===";"){
                i++
                return true
            }
            return true
        }
        else if(syntax && t[i].CP==="const" && CONST_DT(scope)){       //DONE
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
        else if(syntax && t[i].CP==="if" && IF_ELSE(scope)){    //DONE
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
        else if(syntax && t[i].CP==="return" && RETURN(scope,RT)){  //DONE
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
        var L1=createLabel()
        Output(L1,":")
        i++
        if(t[i].CP==="("){
            i++
            var T=React.createRef()
            var tname=React.createRef()
            if(EXP(T,scope,null,tname)){
                var L2=createLabel()
                Output("if("+tname.current+"==false) jmp "+L2)
                var Tr=ST.compatibility(T.current,"bool","cond")
                if(!Tr){ console.log("Condition Type Mismatch at line", t[i].line)}
                if(t[i].CP===")"){
                    i++
                    scope=ST.createScope()
                    if(BODY(scope,null)){
                        Output("jmp "+L1)
                        Output(L2+":")
                        return true
                    }
                } 
            }
        }
    }
    return false
}
function FOR(scope){
    if(t[i].CP==="for"){
        i++
        if(t[i].CP==="("){
            i++
            scope=ST.createScope()
            if(FOR_PARAM(scope)){
                if(t[i].CP===")"){
                    i++
                    if(BODY(scope , null)){
                        return true
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function FOR_PARAM(scope){
    if(t[i].CP==="ID"){
        var N=t[i].VP
        i++
        if(FOR_PARAM_2(N,scope)){
            return true
        }
    }
    else if(t[i].CP==="DT"){
        if(DEC(scope,null)){
            if(t[i].CP===";"){
                i++
                if(C2(scope)){
                    if(t[i].CP===";"){
                        i++
                        if(C3(scope)){
                            return true
                        }
                    }
                }
            }
        }
    }
    else if(t[i].CP===";"){
        i++
        if(C2(scope)){
            if(t[i].CP===";"){
                i++
                if(C3(scope)){
                    return true
                }
            }
        }
    }
    return false
}
function FOR_PARAM_2(N,scope){
    if(t[i].CP===";"){
        if(!ST.lookupST(N)){
            console.log("Undeclared Error | Variable ",N," not declared at line ",t[i].line)
        }
        i++
        if(C2(scope)){
            if(t[i].CP===";"){
                i++
                if(C3(scope)){
                    return true
                }
            }
        }
    }
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
        if(RANGE_FOR(N,scope)){
            return true
        }
    }
    return false
}
function RANGE_FOR(N ,scope){
    if(t[i].CP==="in"){
        i++
        var T=React.createRef()
        if(FOR_R(scope,T)){
            if(!ST.insertST(N,T.current,scope)){
                console.log("Redeclartion Error | Variable ",N, " is already declared")
            }
            return true
        }
    }
}
function FOR_R(scope ,T){
    if(t[i].CP==="ID"){
        var N= t[i].VP
        i++
        var CN=React.createRef()
        if(N_INIT_VALUE(N,T,scope,null,CN)){
            return true
        }
    }
}
function C2(scope){
    if(find(FirstOfEXP,t[i].CP)){
        var T=React.createRef()
        if(EXP(T,scope,null)){
            if(ST.compatibility( T.current,"bool","=")){
                console.log("Mismatch Type at line ",t[i].line)
            }
            return true
        }
    }
    else if(t[i].CP===";"){
        return true
    }
    return false
}
function C3(scope){
    if(t[i].CP==="ID"){
        if(GTSWID(scope)){
            return true
        }
    }
    else if(t[i].CP===")"){
        return true
    }
    return false
}
function GTSWID(scope){
    if(t[i].CP==="ID"){
        var N=t[i].VP
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
    // else if(t[i].CP==="{"){
    //     if(OBJECT()){
    //         return true
    //     }
    // }
    else if(t[i].CP==="["){
        if(ARRAY()){
            return true
        }
    }
    return false
}
function DO_WHILE(scope){
    if(t[i].CP==="do"){
        var L1=createLabel()
        Output(L1+":")
        i++
        scope=ST.createScope()
        if(BODY(scope,null)){
            if(t[i].CP==="while"){
                i++
                if(t[i].CP==="("){
                    i++
                    var Texp=React.createRef()
                    var TICG=React.createRef()
                    if(EXP(Texp,scope,null,TICG)){
                        if(!ST.compatibility(Texp.current,"bool","="))
                        if(t[i].CP===")"){
                            Output("if("+TICG.current+"==true) jmp"+L1)
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

function IF_ELSE(scope){
    if(t[i].CP==="if"){
        i++
        if(t[i].CP==="("){
            i++
            var T = React.createRef()
            var TICG=React.createRef()
            var L1=createLabel()
            //Output(L1+":")
            console.log("before EXP")
            if(EXP(T, scope,null,TICG)){
                console.log("EXP pases",t[i].CP)
                if(!ST.compatibility(T.current,"bool","=")){
                    console.log("Type Mismatch")
                }
                if(t[i].CP===")"){
                    Output("if("+TICG.current+"==false) jmp"+L1)
                    i++
                    scope=ST.createScope()
                    if(BODY(scope,null)){
                        if(ELSE(scope,L1)){
                            return true
                        }
                    }
                }
            }
        }
    }
    return syntaxFalse()
}
function ELSE(scope,L1){
    if(t[i].CP==="else"){
        var L2=createLabel()
        Output("jmp "+L2)
        Output(L1+":")
        i++
        scope=ST.createScope()
        if(BODY(scope,null)){
            Output(L2+":")
            return true
        }
    }
    else if(find(ELSE1,t[i].CP)){
        Output(L1+":")
        return true
    }
    return false
}
function CONST_DT(scope,ref=null){
    if(t[i].CP==="const"){
        i++
        if(t[i].CP==="ID"){
            var N=t[i].VP
            
            i++
            var Tr=React.createRef()
            var tICG=React.createRef()
            if(CONST_DT1(Tr,scope,tICG)){
                Output(N+" = "+tICG.current)
                if(ref===null && !ST.insertST(N,Tr.current,scope,null)){
                    console.log("Redeclaration Error | variable ",N," is already defined")
                }else if(ref!==null && !ST.insertCDT(N,Tr.current,"public",null,ref)){
                    console.log("Redeclaration Error | variable ",N," is already defined in class")
                }
                console.log("before NEXT CONTS",t[i].CP)
                if(NEXT_CONST_DT()){
                    return true
                }
            }
        }
    }
    return syntaxFalse()
}
function CONST_DT1(Tr,scope,tICG){
    if(t[i].CP==="AOR"||t[i].CP==="AOP"){
        i++
        if(CONST_DT2(Tr,scope,tICG)){
            return true
        }
    }
    return false
}
function CONST_DT2(Tr,scope,tICG){
    if(t[i].CP==="new"){
        i++
        if(t[i].CP==="ID"){
            var N=t[i].VP
            var classa=ST.lookupCT(N)
            if(!classa){
                console.log("Class Not Defined")
            }
            else{
                Tr.current=classa.Name
            }
            i++
            if(t[i].CP==="("){
                i++
                var PL=React.createRef()
                var PLICG=React.createRef()
                if(CALLING_PARAM(PL,scope,PLICG)){
                    tICG.current=createTemp()
                    for(var j=0;j<PLICG.current.length;j++){
                        Output("Param "+PLICG.current[j].current)
                    }
                    var pllist="",length=PLICG.current.length
                    while(PLICG.current.length!==0){
                        pllist+=PLICG.current.pop().current+"_"
                    }
                    Output(tICG.current+" = Call_"+N+"_Constructor_"+pllist+","+length)
                    if(t[i].CP===")"){
                        if(classa){
                            var TS=ST.lookupCDT_Functions("constructor",PL.current,classa.ref,"public")
                            if(!TS){
                                console.log("Constructor Not defined correctly")
                            }
                        }
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
        console.log("return true")
        return true
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
                var scope=ST.createScope()
                if(BODY(scope)){
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
            var scope=ST.createScope()
            if(BODY(scope)){
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
function CALLING_PARAM(PL,scope,PLICG){
    if(find(CALLING_PARAMS1,t[i].CP)){
        if(CP_VALUE(PL,scope,PLICG)){
            return true
        }
    }
    return false
}
function CP_VALUE(PL,scope,PLICG){
    PL.current=""
    PLICG.current=[]
    if(t[i].CP===")"){
        PL.current="void"
        return true
    }
    else if(find(FirstOfINIT_VALUE_2,t[i].CP)){
        if(CP_VALUE2(PL,scope,PLICG)){
            return true
        }
    }
    return false
}
function CP_VALUE2(PL,scope,PLICG){
    if(find(FirstOfINIT_VALUE_2,t[i].CP)){
        var T=React.createRef()
        var tICG=React.createRef()
        if(INIT_VALUE_2(T,scope,tICG)){
            PLICG.current.unshift(tICG)
            PL.current+=T.current
            if(NEXT_CPVALUE(PL,scope,PLICG)){
                return true
            }
        }
    }
    return false
}
function NEXT_CPVALUE(PL,scope,PLICG){
    if(t[i].CP===")"){
        return true
    }
    else if(t[i].CP===","){
        i++
        PL.current+=","
        if(CP_VALUE2(PL,scope,PLICG)){
            return true
        }
    }
    return false
}
function BODY(scope,RT){
    if(t[i].CP===";"){
        i++
        
        ST.deleteScope()
        return true
    }
    else if(SST(scope,RT)){
        ST.deleteScope()
        return true
    }
    else if(t[i].CP==="{"){
        i++
        if(MST(scope,RT)){
            if(t[i].CP==="}"){
                i++
                ST.deleteScope()
                return true
            }
        }
    }
}
function RETURN(scope,RT){
    if(t[i].CP==="return"){
        i++
        var tICG=React.createRef()
        if(INIT_VALUE_2(RT,scope,tICG)){
            Output("Return "+tICG.current)
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
        var N=t[i].VP
        Output("\n"+N+" Proc")
        i++
        var scope=ST.createScope()
        if(t[i].CP==="("){
            i++
            inFuncP=true
            var PL=React.createRef()
            if(DEC_PARAMS(PL,scope)){
                inFuncP=false
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        var RT=React.createRef()
                        if(MST(scope,RT)){
                            if(!RT.current){
                                RT.current="void"
                            }
                            var T=PL.current+"->"+RT.current
                            if(t[i].CP==="}"){
                                i++
                                Output(N+" Endp")
                                if(!ST.insertCT(N,T,null,null)){
                                    console.log("Redeclaration Error | Redeclaring Function ",N," at line ",t[i].line) 
                                }
                                ST.deleteScope()
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
    ref.current=[]
    console.log("inserting",N, "parent", PL ,"ref", ref.current)
    if(!ST.insertCT(N, "class", PL , ref)){
        console.log("Redeclaration Error | Name ",N," is Already in used")
    }
    if(t[i].CP==="{"){
        i++
        console.log("going in CLAS MST")
        if(CLASS_MST(ref)){
            console.log("CLASS MST true")
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
        var scope=ST.createScope()
        var PL=React.createRef()
        i++
        if(t[i].CP==="("){
            i++
            if(DEC_PARAMS(PL,scope)){
                if(!ST.insertCDT("constructor",PL.current+"->void","public",null,ref)){
                    console.log("Redeclaring Constructor")
                }
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="{"){
                        i++
                        if(CONSTRUCTOR_BODY(scope,ref)){
                            if(t[i].CP==="}"){
                                ST.deleteScope()
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
function CONSTRUCTOR_BODY(scope,ref){
    if(t[i].CP==="}"){
        return true
    }
    else if(find(SST11,t[i].CP) || t[i].CP==="this"){
        if(C_B_I(scope,ref)){
            if(SST1(scope,ref)){
                return true
            }
        }
    }
    return false
}
function C_B_I(scope,ref){
    if(t[i].CP==="this"){
        if(THIS_VAR(scope,ref)){
            return true
        }
    }
    else if(find(SST11,t[i].CP)){
        var RT=React.createRef()
        if(SST1(scope,RT,ref)){
            return true
        }
    }
}
function THIS_VAR(scope,ref){
    if(t[i].CP==="this"){
        i++
        if(t[i].CP==="."){
            i++
            if(t[i].CP==="ID"){
                var N=t[i].VP
                var T=ST.lookupCDT(N,ref)
                i++
                if(t[i].CP==="AOR"){
                    i++
                    var Tr=React.createRef()
                    if(DEC2(Tr,scope,ref)){
                        var Ta=ST.compatibility(T,Tr.current,"=")
                        if(!Ta){
                            console.log("Type Mismatch ",Ta," can't be assigned to ",Tr.current)
                        }
                        return true
                    }
                }
            }
        }
    }
    return false
}
function CLASS_ST(ref){
    if(t[i].CP==="ID"){
        if(CLASS_FUNC(ref)){
            return true
        }
    }
    else if(t[i].CP==="DT"){
        if(DEC(null,ref)){
            return true
        }
    }
    else if(t[i].CP==="protected"){
        if(PROTECTED(ref)){
            return true
        }
    }
    else if(t[i].CP==="const"){
        if(CONST_DT(null,ref)){
            console.log("CONST DT true in CLASS")
            return true
        }
    }
    else if(t[i].CP==="}"){
        return true
    }
    return false
}
function CLASS_FUNC(ref){
    if(t[i].CP==="ID"){
        var N=t[i].VP
        i++
        if(FUNC_DEF(ref,N)){
            return true
        }
    }
    return false
}
function FUNC_DEF(ref,N){
    if(t[i].CP==="AOR"){
        i++
        if(t[i].CP==="("){
            var scope=ST.createScope()
            i++
            var PL=React.createRef()
            if(DEC_PARAMS(PL,scope)){
                if(t[i].CP===")"){
                    i++
                    if(t[i].CP==="=>"){
                        i++
                        if(t[i].CP==="{"){
                            i++
                            var RT=React.createRef()
                            if(MST(scope,RT)){
                                if(!RT.current){RT.current="void"}
                                if(t[i].CP==="}"){
                                    if(!ST.insertCDT(N, PL.current+"->"+RT.current, "public", null, ref )){ 
                                        console.log("Redeclaration Error | Redeclaring Function ",N," at line ",t[i].CP) 
                                    }
                                    ST.deleteScope()
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
        PL=React.createRef()
        if(DEC_PARAMS(PL,scope)){
            if(t[i].CP===")"){
                i++
                if(t[i].CP==="{"){
                    i++
                    RT=React.createRef()
                    if(MST(scope,RT)){
                        if(!RT.current){RT.current="void"}
                        if(t[i].CP==="}"){
                            if(!ST.insertCDT(N, PL.current+"->"+RT.current, "public", null, ref )){ 
                                console.log("Redeclaration Error | Redeclaring Function ",N," at line ",t[i].CP) 
                            }
                            ST.deleteScope()
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
function DEC_PARAMS(PL,scope){
    if(t[i].CP==="DT"){
        var T=t[i].VP
        i++
        if(t[i].CP==="ID"){
            var N=t[i].VP
            PL.current=T
            i++ 
            if(DEC1(T,scope,null)){
                if(!ST.insertST(N,T,scope)){
                    console.log("parameter Redeclaraion at line ",t[i].line)
                }
                if(NEXT_PARAMS(PL,scope)){
                    return true
                }
            }
        }
    }
    else if(t[i].CP==="ID"){
        N=t[i].VP
        PL.current="const"
        i++
        if(CONST_DEC_PARAM()){
            if(NEXT_PARAMS(PL,scope)){
                return true
            }
        }
    }
    else if(t[i].CP===")"){
        PL.current="void"
        return true
    }
    return false
}

function NEXT_PARAMS(PL,scope){
    if(t[i].CP===","){
        i++
        if(NEXT_DEC_PARAMS(PL,scope)){
            return true
        }
    }
    else if(t[i].CP===")"){
        return true
    }
    return false
}
function NEXT_DEC_PARAMS(PL,scope){
    if(t[i].CP==="DT"){
        var T=t[i].VP
        i++
        if(t[i].CP==="ID"){
            var N=t[i].VP
            PL.current+=","+T
            i++ 
            if(DEC1(T,scope,null)){
                if(!ST.insertST(N,T,scope)){
                    console.log("parameter Redeclaraion at line ",t[i].line)
                }
                if(NEXT_PARAMS(PL,scope)){
                    return true
                }
            }
        }
    }
    else if(t[i].CP==="ID"){
        N=t[i].VP
        PL.current+=",const"
        i++
        if(CONST_DEC_PARAM()){
            if(NEXT_PARAMS(PL,scope)){
                return true
            }
        }
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
function DEC(scope,ref=null){
    if(t[i].CP==="DT"){
        var T = t[i].VP
        i++
        if(t[i].CP==="ID"){
            var N = t[i].VP
            var tICG=N
            i++
            if(DEC1(T,scope,ref,tICG)){ 
                if(ref!==null){
                    if(!ST.insertCDT(N,T,"public",null,ref)){
                        console.log("Redeclaration Error | Class Attribute at Line :", t[i].line,"Variable",N)
                    }
                }
                else if(!ST.insertST(N,T,scope)){
                    console.log("Redeclaration Error | Variable " ,N," at Line :", t[i].line)
                }
                if(NEXT_DEC()){
                    return true
                }
            }
        }
    }
    return false
}
function DEC1(Tl,scope,ref,tICG){
    if(find(DEC11,t[i].CP) ){
        return true
    }
    else if(t[i].CP==="AOR"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        var t2ICG=React.createRef()
        if(DEC2(Tr,scope,ref,t2ICG)){
            Output(tICG+"="+t2ICG.current)
            if(!ST.compatibility(Tl,Tr.current,O)){
                console.log("Mismatch Assigning Type | Can't Assign ",Tl," variable to ",Tr.current," type")
            }
            return true
        }
    }
    return false
}
function DEC2(T,scope,ref,t2ICG) {
    if(t[i].CP==="ID"){
        var N=t[i].VP
        var CN=React.createRef()
        CN.current=null
        i++
        if(DEC3(N,T,scope,CN,t2ICG)){
            return true
        }
    }
    else if(EXP(T,scope,ref,t2ICG)){
        return true
    }
    return false
}
function DEC3(N,T,scope,CN,t2ICG){
    if(find(DEC11,t[i].CP) ){
        var t1ICG=createTemp()
        Output(t1ICG+" = "+N)
        t2ICG.current=t1ICG
        if(CN.current!==null){
            T.current=ST.lookupCDT(N,CN).Type
            if(!T.current){
                console.log("Undeclared Variable | ",N," not found at line ",t[i].line)
            }
        }
        else{ 
            T.current=ST.lookupST(N)
            if(!T.current){
                console.log("Undeclared Variable | ",N," not found at line ",t[i].line)
            }
        }
        return true
    }
    else if(t[i].CP==="[" || t[i].CP==="." || t[i].CP==="(" || t[i].CP==="$"){
        var Tl=React.createRef()
        
        var t3ICG=React.createRef()
        if(MERGED_INIT(N,Tl,scope,CN,t3ICG)){
            if(EXP1(Tl,T,scope,null,t2ICG,t3ICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        Tl=React.createRef()
        if(CN.current==null){
            Tl.current=ST.lookupST(N)
            if(!Tl.current){
                console.log("Undeclared Variable | ",N," not found at line ",t[i].line)
            }
        }
        else{
            Tl.current=ST.lookupCDT(N,CN)
            if(!Tl.current){
                console.log("Undeclared Variable | ",N," not found at line",t[i].line)
            }
        }
        var taICG=createTemp()
        Output(taICG+" = "+N)
        t1ICG=React.createRef()
        t1ICG.current=taICG
        if(EXP1(Tl,T,scope,null,t2ICG,t1ICG)){
            return true
        }
    }
    return false
}
function MERGED_INIT(N,T,scope,CN,t2ICG,CNICG,tExtra){
    if(find(FirstOfMOV, t[i].CP) ){
        if(MOV(N,S,T,CN,t2ICG,CNICG,tExtra)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        var tICG=createTemp()
        var TeICG=React.createRef()
        if(EXP(Te,scope,null,TeICG)){
            if(N) Output(tICG+" = "+N+"[ "+TeICG.current+" ]")
            else Output(tICG+" = "+tExtra.current+"[ "+TeICG.current+" ]")
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(M_N_ARR(N,scope,T,CN,tICG,t2ICG)){
                    return true
                }
            }
        }
    }
    return false
}

function M_N_ARR(N,scope,T,CN,tICG,t2ICG){
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV(N,scope,T,CN)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        var t3ICG=createTemp()
        var TeICG=React.createRef()
        if(EXP(Te,scope,null,TeICG)){
            Output(t3ICG+" = "+tICG+"[ "+TeICG.current+" ]")
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(M_N_ARR2(N,scope,T,CN,t3ICG,t2ICG)){
                    return true
                }
            }
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        t2ICG.current=tICG
        if(N){
            if(CN.current===null){
                CN.current=ST.lookupST(N)
            }else{
                var ref=React.createRef()
                ref= ST.lookupCT(CN.current).ref
                CN.current=ST.lookupCDT(N,ref)
                T.current=CN.current
                if(!CN.current){
                    console.log("Undeclared Variable | Variable ",N," not declared")
                }
    
            }
        }
        else{ 
            T.current=CN.current
        }
        return true
    }
    return false
}
function M_N_ARR2(N,scope,T,CN,tICG,t2ICG){
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV(N,scope,T,CN)){
            return true
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        t2ICG.current=tICG
        if(N){
            if(CN.current===null){
                CN.current=ST.lookupST(N)
            }else{
                var ref=React.createRef()
                ref= ST.lookupCT(CN.current).ref
                CN.current=ST.lookupCDT(N,ref)
                T.current=CN.current
                if(!CN.current){
                    console.log("Undeclared Variable | Variable ",N," not declared")
                }
    
            }
        }
        return true
    }
    return false
}
function MOV(N,scope,T,CN,t2ICG,CNICG,tExtra){
    if(t[i].CP==="."){
        if(N) if(CN.current===null){
            CNICG=createTemp()
            Output(CNICG+" = "+N)
            CN.current=ST.lookupST(N)
            if(!CN.current){
                console.log("Undeclared Variable | Variable ",N," not declared")
            }
        }else{
            var ref=React.createRef()
            ref= ST.lookupCT(CN.current).ref
            var CN2ICG=createTemp()
            Output(CN2ICG+" = "+CNICG+"."+N)
            CNICG=CN2ICG
            CN.current=ST.lookupCDT(N,ref)
            if(!CN.current){
                console.log("Undeclared Variable | Variable ",N," not declared")
            }
        }
        i++
        if(t[i].CP==="ID"){
            N=t[i].VP
            i++
            if(MERGED1(N,scope,T,CN,CNICG,t2ICG)){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        var PL=React.createRef()
        var PLICG=React.createRef()
        if(CALLING_PARAM(PL,scope,PLICG)){
            var tICG=React.createRef()
            tICG.current=createTemp()
            for(var j=0;j<PLICG.current.length;j++){
                Output("Param "+PLICG.current[j].current)
            }
            var pllist="",length=PLICG.current.length
            while(PLICG.current.length!==0){
                pllist+=PLICG.current.pop().current+"_"
            }
            Output(tICG.current+" = Call_"+N+pllist+","+length)
            if(t[i].CP===")"){
                if(CN.current===null){
                    
                    var FT=ST.lookupFT(N)
                    if(FT && PL.current) ST.checkCompatibilityOfPL(PL.current.split(","),FT.split("-")[0].split(","),N)
                    CN.current=FT.split(">").pop()
                    if(!CN.current){
                        console.log("Undeclared Function | Function ",N," not declared")
                    }
                }else{
                    ref=React.createRef()
                    ref= ST.lookupCT(CN.current).ref
                    CN.current=ST.lookupCDT_Functions(N,PL.current,ref,"public")
                    if(!CN.current){
                        console.log("Undeclared Function | Function ",N," not declared")
                    }
                }
                i++
                if(MERGED(scope,T,CN,tICG,t2ICG)){
                    return true
                }
            }
        }
    }
    return false
}

function MERGED1(N,scope,T,CN,CNICG,t2ICG){
    if(find(EXP11,t[i].CP)){
        if(CN.current===null){
            var CN2ICG=React.createRef()
            CN2ICG.current=createTemp()
            Output(CN2ICG.current+" = "+CNICG+"."+N)
            CN.current=ST.lookupST(N)
        }else{
            var ref=React.createRef()
            ref= ST.lookupCT(CN.current).ref
            CN2ICG=React.createRef()
            CN2ICG.current=createTemp()
            Output(CN2ICG.current+" = "+CNICG+"."+N)
            CN.current=ST.lookupCDT(N,ref)
            if(!CN.current){
                console.log("Undeclared Variable | Variable ",N," not declared")
            }
        }
        if(EXP1(CN,T,scope,null,t2ICG,CN2ICG)){
            return true
        }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        if(MERGED_INIT(N,T,scope,CN,t2ICG,CNICG)){
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
function MERGED(scope,T,CN,tICG,t2ICG){
    if(find(EXP11,t[i].CP)){
        if(EXP1(CN,T,scope,null,t2ICG,tICG)){
            return true
       }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        var N=null
        if(MERGED_INIT(N,T,scope,CN,t2ICG,tICG)){
            if(DEC1()){
                return true
            }
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
    else if(t[i].CP==="function"){
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
function EXP(T, scope,ref,tICG){
    if(t[i].CP === "ID" || find(E1,t[i].CP)){
        var Tl=React.createRef()
        var t2ICG=React.createRef()
        if(VAL(Tl,scope,ref,t2ICG)){
            if(EXP1(Tl,T,scope,ref,tICG,t2ICG)){
                return true
            }
        }
    }
    return false
}
function EXP1(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="inc_dec"){
        i++
        t2ICG=createTemp()
        Output(t2ICG+" = "+tICG.current)
        var t3ICG=createTemp()
        Output(t3ICG+" = "+t[i-1].VP+t2ICG)
        tICG.current=t3ICG
        return true
    }
    if(find(EXP12,t[i].CP)){
        tICG.current=t2ICG.current
        T.current=Tl.current
        return true
    }
    else if(find(EXP11,t[i].CP)  || t[i].CP==="(") {
        if(Q_DASH(Tl,T,scope,ref,tICG,t2ICG)){     //MDM 
            var swap=tICG.current
            tICG.current=t2ICG.current
            t2ICG.current=swap
            if(R_DASH(Tl,T,scope,ref,tICG,t2ICG)){     //PM
                swap=tICG.current
                tICG.current=t2ICG.current
                t2ICG.current=swap
                if(S_DASH(Tl,T,scope,ref,tICG,t2ICG)){    //ROP
                    swap=tICG.current
                    tICG.current=t2ICG.current
                    t2ICG.current=swap
                    if(T_DASH(Tl,T,scope,ref,tICG,t2ICG)){    //&&
                        swap=tICG.current
                        tICG.current=t2ICG.current
                        t2ICG.current=swap
                        if(E_DASH(Tl,T,scope,ref,tICG,t2ICG)){    //||
                            swap=tICG.current
                            tICG.current=t2ICG.current
                            t2ICG.current=swap
                            return true
                        }
                    }
                }
            }
        }
    }
    return false
}
function E_DASH(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="||"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        var TrICG=React.createRef()
        if(L(Tr,scope,ref,TrICG)){
            var TaICG=React.createRef()
            TaICG.current=createTemp()
            Output(TaICG.current+" = "+t2ICG.current+" || "+TrICG.current)
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(E_DASH(Ta,T,scope,ref,tICG,TaICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        tICG.current=t2ICG.current
        T.current=Tl.current
        return true
    }
    return false
}
function L(T,scope,ref,tICG){
    if(find(EXP11,t[i].CP) || t[i].CP==="("){
        var Tl=React.createRef()
        var t2ICG=React.createRef()
        if(S(Tl,scope,ref,t2ICG)){
            if(T_DASH(Tl,T,scope,ref,tICG,t2ICG)){
                return true
            }
        }
    }
    return false
}

function T_DASH(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="&&"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        var TrICG=React.createRef()
        if(S(Tr,scope,ref,TrICG)){
            var TaICG=React.createRef()
            TaICG.current=createTemp()
            Output(TaICG.current+" = "+t2ICG.current+" && "+TrICG.current)
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(T_DASH(Ta,T,scope,ref,tICG,TaICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        tICG.current=t2ICG.current
        T.current=Tl.current
        return true
    }
    return false
}
function S(T,scope,ref,tICG){
    if(find(EXP11,t[i].CP) || t[i].CP==="("){
        var Tl=React.createRef()
        var t2ICG=React.createRef()
        if(R(Tl,scope,ref,t2ICG)){
            if(S_DASH(Tl,T,scope,ref,tICG,t2ICG)){
                return true
            }
        }
    }
    return false
}

function S_DASH(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="ROP"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        var TrICG=React.createRef()
        if(R(Tr,scope,ref,TrICG)){
            var TaICG=React.createRef()
            TaICG.current=createTemp()
            Output(TaICG.current+" = "+t2ICG.current+" "+O+" "+TrICG.current)
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(S_DASH(Ta,T,scope,ref,tICG,TaICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        tICG.current=t2ICG.current
        T.current=Tl.current
        return true
    }
    return false
}
function R(T,scope,ref,tICG){
    if(find(EXP11,t[i].CP) || t[i].CP==="("){
        var Tl=React.createRef()
        var t2ICG=React.createRef()
        if(Q(Tl,scope,ref,t2ICG)){
            if(R_DASH(Tl,T,scope,ref,tICG,t2ICG)){
                return true
            }
        }
    }
    return false
}

function R_DASH(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="PM"){
        var O=t[i].VP
        i++
        var TrICG=React.createRef()
        var Tr=React.createRef()
        if(Q(Tr,scope,ref,TrICG)){
            var TaICG=React.createRef()
            TaICG.current=createTemp()
            Output(TaICG.current+" = "+t2ICG.current+" "+O+" "+TrICG.current)
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(R_DASH(Ta,T,scope,ref,tICG,TaICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        tICG.current=t2ICG.current
        T.current=Tl.current
        return true
    }
    return false
}
function Q(T,scope,ref,tICG){ 
    if(find(EXP11,t[i].CP) || t[i].CP==="("){
        var Tl=React.createRef()
        var t2ICG=React.createRef()
        if(VAL(Tl,scope,ref,t2ICG)){
            if(Q_DASH(Tl,T,scope,ref,tICG,t2ICG)){
                return true
            }
        }
    }
    return false
}
function Q_DASH(Tl,T,scope,ref,tICG,t2ICG){
    if(t[i].CP==="MDM"){
        var O=t[i].VP
        i++
        var Tr=React.createRef()
        var TrICG=React.createRef()
        if(VAL(Tr,scope,ref,TrICG)){
            var TaICG=React.createRef()
            TaICG.current=createTemp()
            Output(TaICG.current+" = "+t2ICG.current+" "+O+" "+TrICG.current)
            var Ta=React.createRef()
            Ta.current=ST.compatibility(Tl.current,Tr.current,O)
            if(Q_DASH(Ta,T,scope,ref,tICG,TaICG)){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        tICG.current=t2ICG.current
        if(T) T.current=Tl.current
        return true
    }
    return false
}
function VAL(T,scope,ref,tICG){
    if(find(E1,t[i].CP)){
        if(E(T,scope,ref,tICG)){
            return true
        }
    }
    else if(t[i].CP==="ID"){
        if(F(T,scope,ref,tICG)){
            return true
        }
    }
    return false
}

function E(T,scope,ref,tICG){
    if(t[i].CP==="("){
        i++
        if(EXP(T,scope,ref,tICG)){
            if(t[i].CP===")"){
                i++
                return true
            }
        }
    }
    else if(t[i].CP==="!"){
         i++
        if(VAL(T,scope,ref,tICG)){
            var t2ICG=createTemp()
            Output(t2ICG+"=!"+tICG.current)
            tICG.current=t2ICG
            return true
        }
    }
    else if(t[i].CP==="inc_dec"){
        i++
        var Tl=React.createRef()
        if(F(Tl,scope,ref,tICG)){
            if(!ST.compatibility("int",Tl.current,"+")){
                console.log("Can't increment decrement variable of ",Tl.current," type")
            }
            T.current=Tl.current
            return true
        }
        
    }
    else if(find(CONST,t[i].CP)){
        T.current = t[i].CP
        t2ICG=createTemp()
        Output(t2ICG+"="+t[i].VP)
        tICG.current=t2ICG
        i++
        return true
    }
    else if(t[i].CP==="this"){
        ref.current.used="present"
        i++
        if(t[i].CP==="."){
            i++ 
            if(t[i].CP==="ID"){
                var N=t[i].VP
                i++
                if(NEW_ASGN(N, T, scope,ref,null)){
                    return true
                }
            }
        }
    }
    return false
}
function F(T, scope,ref,tICG){
    if(t[i].CP==="ID"){
        var N=t[i].VP
        i++
        var CN=React.createRef()
        if(NEW_ASGN(N, T, scope, ref, CN, tICG)){
            T.current=CN.current
            return true
        }
    }
}
function NEW_ASGN(N,T,scope,ref,CN,t2ICG){
    if(t[i].CP==="inc_dec"){
        t2ICG=createTemp()
        Output(t2ICG+" = "+N)
        var t3ICG=createTemp()
        Output(t3ICG+" = !"+t2ICG)
        var Tl
        if(ref){ Tl=ST.lookupCDT(N,ref) }
        else{ Tl=ST.lookupST(N) }
        if(!Tl){
            console.log("Undeclared Variable Found| Variable ",N ," Not defined")
        }
        i++
        T.current=ST.compatibility(Tl,"int","+")
        if(!T.current){
            console.log("Type Mismatch | increment decrement can't be applied on Type of ",Tl )
        }
        return true
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        if(N_INIT_VALUE(N,T,scope,ref,CN,t2ICG)){
            return true
        }
    }
    return false
}
function N_INIT_VALUE(N,T,scope,ref,CN,t2ICG,CNICG,tExtra){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE(N,T,scope,ref,CN,t2ICG,CNICG,tExtra)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        var tICG=createTemp()
        var TeICG=React.createRef()
        if(EXP(Te,scope,null,TeICG)){
            if(N) Output(tICG+" = "+N+"[ "+TeICG.current+" ]")
            else Output(tICG+" = "+tExtra.current+"[ "+TeICG.current+" ]")
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(N_ARR_N(N,T,scope,ref,CN,tICG,t2ICG)){
                    return true
                }
            }
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        if(N===null){
            t2ICG.current=tExtra.current
            T.current=CN.current
        }
        else{
            if(CN.current===null){
                if(CN){ 
                    CNICG=createTemp()
                    Output(CNICG+" = "+N)
                    t2ICG.current=CNICG
                    CN.current=ST.lookupST(N)
                    T.current=CN.current
                    }
                }else{
                    var CN2ICG=createTemp()
                    Output(CN2ICG+" = "+CNICG+"."+N)
                    CNICG=CN2ICG
                    t2ICG.current=CNICG

                    ref=React.createRef()
                    ref=CN && ST.lookupCT(CN.current).ref
                    if(CN) CN.current=ST.lookupCDT(N,ref)
                    if(CN) T.current=CN.current
                    if(CN && !CN.current){
                        console.log("Undeclared Variable | Variable ",N," not declared")
                    }
                }
            }
        return true
    }
}
function OTHER_N_VALUE(N,T,scope,ref,CN,t2ICG,CNICG,tExtra){
    if(t[i].CP==="."){
        i++
        if(t[i].CP==="ID"){
            if(CN.current===null){
                CNICG=createTemp()
                Output(CNICG+" = "+N)
                CN.current=ST.lookupST(N)
                if(!CN.current){
                    console.log("Undeclared Variable | Variable ",N," not declared")
                }
            }else{
                var refer=React.createRef()
                refer= ST.lookupCT(CN.current).ref
                var CN2ICG=createTemp()
                Output(CN2ICG+" = "+CNICG+"."+N)
                CNICG=CN2ICG
                if(CN) CN.current=ST.lookupCDT(N,refer)
                if(!CN.current){
                    console.log("Undeclared Variable | Variable ",N," not declared")
                }
            }
            N=t[i].VP
            i++
            if(N_INIT_VALUE(N,T,scope,ref,CN,t2ICG,CNICG,tExtra)){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        var PL=React.createRef()
        var PLICG=React.createRef()
        if(CALLING_PARAM(PL,scope,PLICG)){
            var tICG=React.createRef()
            tICG.current=createTemp()
            for(var j=0;j<PLICG.current.length;j++){
                Output("Param "+PLICG.current[j].current)
            }
            var pllist="",length=PLICG.current.length
            while(PLICG.current.length!==0){
                pllist+=PLICG.current.pop().current+"_"
            }
            if(t[i].CP===")"){
                if(CN.current===null){
                    
                    Output(tICG.current+" = Call_"+N+"_"+pllist+","+length)
                    var FT=ST.lookupFT(N)
                    if(FT && PL.current) ST.checkCompatibilityOfPL(PL.current.split(","),FT.split("-")[0].split(","),N)
                    CN.current=FT.split(">").pop()
                    if(!CN.current){
                        console.log("Undeclared Function | Function ",N," not declared")
                    }
                }else{
                    Output(tICG.current+" = Call_"+CN.current+"_"+CNICG+"."+N+"_"+pllist+","+length)
                    ref=React.createRef()
                    ref= ST.lookupCT(CN.current).ref
                    CN.current=ST.lookupCDT_Functions(N,PL.current,ref,"public")
                    if(!CN.current){
                        console.log("Undeclared Function | Function ",N," not declared")
                    }
                }
                i++
                if(N_INIT_VALUE(null,T,scope,ref,CN,t2ICG,null,tICG)){
                    return true
                }
            }
        }
    }
    return false
}
function N_ARR_N(N,T,scope,ref,CN,tICG,t2ICG,tExtra){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE(N,T,scope,ref,CN)){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        var Te=React.createRef()
        tICG=createTemp()
        var TeICG=React.createRef()
        if(EXP(Te,scope,null,TeICG)){
            if(N) Output(tICG+" = "+N+"[ "+TeICG.current+" ]")
            else Output(tICG+" = "+tExtra.current+"[ "+TeICG.current+" ]")
            if(!ST.compatibility(Te.current,"int","=")){
                console.log("Type Mismatch at line",t[i].line,"index cannot be not int value")
            }
            if(t[i].CP==="]"){
                i++
                if(N_ARR_2N(N,T,scope,ref,CN,tICG,t2ICG)){
                    return true
                }
            }
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        t2ICG.current=tICG
        if(CN.current===null){
            CN.current=ST.lookupST(N)
        }else{
            ref=React.createRef()
            ref= ST.lookupCT(CN.current).ref
            CN.current=ST.lookupCDT(N,ref)
            T.current=CN.current
            if(!CN.current){
                console.log("Undeclared Variable | Variable ",N," not declared")
            }

        }
        return true
    }
    
    return false
}
function N_ARR_2N(N,T,scope,ref,CN,tICG,t2ICG){
    if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE(N,T,scope,ref,CN)){
            return true
        }
    }
    else if(find(N_INIT_VALUE1,t[i].CP)){
        t2ICG.current=tICG
        if(CN.current===null){
            CN.current=ST.lookupST(N)
        }else{
            ref=React.createRef()
            ref= ST.lookupCT(CN.current).ref
            CN.current=ST.lookupCDT(N,ref)
            T.current=CN.current
            if(!CN.current){
                console.log("Undeclared Variable | Variable ",N," not declared")
            }

        }
        return true
    }
    return false
}
function INIT_VALUE_2(T,scope,tICG){
    if(find(FirstOfEXP,t[i].CP)){
        if(EXP(T,scope,null,tICG)){
            return true
        }
    }
    else if(find(ARRAY1,t[i].CP)){
        if(ARRAY()){
            return true
        }
    }
    // else if(t[i].CP==="{"){
    //     if(OBJECT()){
    //         return true
    //     }
    // }
    return false
}
// function OBJECT(){
//     if(t[i].CP==="{"){
//         i++
//         if(PROP()){
//             if(t[i].CP==="}"){
//                 i++
//                 return true
//             }
//         }
//     }
//     return false
// }
// function PROP(){
//     if(t[i].CP==="ID" || t[i].CP==="..."){
//         if(OBJECT1()){
//             if(NEXT_PROP()){
//                 return true
//             }
//         }
//     }
//     return false
// }
// function OBJECT1(){
//     if(t[i].CP==="ID"){
//         i++
//         if(t[i].CP===":"){
//             i++
//             if(EXP()){
//                 return true
//             }
            
//         }
//     }
//     else if(t[i].CP==="..."){
//         if(SPREAD()){
//             return true
//         }
//     }
// }
// function NEXT_PROP(){
//     if(t[i].CP===","){
//         i++
//         if(PROP()){
//             return true
//         }
//     }
//     else if(t[i].CP==="}"){
//         return true
//     }
// }
// function SPREAD(){
//     if(t[i].CP==="..."){
//         i++
//         if(t[i].CP==="ID"){
//             i++
//             if(N_INIT_VALUE()){
//                 return true
//             }
//         }
//     }
//     return false
// }
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



// function GT_VALUE(){
//     if(t[i].CP==="."){
//         i++
//         if(t[i].CP==="ID"){
//             i++
//             if(NEXT_GT()){
//                 return true
//             }
//         }
//     }
//     else if(t[i].CP==="("){
//         i++
//         if(CALLING_PARAM()){
//             if(t[i].CP===")"){
//                 i++
//                 if(GT_INIT()){
//                     return true
//                 }
//             }
//         }
//     }
//     return false
// }
// function GT_INIT(){
//     if(find(GT_INIT1,t[i].CP)){
//         return true
//     }
//     else if(t[i].CP==="(" || t[i].CP==="."){
//         if(GT_VALUE()){
//             return true
//         }
//     }
//     else if(t[i].CP==="["){
//         i++
//         if(EXP()){
//             if(t[i].CP==="]"){
//                 i++
//                 if(GT_ARR()){
//                     return true
//                 }
//             }
//         }
//     }
//     return false
// }
// function GT_ARR(){
//     if(find(GT_INIT1,t[i].CP)){
//         return true
//     }
//     else if(t[i].CP==="(" || t[i].CP==="."){
//         if(GT_VALUE()){
//             return true
//         }
//     }
//     else if(t[i].CP==="["){
//         i++
//         if(EXP()){
//             if(t[i].CP==="]"){
//                 i++
//                 if(GT_ARR2()){
//                     return true
//                 }
//             }
//         }
//     }
// }
// function GT_ARR2(){
//     if(find(GT_INIT1,t[i].CP)){
//         return true
//     }
//     else if(t[i].CP==="(" || t[i].CP==="."){
//         if(GT_VALUE()){
//             return true
//         }
//     }
// }
// function NEXT_GT(){
//     if(find(GT_INIT2,t[i].CP)){
//         if(GT_INIT()){
//             if(NEXT2_GT()){
//                 return true
//             }
//         }
//     }
//     return false
// }
// function NEXT2_GT(){
//     if(t[i].CP==="inc_dec"){
//         i++
//         return true
//     }
//     else if(t[i].CP==="AOP" || t[i].CP==="AOR"){
//         i++
//         if(N_INIT_VALUE()){
//             return true
//         }

//     }
//     return false
// }
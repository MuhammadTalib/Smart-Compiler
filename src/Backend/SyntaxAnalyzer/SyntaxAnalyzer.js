import { find, Start1, DEFS1, DEFS3, DEFS2, MST1, MST2, CLASS_MST1,
    DP11, SST11, SSTNEXT1, ELSE1, FOR_PARAM_21, FirstOfEXP, 
    FirstOfINIT_VALUE_2, NextConstDT1, GT_INIT1, GT_INIT2, CALLING_PARAMS1,
    DEC11, E1, EXP11, E_DASH1, T_DASH1, S_DASH1, R_DASH1, Q_DASH1, CONST, 
    N_INIT_VALUE1, ARRAY1, ARRAY_VALUES1, FirstOfMOV, FirstOfMergedInit, 
    FollowOfMergedN_ARR, FollowOfINIT_VALUE1, FirstOfOTHER_VALUE, DEC21 } from "./SelectionSets"


var i,t

export const SyntaxAnalyzer=(token)=>{
    i=0
    t=token
    if(START()){
        console.log("i",i)
        if(t[i].CP==="$"){
            i++
            console.log("VALID SYNTAX! Congratulations!")
        }
    }
    else {
        console.log("token",t[i])
        console.log("INVALID SYNTAX at line "+t[i].line+":"+t[i].index)
    }
    return false
}
function START(){
    if(find(Start1,t[i].CP)){
        if(DEFS()){
            return true
        }
    }
    return false
}
function DEFS(){
    if(t[i].CP==="$"){
        return true
    }
    else if(find(DEFS1,t[i].CP)){
        if(MST()){
            if(DEFS()){
                return true
            }
        }
    }
    else if(find(DEFS2,t[i].CP)){
        if(CLASS()){
            if(DEFS()){
                return true
            }
        }
    }
    else if(find(DEFS3,t[i].CP)){
        if(FUNCTION_DEC()){
            if(DEFS()){
                return true
            }
        }
    }
    return false
}
function MST() {
    if(find(MST1,t[i].CP)){
        if(SST()){
            if(MST()){
                return true
            }
        }
    }
    else if(find(MST2,t[i].CP)){
        return true
    }
    return false
}
function SST(){
    if(SST1()){
        if(SSTNEXT()){
            return true
        }
    }
    return false
}
function SST1(){
    if(find(SST11,t[i].CP)){
        if(DEC()){
            return true
        }
        else if(WHILE()){
            return true
        }
        else if(FOR()){
            return true
        }
        else if(DO_WHILE()){
            return true
        }
        else if(CONST_DT()){
            return true
        }
        else if(GTSWID()){
            return true
        }
        else if(INC_DEC_PRE()){
            return true
        }
        else if(IF_ELSE()){
            return true
        }
        else if(SWITCH_CASE()){
            return true
        }
        else if(RETURN()){
            return true
        }
    }
    return false
}
function SSTNEXT(){
    if(t[i].CP===","){
        return true
    }
    else if(find(SSTNEXT1, t[i].CP)){
        return true
    }
    return false;
}
function WHILE(){
    if(t[i].CP==="while"){
        i++
        if(t[i].CP==="("){
            i++
            if(EXP()){
               if(t[i].CP===")"){
                   i++
                   if(BODY()){
                       return true
                   }
               } 
            }
        }
    }
    return false
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
    return false
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
    return false
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
    return false
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
        console.log("STatus",t[i].CP,t[i].CP,"here")
        i++
        if(DEC_PARAMS()){
            if(t[i].CP===")"){
                i++
                if(t[i].CP==="FUNC_ARROW"){
                    i++
                    console.log("STatus",t[i].CP,t[i].CP)
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
        console.log("status",t[i].CP,i,"ID passes in GTSWID")
        if(INIT_VALUE()){
            console.log("status",t[i].CP,i,"INIT VAUE TRUE")
            if(NEXT_GTSWID()){
                console.log("status",t[i].CP,i,"NEXT GTSWID ")
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
        console.log("status",t[i].CP,i,"AOP PASSES")
        if(GTSDEC()){
            console.log("status",t[i].CP,i,"GTSDEC PASSES")
            return true
        }
    }
    return false
}
function GTSDEC(){
    if(find(DEC21,t[i].CP)){
        console.log("status",t[i].CP,i,"going in dEC2")
        if(DEC2()){
            console.log("status",t[i].CP,i,"DEC2 passed")
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
    return false
}
function IF_ELSE(){
    if(t[i].CP==="if"){
        i++
        if(t[i].CP==="("){
            i++
            if(EXP()){
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
    return false
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
    return false
}
function FUNCTION_DEC(){
    if(t[i].CP==="function"){
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
    }
    return false
}
function CLASS() {
    if(t[i].CP==='class'){
        i++
        if(t[i].CP==="ID"){
            i++
            if(CLASS_STRUCT()){
                return true
            }
        }
    }
    return false
}
function CLASS_STRUCT(){
    if(t[i].CP==="{"){
        if(CLASS_BODY()){
            return true
        }
    }
    else if(t[i].CP===":"){
        i++
        if(t[i].CP==="ID"){
            i++
            if(CLASS_BODY()){
                return true
            }
        }
    }
    return true
}
function CLASS_BODY(){
    if(t[i].CP==="{"){
        i++
        if(CLASS_MST()){
            if(t[i].CP==="}"){
                i++
                return true
            }
        }
    }
    return true
}
function CLASS_MST() {
    if(find(CLASS_MST1,t[i].CP)){
        if(CLASS_ST()){
            if(CLASS_MST()){
                return true
            }
        }
    }
    else if(t[i].CP==="}"){
        return true
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
                    if(t[i].CP==="FUNC_ARROW"){
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
        if(DEC()){
            return true
        }
    }
    else if(t[i].CP==="ID"){
        i++
        if(DP1()){
            if(NEXT_DEC_PARAM()){
                return true
            }
        }
    }
    return true
}
function DP1(){
    if(find(DP11,t[i].CP)){
        return true
    }else if(t[i].CP==="AOR" || t[i].CP==="AOP"){
        i++
        if(EXP()){
            return true
        }
    }
    return false
}
function NEXT_DEC_PARAM(){
    if(t[i].CP===","){
        i++
        if(DEC_PARAMS()){
            return true
        }
    }else if(t[i].CP===")"){
        return true
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
function DEC(){
    if(t[i].CP==="DT"){
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
    return false
}
function DEC1(){
    if(find(DEC11,t[i].CP) ){
        return true
    }
    else if(t[i].CP==="AOR"){
        i++
        if(DEC2()){
            return true
        }
    }
    return false
}
function DEC2() {
    console.log("status",t[i].CP,t[i].VP,i," in dEC2")
    if(t[i].CP==="ID"){
        i++
        console.log("status",t[i].CP,t[i].VP,i,"going in dEC3")
        if(DEC3()){
            return true
        }
    }
    else if(E()){
        if(EXP1()){
            return true
        }
    }
    return false
}
function DEC3(){
    if(find(DEC11,t[i].CP) ){
        return true
    }
    else if(t[i].CP==="[" || t[i].CP==="." || t[i].CP==="(" || t[i].CP==="$"){
        console.log("status",t[i].CP,t[i].VP,i,"before Merged Init")
        if(MERGED_INIT()){
            console.log("status",t[i].CP,t[i].VP,i,"passes Merged Init")
            if(EXP1()){
                return true
            }
        }
    }
    else if(find(EXP11,t[i].CP)){
        if(EXP1()){
            return true
        }
    }
    return false
}
function MERGED_INIT(){
    if(find(FirstOfMOV, t[i].CP) ){
        if(MOV()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                console.log("status",t[i].CP,t[i].VP,i," ARRAY passes")
                if(M_N_ARR()){
                    console.log("status",t[i].CP,t[i].VP,i,"M_N_ARR passes")
                    return true
                }
            }
        }
    }
    return false
}
function MOV(){
    if(t[i].CP==="."){
        i++
        if(t[i].CP==="ID"){
            i++
            if(MERGED1()){
                return true
            }
        }
    }
    else if(t[i].CP==="("){
        i++
        if(CALLING_PARAM()){
            if(t[i].CP===")"){
                i++
                if(MERGED()){
                    return true
                }
            }
        }
    }
    return false
}
function MERGED(){
    if(find(EXP11,t[i].CP)){
        if(EXP1()){
            return true
        }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        if(MERGED_INIT()){
            if(DEC1()){
                return true
            }
        }
    }
    return false
}
function MERGED1(){
    if(find(EXP11,t[i].CP)){
        if(EXP1()){
            return true
        }
    }
    else if(find(FirstOfMergedInit,t[i].CP)){
        if(MERGED_INIT()){
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
function M_N_ARR(){
    console.log("status",t[i].CP,t[i].VP,i," in M_N_ARR")
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV()){
            return true
        }
    }
    else if(t[i].CP==="["){
        i++
        if(EXP()){
            if(t[i].CP==="]"){
                i++
                if(M_N_ARR2()){
                    return true
                }
            }
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        return true
    }
    return false
}
function M_N_ARR2(){
    if(find(FirstOfMOV, t[i].CP)){
        if(MOV()){
            return true
        }
    }
    else if(find(FollowOfMergedN_ARR,t[i].CP)){
        return true
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
function EXP(){
    if(t[i].CP==="ID"){
        i++
        if(NEW_ASGN()){
            if(EXP1()){
                return true
            }
        }
    }
    else if(find(E1, t[i].CP)){
        if(E()){
            if(EXP1()){
                return true
            }
        }
    }
    return false
}
function EXP1(){
    if(find(EXP11,t[i].CP)){
        if(T()){
            if(E_DASH()){
                return true
            }
        }
    }
    return false
}
function E_DASH(){
    if(t[i].CP==="||"){
        i++
        if(N_Q()){
            if(EXP1()){
                return true
            }
        }
    }
    else if(find(E_DASH1,t[i].CP)){
        return true
    }
    return false
}
function T(){
    if(find(EXP11,t[i].CP)){
        if(S()){
            if(T_DASH()){
                return true
            }
        }
    }
    return false
}
function T_DASH(){
    if(t[i].CP==="&&"){
        i++
        if(N_Q()){
            if(EXP1()){
                return true
            }
        }
    }
    else if(find(T_DASH1,t[i].CP)){
        return true
    }
    return false
}
function S(){
    if(find(EXP11,t[i].CP)){
        if(R()){
            if(S_DASH()){
                return true
            }
        }
    }
    return false
}
function S_DASH(){
    if(t[i].CP==="ROP"){
        i++
        if(N_Q()){
            if(EXP1()){
                return true
            }
        }
    }
    else if(find(S_DASH1,t[i].CP)){
        return true
    }
    return false
}
function R(){
    if(find(EXP11,t[i].CP)){
        if(Q()){
            if(R_DASH()){
                return true
            }
        }
    }
    return false
}
function R_DASH(){
    if(t[i].CP==="PM"){
        i++
        if(N_Q()){
            if(R()){
                return true
            }
        }
    }
    else if(find(R_DASH1,t[i].CP)){
        return true
    }
    return false
}
function Q(){
    if(find(EXP11,t[i].CP)){
        if(Q_DASH()){
            return true
        }
    }
    return false
}

function Q_DASH(){
    if(t[i].CP==="MDM"){
        i++
        if(N_Q()){
            if(Q_DASH()){
                return true
            }
        }
    }
    else if(find(Q_DASH1,t[i].CP)){
        return true
    }
    return false
}
function N_Q(){ 
    if(find(E1,t[i].CP)){
        if(E()){
            return true
        }
    }
    else if(t[i].CP==="ID"){
        if(F()){
            return true
        }
    }
    return false
}
function E(){
    if(t[i].CP==="("){
        i++
        if(EXP()){
            if(t[i].CP===")"){
                i++
                return true
            }
        }
    }
    else if(t[i].CP==="!"){
        i++
        if(N_Q()){
            return true
        }
    }
    else if(t[i].CP==="inc_dec"){
        i++
        if(F()){
            return true
        }
        
    }
    else if(find(CONST,t[i].CP)){
        i++
        return true
    }
    return false
}
function F(){
    if(t[i].CP==="ID"){
        i++
        if(NEW_ASGN()){
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
    if(find(N_INIT_VALUE1,t[i].CP)){
        return true
    }
    else if(find(FirstOfMOV,t[i].CP)){
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
    return false
}
function N_ARR_2N(){
    if(find(N_INIT_VALUE1,t[i].CP)){
        return true
    }
    else if(find(FirstOfMOV,t[i].CP)){
        if(OTHER_N_VALUE()){
            return true
        }
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
}
function ARRAY_VAL(){
    if(find(ARRAY_VALUES1,t[i].CP)){
        if(INIT_VALUE_2()){
            return true
        }
    }
    else if(t[i].CP==="..."){
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
    console.log("status",t[i].CP,i)
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
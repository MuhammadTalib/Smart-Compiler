export const Start1=["DT","while","for","do","const","ID","class","function","inc_dec","if","switch","return","$"]

export const DEFS1=["DT","ID","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const DEFS2=["class"]
export const DEFS3=["function"]

export const MST1=["DT","while","for","do","const","ID","inc_dec","if","switch","return"]
export const MST2=["class","function","}","$"]

export const CLASS_MST1=["ID","DT","protected"]
export const CLASS_MST2=["}"]

export const PROTECTED_PRO1=["ID","DT","protected"]

export const DP11=["DT","ID",")",","]

export const SST11=["DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const SSTNEXT1=["DT","}","while","for","do","const","ID","inc_dec","if","switch","return","$","class"]

export const ELSE1=[";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$","}"]

export const FOR_PARAM_21=[".","(","[",")"]

export const FirstOfEXP=["ID","(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST","true","false"]
export const ARRAY1=["["]

export const FirstOfINIT_VALUE_2=["ID","(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST","true","false","{","["]

export const NextConstDT1=[";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]

export const GT_INIT1=[";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]

export const GT_INIT2=["(",".","[","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]

export const CALLING_PARAMS1=["ID","(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST","{","[",")"]

export const DEC11=[",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const DEC21=["ID","(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST"]
export const ARRAY_VALUES1=["ID","(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST","{","["]

export const E1=["(","!","inc_dec","FLOAT_CONST","INT_CONST","STRING_CONST","true","false"]
export const EXP11=["MDM","PM","ROP","||","}","&&","]",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const E_DASH1=["]","}",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const T_DASH1=["||","]","}",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const S_DASH1=["&&","||","}","]",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const R_DASH1=["ROP","&&","||","}","]",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const Q_DASH1=['PM',"ROP","&&","}","||","]",")",":",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","$"]
export const CONST=["FLOAT_CONST","INT_CONST","STRING_CONST","true","false"]
export const N_INIT_VALUE1=["MDM","PM","||","&&","ROP","]",")",":",",",";","(",".","[","DT","while","for","do","const","ID","inc_dec","if","switch","return","}","$"]

export const FirstOfMOV=[".","("]
export const FirstOfMergedInit=[".","(","["]
export const FollowOfMergedN_ARR=["AOR",",",";","DT","while","for","do","const","ID","inc_dec","if","switch","return","}","$"]

export const FollowOfINIT_VALUE1=["inc_dec","(","AOR","AOP"]
export const FirstOfOTHER_VALUE=[".","("]
export const find=(arr,val)=>{
    for(var i in arr){
        if(arr[i]===val)
            return true
    }
    return false
}
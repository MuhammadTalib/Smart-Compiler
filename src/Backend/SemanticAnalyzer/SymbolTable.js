import ScopeTableItem from "./ScopeTable"
import ClassData from "./ClassDataTable"
import CalssTableItem from "./ClassTable"
export default class SymbolTable{
    constructor(){
        this.ScopeTable=[]
        this.ClassTable=[]
        this.CurrScope=null
        this.nextScope=0
        this.ScopeStack=[]
    }
    createScope(){
        if(this.CurrScope===null){
            this.CurrScope=this.nextScope
            this.nextScope=this.nextScope+1
        }else{
            this.ScopeStack.push(this.CurrScope)
            this.CurrScope=this.nextScope
            this.nextScope=this.nextScope+1
        }
        console.log("Scope Created",this.CurrScope)
        return this.CurrScope
    }
    lookupST(N){
        var s=this.CurrScope
        for(var i=this.ScopeStack.length;i>=0;i--){
            for(var j=0;j<this.ScopeTable.length;j++){
                if(this.ScopeTable[j].Name===N && this.ScopeTable[j].Scope===s){
                    return this.ScopeTable[j].Type
                }
            }
            s=this.ScopeStack[i-1]
        }
        return false
    }
    
    lookupFT(N){
        for(var j=0;j<this.ClassTable.length;j++){
            if(this.ClassTable[j].Name===N && this.ClassTable[j].Type!=="class"){
                return this.ClassTable[j].Type
            }
        }
    }
    checkCompatibilityOfPL(PL,EPL,F){
        console.log("pl epl ft",PL,EPL)
        if(PL.length!==EPL.length) {return console.log("Invalid Parameter length passed to Function ",F)}
        else for(var i=0;i<PL.length;i++){
            if(!this.compatibility(PL[i],EPL[i],"=")){
                console.log("Type Mismath | Invalid parameter ",i+1," passed to Function ",F)
            }
        }
    }
    lookupCDT_Functions(N,PL,ref,access){
        if(ref.current){
            for(var i=0;i< ref.current.length;i++){
                if(ref.current[i].Name===N && ref.current[i].Type.split("-")[0]===PL && ref.current[i].AM===access){
                    return ref.current[i].Type.split(">").pop()
                }
            }
        }
        return undefined
    }
    lookupCT(N){
        for(var j=0;j<this.ClassTable.length;j++){
            if(this.ClassTable[j].Name===N ){
                return this.ClassTable[j]
            }
        }
        return false
    }
    lookupCDT(N,ref){
        if(ref && ref.current){
            for(var i=0;i< ref.current.length;i++){
                if(ref.current[i].Name===N){
                    return ref.current[i].Type
                }
            }
        }
        return undefined
    }
    deleteScope(){
        this.CurrScope=this.ScopeStack.pop()
        console.log("Scope Deleted",this.CurrScope)
    }
    insertST(N,T,S,ref){
        for(var i=0;i<this.ScopeTable.length;i++){
            
            if(this.ScopeTable[i].Name===N && this.ScopeTable[i].Scope===S){
                return false
            }
        }
        var Sc=new ScopeTableItem(N,T,S,ref)
        this.ScopeTable.push(Sc)
        return true
    }
    insertCT(N,T,PL,ref){
        for(var i=0;i<this.ClassTable.length;i++){
            if(this.ClassTable[i].Name===N){
                return false
            }
        }
        if(ref)  ref.current=[]
        var C=new CalssTableItem(N,T,PL,ref)
        this.ClassTable.push(C)
        return true
    }
    insertCDT(N,T,AM,TM,ref){
        console.log("inserting CDT",N,T,ref)
        for(var i=0;i<ref && ref.current && ref.current.length;i++){
            if(ref.current[i].Name===N){
                return false
            }
        }
        var CDT=new ClassData(N,T,AM,TM)
        ref.current&& ref.current.push(CDT)
        return true
    }
    compatibility(T1, T2, Op){
        console.log("compatiblity",T1,T2,Op)
        var compatibilityArray=[
            {T1:"int",T2:"int",O:"+",ret:"int"},
            {T1:"int",T2:"int",O:"-",ret:"int"},
            {T1:"int",T2:"int",O:"*",ret:"int"},
            {T1:"int",T2:"int",O:"/",ret:"int"},
            {T1:"int",T2:"int",O:"%",ret:"int"},
            {T1:"int",T2:"int",O:">",ret:"bool"},
            {T1:"int",T2:"int",O:"<",ret:"bool"},
            {T1:"int",T2:"int",O:">=",ret:"bool"},
            {T1:"int",T2:"int",O:"<=",ret:"bool"},
            {T1:"int",T2:"int",O:"&&",ret:"bool"},
            {T1:"int",T2:"int",O:"||",ret:"bool"},

            {T1:"bool",T2:"bool",O:"+",ret:"bool"},
            {T1:"bool",T2:"bool",O:"-",ret:"bool"},
            {T1:"bool",T2:"bool",O:"*",ret:"bool"},
            {T1:"bool",T2:"bool",O:"/",ret:"bool"},
            {T1:"bool",T2:"bool",O:"%",ret:"bool"},
            {T1:"bool",T2:"bool",O:">",ret:"bool"},
            {T1:"bool",T2:"bool",O:"<",ret:"bool"},
            {T1:"bool",T2:"bool",O:">=",ret:"bool"},
            {T1:"bool",T2:"bool",O:"<=",ret:"bool"},
            {T1:"bool",T2:"bool",O:"&&",ret:"bool"},
            {T1:"bool",T2:"bool",O:"||",ret:"bool"},

            {T1:"int",T2:"bool",O:"+",ret:"bool"},
            {T1:"float",T2:"bool",O:"-",ret:"bool"},

            {T1:"float",T2:"float",O:"+",ret:"float"},
            {T1:"float",T2:"float",O:"-",ret:"float"},
            {T1:"float",T2:"float",O:"*",ret:"float"},
            {T1:"float",T2:"float",O:"/",ret:"float"},
            {T1:"float",T2:"float",O:"%",ret:"float"},
            {T1:"float",T2:"float",O:">",ret:"bool"},
            {T1:"float",T2:"float",O:"<",ret:"bool"},
            {T1:"float",T2:"float",O:">=",ret:"bool"},
            {T1:"float",T2:"float",O:"<=",ret:"bool"},
            {T1:"float",T2:"float",O:"&&",ret:"bool"},
            {T1:"float",T2:"float",O:"||",ret:"bool"},

            {T1:"float",T2:"bool",O:"cond",ret:"bool"},
            {T1:"int",T2:"bool",O:"cond",ret:"bool"},
            {T1:"string",T2:"bool",O:"cond",ret:"bool"},
            {T1:"bool",T2:"bool",O:"cond",ret:"bool"},
            {T1:"const",T2:"bool",O:"cond",ret:"bool"},
            {T1:"var",T2:"bool",O:"cond",ret:"bool"},
            {T1:"long",T2:"bool",O:"cond",ret:"bool"},
            {T1:"double",T2:"bool",O:"cond",ret:"bool"},
            {T1:"short",T2:"bool",O:"cond",ret:"bool"},

            {T1:"int",T2:"int",O:"=",ret:"int"},
            {T1:"float",T2:"float",O:"=",ret:"float"},
            {T1:"int",T2:"float",O:"=",ret:"int"},
            {T1:"float",T2:"int",O:"=",ret:"int"},
            {T1:"int",T2:"bool",O:"=",ret:"int"},
            {T1:"string",T2:"string",O:"=",ret:"string"}
        ]
        for(var i=0;i<compatibilityArray.length;i++){
            if(compatibilityArray[i].T1===T1 && compatibilityArray[i].T2===T2 && compatibilityArray[i].O===Op){
                return compatibilityArray[i].ret
            }
        }
        return null
    }
    display(){
        console.log("Scope Table",this.ScopeTable)
        console.log("Class Table",this.ClassTable)
    }
}
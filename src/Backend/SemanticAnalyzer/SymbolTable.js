import ScopeTableItem from "./ScopeTable"
import ClassData from "./ClassDataTable"
import CalssTableItem from "./ClassTable"
import React from 'react';

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
        return this.CurrScope
    }
    lookupST(N){
        var s=this.CurrScope
        for(var i=0;i<this.ScopeStack.length+1;i++){
            for(var j=0;j<this.ScopeTable.length;j++){
                if(this.ScopeTable[j].Name===N && this.ScopeTable[j].Scope===s){
                    return this.ScopeTable[j].Type
                }
            }
            s=this.ScopeStack.pop()
        }
        return false
    }
    lookupCT(N){
        for(var j=0;j<this.ClassTable.length;j++){
            if(this.ClassTable[j].Name===N ){
                return true
            }
        }
        return false
    }
    lookupCDT(N,ref){
        if(ref.current){
            for(var i=0;i<ref.current.length;i++){
                if(ref.current[i].Name===N){
                    return ref.current[i] 
                }
            }
        }
        return false
    }
    lookupFT(){}
    deleteScope(){
        this.CurrScope=this.ScopeStack.pop()
        console.log("Scope Deleted",this.CurrScope)
    }
    insertST(N,T,S){
        for(var i=0;i<this.ScopeTable.length;i++){
            console.log(this.ScopeTable[i].Name ,this.ScopeTable[i].Scope)
            if(this.ScopeTable[i].Name===N && this.ScopeTable[i].Scope===S){
                return false
            }
        }
        var Sc=new ScopeTableItem(N,T,S)
        this.ScopeTable.push(Sc)
        return true
    }
    insertCT(N,T,PL){
        for(var i=0;i<this.ClassTable.length;i++){
            if(this.ClassTable[i].Name===N){
                return false
            }
        }
        var ref=React.createRef()
        ref.current=[]
        var C=new CalssTableItem(N,T,PL,ref)
        this.ClassTable.push(C)
        return true
    }
    insertCDT(N,T,AM,TM,ref){
        for(var i=0;i<this.ref.current.length;i++){
            if(this.ref.current[i].Name===N){
                return false
            }
        }
        var CDT=new ClassData(N,T,AM,TM)
        ref.current.push(CDT)
        return true
    }
    compatibility(T1, T2, Op){
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
        ]
        for(var i=0;i<compatibilityArray.length;i++){
            if(compatibilityArray[i].T1===T1 && compatibilityArray[i].T2===T2 && compatibilityArray[i].O===Op){
                console.log("Compatibility(",T1,",",T2,",",Op,") = ",compatibilityArray[i].ret)
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
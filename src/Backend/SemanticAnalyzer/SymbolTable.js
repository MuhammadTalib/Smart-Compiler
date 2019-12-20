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
    deleteScope(){
        this.CurrScope=this.ScopeStack.pop()
        console.log("Scope Deleted",this.CurrScope)
    }
    insertST(N,T,S){
        for(var i=0;i<this.ScopeTable.length;i++){
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
    display(){
        console.log("Scope Table",this.ScopeTable)
        console.log("Class Table",this.ClassTable)
    }
}
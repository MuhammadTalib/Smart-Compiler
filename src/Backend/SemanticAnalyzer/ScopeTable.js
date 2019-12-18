export default class ScopeTableItem{
    constructor(N,T,S){
        this.Name=N
        this.Type=T
        this.Scope=S
    }
    display(){
        console.log("----->>Displaying Scope Item<<-----")
        console.log("Name",this.Name)
        console.log("Type",this.Type)
        console.log("Scope",this.Scope)
    }
}
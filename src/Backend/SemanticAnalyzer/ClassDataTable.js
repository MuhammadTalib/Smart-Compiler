export default class ClassData{
    constructor(N,T,AM,TM){
        this.Name=N
        this.Type=T
        this.AM=AM
        this.TM=TM
    }
    display(){
        console.log("----->>Displaying Class Data<<-----")
        console.log("Name",this.Name)
        console.log("Type",this.Type)
        console.log("AM",this.AM)
        console.log("TM",this.TM)
    }
}
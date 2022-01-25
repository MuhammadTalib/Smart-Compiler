//import SymbolTable from "./SymbolTable";

export default function checkingSemantics() {
  var a = [1, 2];
  //     console.log("check",!(0*9))
  //     console.log("a",a.pop())
  //     console.log(a)
  //    // var a=11
  do {
    a = 9;
    //  console.log("hahahaha")
  } while (a > 10);

  // var ST=new SymbolTable()
  // if(!ST.insertST("a","int",1)){
  //     console.log("Redeclation Error")
  // }
  // if(!ST.insertST("a","int",2)){
  //     console.log("Redeclation Error")
  // }
  // if(!ST.insertST("a","int",3)){
  //     console.log("Redeclation Error")
  // }
  // if(!ST.insertST("a","int",1)){
  //     console.log("Redeclation Error this")
  // }
  // ST.display()
}

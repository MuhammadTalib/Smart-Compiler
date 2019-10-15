/*DEC*/         var a=2,b=a,c,d=b=c=4
/*INIT*/        a=9,c=b
/*COND*/        a||a<b||9||functionCall()||true||false||constant
/*WHILE*/       while(COND){
                    BODY
                }
/*DO-WHILE*/    do{
                    BODY
                }while(COND)

/*FOR*/         for(var a=0;i<10;i++){

                }
                for(i in ID,CONST,functionCall()){

                }

/*IF-ELSE*/     if(COND){

                }else{

                }
/*SWITCH-CASE*/ switch(ID,CONST,functionCall()){
                    case 1:{
                        BODY
                    }
                    default:{
                        BODY
                    }
                }
/*RETURN*/      return ID,CONST,FunctionCall
/*FUNCTION-DEF*/
                function a(x,s){
                    return      //not mendatory just show a warning
                }
/*ANOTHER-FUNC-DEF*/
                const a=(a)=>{
                    return      //not mendatory just show a warning
                }
/*CLASS*/
                class CLASSNAME {
                    constructor(){

                    }
                    newFunction(){

                    }
                    protected
                }

                class CHILD:BASE{
                    constructor(){
                        BASE()
                    }
                    newFunction(){

                    }
                }

/*INC-DEC*/     a++,++a,a--,--a

/*FUNC-CALL*/   var a=functionCall(ID,CONST,functionCall)
                functionCall()()()      //function call returns funct 
                                        //and can return mltiple func

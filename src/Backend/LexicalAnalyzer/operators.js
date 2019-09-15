export const operators = [
    { operator: "=", class: "AOP" },   //AOP=Assignment Operator
    { operator: "+=", class: "AOP" },
    { operator: "-=", class: "AOP" },
    { operator: "*=", class: "AOP" },
    { operator: "/=", class: "AOP" },
    { operator: "%=", class: "AOP" },
    { operator: "+", class: "ASOP" },  //ADD Operator
    { operator: "-", class: "ASOP" },
    { operator: "*", class: "AOP" }, //MOP
    { operator: "/", class: "DOP" }, //Divide Operator
    { operator: "%", class: "POP" }, //Percent Operator
    { operator: "<", class: "ROP" }, //Relational Operator
    { operator: ">", class: "ROP" },
    { operator: ">=", class: "ROP" },
    { operator: "<=", class: "ROP" },
    { operator: "!=", class: "ROP" },
    { operator: "==", class: "ROP" },

    { operator: "&&", class: "LAND" }, //Logical And
    { operator: "||", class: "LOR" },

    { operator: "&", class: "BAND" }, //Binary And
    { operator: "|", class: "BOR" },
    { operator: "!", class: "BNOT" },


    { operator: "++", class: "inc_dec" }, //increment decrement
    { operator: "--", class: "inc_dec" },

    { operator: ">>", class: "SOR" }, //Shift Operator
    { operator: "<<", class: "SOR" },

    { operator: "^", class: "POWER" }, //power

]
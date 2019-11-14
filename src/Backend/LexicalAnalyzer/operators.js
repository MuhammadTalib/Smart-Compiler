export const operators = [
    { operator: "=", class: "AOR" },   //AOP=Assignment Operator
    { operator: "+=", class: "AOP" },
    { operator: "-=", class: "AOP" },
    { operator: "*=", class: "AOP" },
    { operator: "/=", class: "AOP" },
    { operator: "%=", class: "AOP" },
    { operator: "+", class: "PM" },  //ADD Operator
    { operator: "-", class: "PM" },
    { operator: "*", class: "MDM" }, //MOP
    { operator: "/", class: "MDM" }, //Divide Operator
    { operator: "%", class: "MDM" }, //Percent Operator
    { operator: "<", class: "ROP" }, //Relational Operator
    { operator: ">", class: "ROP" },
    { operator: ">=", class: "ROP" },
    { operator: "<=", class: "ROP" },
    { operator: "!=", class: "ROP" },
    { operator: "==", class: "ROP" },
    { operator: "=>", class: "FUNC_ARROW" },


    { operator: "&&", class: "&&" }, //Logical And
    { operator: "||", class: "||" },

    { operator: "...", class: "..." },

    { operator: "&", class: "&" }, //Binary And
    { operator: "|", class: "|" },
    { operator: "!", class: "!" },


    { operator: "++", class: "inc_dec" }, //increment decrement
    { operator: "--", class: "inc_dec" },

    { operator: ">>", class: "SOR" }, //Shift Operator
    { operator: "<<", class: "SOR" },

    { operator: "^", class: "POWER" }, //power

]
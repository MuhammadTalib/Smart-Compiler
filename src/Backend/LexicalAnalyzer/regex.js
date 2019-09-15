
export const Regex = (regex) => {
    console.log("Regex function", "'" + regex + "'")
    console.log(/^a(bc)*$/.test(regex)); //
    console.log(/^([A-Z]|[a-z])\w*$/.test(regex)); //identifiers
    console.log(/^[+|-]\d$/.test(regex)); //int
    console.log(/^([+|-]?\d+)?.\d*$/.test(regex)); //float
    var charA ="\\'[\\\\][nortb]\\'";
    var charB="\\'[\\\\][\\'\\\"\\\\]\\'";
    var charC="\\'[!@#$%^&*()_=+-|:;,.?}~`{]\\'";
    console.log("regex",charC+"|"+charA+"+|"+charB+"|"+charA);

    console.log(/^[^\\|\\]$/.test(regex)); //float
    //console.log(B.test(regex));




}
export const identifierRegex = (word) = {

}



//   string input; 
//   string idf="_[[:alnum:]]+|[a-zA-Z][[:alnum:]]+";
//   string intconst="[+|-][[:digit:]]+|[0-9]+";
//   string floatconst="[+|-][0-9]*\\.[0-9]+|[0-9]*\\.[0-9]+";

//   string charA ="\\'[\\\\][nortb]\\'";
//   string charB="\\'[\\\\][\\'\\\"\\\\]\\'";
//   string charC="\\'[!@#$%^&*()_=+-|:;,.?}~`{]\\'";
//   string charConst=charC+"|"+charA+"+|"+charB+"|"+charA;
//  while(true)
//   {
//     cout<<"Enter string to check Validity: "<<endl;
//     cin >> input;
//     regex regstr(charConst);
//     bool match = regex_match(input,regstr);

//     cout<<(match?"Valid " : "Not valid ")<<endl<<endl;
//   }
//   system("pause");
  
// };
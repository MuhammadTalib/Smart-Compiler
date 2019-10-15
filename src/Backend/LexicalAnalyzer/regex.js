
export const Regex = (regex) => {
    console.log("Regex function", "'" + regex + "'")
    console.log(/^a(bc)*$/.test(regex)); //
    console.log(/^([A-Z]|[a-z])\w*$/.test(regex)); //identifiers
    console.log(/^[+|-]\d$/.test(regex)); //int
    console.log(/^([+|-]?\d+)?.\d*$/.test(regex)); //float

   // console.log("string",/^\"(.*)\"$/.test(regex));
    console.log("string",/^'(.*)'$/.test(regex));
    console.log(/^[^\\|\\]$/.test(regex)); //float
    //console.log(B.test(regex));


}
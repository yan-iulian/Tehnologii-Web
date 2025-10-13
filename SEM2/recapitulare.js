function suma( a, b){
    return a+b
}

console.log("Resultatul prin functia declarata normal "+suma(10,22))


const suma2=function(a,b){
    return a+b
}
console.log("Resultatul prin functia anonima "+suma2(120,22))


const suma3=(a,b) =>{return a+b}
console.log("Resultatul prin functia arrow1 "+suma3(1220,22))


const suma4=(a,b)=> a+b
console.log("Resultatul prin functia arrow2 "+suma2(12110,22))

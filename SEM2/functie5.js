function estePalindrom(cuvant) {
  // hint: toLowerCase() + split() + reverse() + join()
  cuvant=cuvant.toLowerCase();
  for(let i=0;i<Math.floor(cuvant.length/2);i++){
    for(let j=cuvant.length-1-i; j===cuvant.length-1-i;j--)
        if(cuvant[i]!==cuvant[j])
            return false
          }
    return true
   
}

console.log(estePalindrom("radar")); // true
console.log(estePalindrom("JavaScript")); // false

console.log(estePalindrom("Radar")); // false and after true
console.log(estePalindrom("JavaScript")); // false

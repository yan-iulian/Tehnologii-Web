 function filtreazaSiRidicaLaPatrat(numere) {
   let vectorRezultat=[];
   for (let i=0;i<numere.length;i++)
    if(numere[i]%2===0)
         vectorRezultat.push(numere[i]);

  //vectorRezultat.forEach(element => {
       // element=element*element;
  //});

  for (let i=0;i<vectorRezultat.length;i++)
    vectorRezultat[i]=vectorRezultat[i]*vectorRezultat[i];
  return vectorRezultat;
}

console.log(filtreazaSiRidicaLaPatrat([1, 2, 3, 4, 5, 6]));
// rezultatul așteptat: [4, 16, 36]



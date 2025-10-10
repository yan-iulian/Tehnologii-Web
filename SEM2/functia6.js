function sorteazaDupaCheie(lista, cheie,valoare) {
   return lista.sort((a,b)=> a[cheie]>b[cheie]?1:-1).map(elementDinLista=>elementDinLista[valoare])

}

const persoane = [
  { nume: "Ion", varsta: 25 },
  { nume: "Ana", varsta: 22 },
  { nume: "Vlad", varsta: 30 }
];

console.log(sorteazaDupaCheie(persoane, "varsta","nume"));
// rezultat: [{Ana}, {Ion}, {Vlad}]

/*
In folderul test, in fisierul rle-decomp.test.js EXISTA O EROARE la aceste linii:


it("returns correct value for string 3A2B1C4D", function () {
        const result = textProcessor("rle", false, "AAABBCDDDD");       
        assert.strictEqual(result, "AAABBCDDDD");                   
    });

Tinand cont ca se doreste decomprimarea/decriptarea ( fiind setat pe false parametrul operation), 
pe al doilea rand ar fii trebuit transmis inputul,adica 3A2B1C4D in loc de AAABBCDDDD.
In documentatie scrie ca nu am voie sa modific in niciun fel folderul de test. 
Dupa multe incercari fara rezultat ale rescrierii functiei de decomprimare pentru a acoperi toate cazurile
ce apareau ca validari si duceau la rezultatul FAILED, am deschis folderul test si am analizat 
fisierul aferent testului pentru aceasta functie, unde am observat acea eroare de scriere. 

Daca se modifica , programul functioneaza!

*/

//prima exceptie 
class InvalidType extends Error{
    constructor(mesagge="InvalidType")
    {
        super(mesagge);
        this.name="InvalidType"        
    }
}

//a doua exceptie 
class InvalidInput extends Error{
    constructor(message="InvalidInput"){
        super(message)
        this.name="InvalidInput"
    }
}

// functia de criptare RLE
function functieCompresieRLE(cuvant)
{
    if(cuvant.length===0) return "";

    let rezultat="";
    let contor=1;
    let caracterRef=cuvant[0];

    for(let i=1;i<=cuvant.length;i++)
    {
        if(cuvant[i]===caracterRef)
            contor++
        else
        {
          rezultat=rezultat+contor+caracterRef;

          caracterRef=cuvant[i];
          contor=1;
        }
    }
    return rezultat;
}

//functia de decriptare RLE
function functieDecompresieRLE(cuvant)
{
    let rezultat = "";
    let i = 0;
    
    while(i < cuvant.length) 
    {
        if (i < cuvant.length && !/\d/.test(cuvant[i])) throw new InvalidInput(); 
        

        let contorCifre = "";
        while(i < cuvant.length && /\d/.test(cuvant[i]))
          {
            contorCifre = contorCifre + cuvant[i];
                i++;
          }
          
        const contor = parseInt(contorCifre);
        
        if(i < cuvant.length){
            const char = cuvant[i];
            if (/\d/.test(char)) { 
                throw new InvalidInput();
            }
            i++;
            rezultat = rezultat + char.repeat(contor);
        }
        else {
             throw new InvalidInput();
        }       
    }
    return rezultat;
}


//functia de criptare Caesar
function functieCompresieCaesar(cuvant, Shift)
{
    let rezultat="";
    const shift=Shift%26;
    for(let i=0;i<cuvant.length;i++)
    {
        const char=cuvant[i];

        if(char===" ")
        {
            rezultat=rezultat+" ";
            continue;
        }

        const eLiteraMare= (char===char.toUpperCase());
        
        let codulAsciiBaza;
        if(eLiteraMare)
            codulAsciiBaza='A'.charCodeAt(0);
        else
            codulAsciiBaza='a'.charCodeAt(0);

        const pozitieCurenta=char.charCodeAt(0)-codulAsciiBaza;
        const pozitieNoua=(pozitieCurenta+shift)%26;
        const charCodNou=codulAsciiBaza+pozitieNoua;
        rezultat=rezultat+String.fromCharCode(charCodNou);   
    }

    return rezultat;
}

//functia de decriptare Caesar
function functieDecompresieCaesar(cuvant,Shift)
{
    let rezultat="";
    const shift=Shift%26;

    for(let i=0;i<cuvant.length;i++)
    {
        const char=cuvant[i];
        if(char===" ")
        {
            rezultat=rezultat+" ";
            continue;
        }

        const eLiteraMare=(char===char.toUpperCase());
        
        let codulAsciiBaza;

        if(eLiteraMare)
            codulAsciiBaza='A'.charCodeAt(0);
        else
            codulAsciiBaza='a'.charCodeAt(0);

        const pozitieCurenta=char.charCodeAt(0)-codulAsciiBaza;

        const pozitieInitiala=(pozitieCurenta-shift+26)%26;

        const charCodInitial=codulAsciiBaza+pozitieInitiala;
        
        rezultat=rezultat+String.fromCharCode(charCodInitial);

    }
    return rezultat;
}

//functia "main"
const textProcessor = (algo, operation, input, options) => {
    
    if ( typeof input !=="string" && !(input instanceof String))
        throw new InvalidType();
    if(typeof operation !=="boolean")
        throw new InvalidType();

    if (algo.toLowerCase()==="rle")
    {
            if(operation===true)
              {
                    if(/\d/.test(input))
                        throw new InvalidInput();
                    return functieCompresieRLE(input);
              }
              else
              {                   
                return functieDecompresieRLE(input);
              }
    }
    else if( algo.toLowerCase()==="caesar") {
        
        if(/[^a-zA-Z\s]/.test(input))
            throw new InvalidInput();
        else if(!options|| typeof options.shift!=='number'|| options.shift<0)
        {
            throw new InvalidInput();
        }
        else
        {
            if(operation===true)
                return functieCompresieCaesar(input,options.shift);
            else return functieDecompresieCaesar(input,options.shift);
        }

    }
    else
        throw new Error("Trebuie sa se selecteze unul din algoritmele RLE si Caesar");

}

module.exports = {
    textProcessor,
    InvalidInput,
    InvalidType
}

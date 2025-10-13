function ePrim(a){
    for(let i=2;i<=Math.floor(a/2);i++)
        if( a%i==0)
            return false
    return true
}

console.log(ePrim(2))

const ePrim2=function(a)
{
     for(let i=2;i<=Math.floor(a/2);i++)
        if( a%i==0)
            return false
    return true
}

console.log(ePrim2(2))


const rezultat=(a)=> 
{
    for(let i=2;i<=Math.floor(a/2);i++)
        if( a%i==0)
            return false
    return true
}

console.log(rezultat(2))

console.log(rezultat(process.argv[2]))



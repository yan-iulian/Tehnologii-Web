function aplicaCallback(arr, callback) {
    result=[]
    for(let i=0;i<arr.length;i++)
        result.push(dubleaza(arr[i]))
    return result

}

function dubleaza(x) {
  return x * 2;
}

console.log(aplicaCallback([1, 2, 3], dubleaza));
// rezultat: [2, 4, 6]



//prin map

function dubleazaCuMap(arr){
    return arr.map(x=>x*2);
}

console.log(dubleazaCuMap([1,2,3]))

function frecventaCaractere(text) {
    const rezultat = {};  // obiect gol

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (rezultat[char]) {
            rezultat[char]++;  
        } else {
            rezultat[char] = 1; 
        }
    }

    return rezultat;
}

console.log(frecventaCaractere("banana"));
// rezultat: { b: 1, a: 3, n: 2 }

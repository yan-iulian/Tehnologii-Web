function inverseazaCuvinte(propozitie) {
  // folosește split(), reverse(), join()

  return propozitie.split(" ").reverse().join(" ")
}

console.log(inverseazaCuvinte("Imi place sa invat JavaScript"));
// rezultat: "JavaScript invat sa place Imi"

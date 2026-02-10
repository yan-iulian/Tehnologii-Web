function substituieTokenuri(text, values) {
  const regexToken = /\$\{([^}]+)\}/g;
  return text.replace(regexToken, (potrivire, cheie) => {
    if (values.hasOwnProperty(cheie)) {
      return values[cheie];
    } else {
      return potrivire;
    }
  });
}

function render(input, values) {
  if (typeof input !== 'object' || input === null ||
      typeof values !== 'object' || values === null) {
    throw new Error('InvalidType');
  }

  if (Array.isArray(input)) {
    return input.map(element => render(element, values)).join('');
  }

  
  if (Object.keys(input).length === 0) {
    return '';
  }

  const { tag: eticheta, attrs: atribute, children: copii } = input;

  if (!eticheta) return '';

  let stringAtribute = '';
  if (atribute) {
    const listaAtribute = Object.keys(atribute).map(cheie => {
      const valoare = atribute[cheie];

      if (typeof valoare === 'boolean' && valoare === true) {
        return cheie;
      }
      if (typeof valoare === 'string') {
        const valoareSubstituita = substituieTokenuri(valoare, values);
        return `${cheie}="${valoareSubstituita}"`;
      }
      return '';
    });
    
    const atributeProcesate = listaAtribute.filter(Boolean).join(' ');
    if (atributeProcesate) {
      stringAtribute = ' ' + atributeProcesate;
    }
  }

  let stringCopii = '';
  if (copii && Array.isArray(copii)) {
    stringCopii = copii.map(copil => {
      if (typeof copil === 'string') {
        return substituieTokenuri(copil, values);
      }
      return render(copil, values);
    }).join('');
  }

  return `<${eticheta}${stringAtribute}>${stringCopii}</${eticheta}>`;
}

function parseazaAtribute(stringAtribute) {
  const atribute = {};
  if (!stringAtribute) return atribute;

  const regexAtribute = /([a-zA-Z0-9_-]+)(?:="([^"]*)")?/g;

  let potrivire;
  while ((potrivire = regexAtribute.exec(stringAtribute)) !== null) {
    const cheie = potrivire[1];
    const valoare = potrivire[2];

    if (valoare !== undefined) {
      atribute[cheie] = valoare;
    } else {
      atribute[cheie] = true;
    }
  }
  return atribute;
}


function parse(markup) {
  if (typeof markup !== 'string') {
     if (!markup) return []; 
  }

  const stiva = [];
  const nodRadacina = { tag: 'radacina', children: [] };
  stiva.push(nodRadacina);

  const regexTokeni = /(<\/?([a-zA-Z0-9]+)([^>]*)>)|([^<]+)/g;

  let potrivire;
  
  const markupTrimmed = markup.trim();
  if (markupTrimmed.length === 0) return [];

  while ((potrivire = regexTokeni.exec(markupTrimmed)) !== null) {
    const tagComplet   = potrivire[1];
    const numeEticheta = potrivire[2];
    const sirAtribute  = potrivire[3];
    const text         = potrivire[4];

    const parinteCurent = stiva[stiva.length - 1];

    if (text) {
      if (text.trim().length > 0) {
        parinteCurent.children.push(text);
      }
      continue;
    }

    if (tagComplet) {
      const esteTagInchidere = tagComplet.startsWith('</');

      if (esteTagInchidere) {
        if (!parinteCurent || parinteCurent.tag !== numeEticheta) {
          throw new Error('InvalidMarkup');
        }
        stiva.pop();
      } else { 
        const nodNou = {
          tag: numeEticheta,
          attrs: parseazaAtribute((sirAtribute || '').trim()),
          children: [] 
        };
        
        parinteCurent.children.push(nodNou); 
        stiva.push(nodNou);
      }
    }
  }

  
  if (stiva.length !== 1) {
    throw new Error('InvalidMarkup');
  }

  
  if (nodRadacina.children.length > 1) {
    return nodRadacina.children;
  }

  if (nodRadacina.children.length === 1) {
    return nodRadacina.children[0]; 
  }

  return []; 
}


module.exports = { render, parse };
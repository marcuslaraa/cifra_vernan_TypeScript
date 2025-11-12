class CesarService {
  encrypt(textoClaro: string, deslocamento: number): string {
    const clearTextNoAccents = this.removeAccents(textoClaro);
    const caracteres = clearTextNoAccents.split('');
  const resultado: string[] = [];

  for (const char of caracteres) {
    let novoChar = char;

    if (/[a-z]/.test(char)) {
      const base = 'a'.charCodeAt(0);
      const codigo = ((char.charCodeAt(0) - base + deslocamento) % 26 + 26) % 26 + base;
      novoChar = String.fromCharCode(codigo);
    }
    else if (/[A-Z]/.test(char)) {
      const base = 'A'.charCodeAt(0);
      const codigo = ((char.charCodeAt(0) - base + deslocamento) % 26 + 26) % 26 + base;
      novoChar = String.fromCharCode(codigo);
    }

    resultado.push(novoChar);

  }
  const textoCifrado = resultado.join('');

  return textoCifrado;
}

  decrypt(textoCifrado: string, deslocamento: number): string {
    return this.encrypt(textoCifrado, -deslocamento);
  }

  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

 bruteForce(textoCifrado: string) {
    const textoSemAcento = this.removeAccents(textoCifrado);
    const tentativas = [];

    for (let deslocamento = 1; deslocamento < 26; deslocamento++) {
      const textoClaro = this.decrypt(textoSemAcento, deslocamento);
      tentativas.push({
        deslocamento,
        textoClaro
      });
    }

    return tentativas;
  }
}

export default CesarService
import LanguageDetector from '../Helper/LanguageDetector';

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

 async bruteForce(textoCifrado: string) {
  const textoSemAcento = this.removeAccents(textoCifrado);
  const tentativas: { deslocamento: number; textoClaro: string; idioma: string; score: number }[] = [];

  await LanguageDetector.init();

  for (let deslocamento = 1; deslocamento < 26; deslocamento++) {
    const textoClaro = this.decrypt(textoSemAcento, deslocamento);
    const idioma = LanguageDetector.detectLanguage(textoClaro);
    const score = idioma === 'en' || idioma === 'pt' ? 1 : 0;

    tentativas.push({ deslocamento, textoClaro, idioma, score });
  }

  console.log('tentativas', tentativas.map(t => ({ deslocamento: t.deslocamento, textoClaro: t.textoClaro })));

  const melhor = tentativas.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));

  if (melhor.idioma !== 'unknown') {
    console.log(`✅ Possível texto claro encontrado: ${melhor.textoClaro} com deslocamento de ${melhor.deslocamento}`);
  } else {
    console.log('⚠️ Nenhum texto claro detectado com confiança.');
  }

  return melhor;
}

}

export default CesarService
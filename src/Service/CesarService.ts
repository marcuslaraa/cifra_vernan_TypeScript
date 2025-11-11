class CesarService {
  encrypt(text: string, shift: number): string {
    let result = ''
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      if (char >= 65 && char <= 90) {
        result += String.fromCharCode(((char - 65 + shift) % 26) + 65)
      } else if (char >= 97 && char <= 122) {
        result += String.fromCharCode(((char - 97 + shift) % 26) + 97)
      } else {
        result += text.charAt(i)
      }
    }
    return result
  }

  decrypt(text: string, shift: number): string {
    return this.encrypt(text, 26 - shift)
  }
}

export default CesarService
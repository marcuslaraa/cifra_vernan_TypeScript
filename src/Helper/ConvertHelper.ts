class ConvertHelper {
  static stringToUint8 = (text: string) => {
    const encoder = new TextEncoder();
    return encoder.encode(text);
  }

   static bitStringToUint8 = (bits: string): Uint8Array => {
    if (bits.length % 8 !== 0) {
      throw new Error("O comprimento da string de bits deve ser múltiplo de 8");
    }

    const bytesCount = bits.length / 8;
    const out = new Uint8Array(bytesCount);

    for(let i = 0; i < bytesCount; i++) {
      const byteString = bits.slice(i * 8, i * 8 + 8);
      out[i] = parseInt(byteString, 2);
    }
    return out;
  }

  static uint8ToString = (bytes: Uint8Array) => {
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }

  static uint8ToBitString = (bytes: Uint8Array) => {
    return Array.from(bytes).map(byte => byte.toString(2).padStart(8, '0')).join('');
  }


  static uint8ToBitArray = (bytes: Uint8Array) => {
    const bits: number[] = [];
    for (const b of bytes) {
      for (let i = 7; i >= 0; i--) { 
        bits.push((b >> i) & 1);
      }
    }
    return bits;
    }

  static bitArrayToUint8 = (bits: number[]): Uint8Array => {
    if (bits.length % 8 !== 0) throw new Error('O comprimento do array de bits deve ser múltiplo de 8');
    const out = new Uint8Array(bits.length / 8);
    for (let i = 0; i < out.length; i++) {
      let val = 0;
      for (let j = 0; j < 8; j++) {
        val = (val << 1) | (bits[i * 8 + j] & 1);
      }
      out[i] = val;
    }
    return out;
  }
}

export default ConvertHelper;
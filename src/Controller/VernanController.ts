import { Request, Response, NextFunction } from "express";
import VernanService from "../Service/VernanService";
import ConvertHelper from "../Helper/ConvertHelper";
import GenerateSecureKey from "../Helper/GenerateSecureKey";

class VernanController {
  encryptService;

  constructor() {
    this.encryptService = new VernanService();
  }

  encrypt = (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log('request', request?.body)
      const { textoClaro, chave } = request?.body;
      

      if (!textoClaro) response.status(400).json({ error: 'Texto claro é obrigatório' });

      const clearTextWhitOutSpaces = textoClaro.replace(/\s/g, '');

      let secureKeyBytes: Uint8Array;
      let secureKeybitString: string;

      if (chave) {
        const hasSpaceSecureKey = /\s/.test(chave);
        if (hasSpaceSecureKey) return response.status(400).json({ error: 'A chave segura não deve conter espaços' });


        if (clearTextWhitOutSpaces.length !== chave.length) return response.status(400).json({ error: 'A chave segura deve ter o mesmo tamanho do texto claro' });

         secureKeyBytes = ConvertHelper.stringToUint8(chave);
         secureKeybitString = ConvertHelper.uint8ToBitString(secureKeyBytes);
      }

      const clearTextBytes = ConvertHelper.stringToUint8(clearTextWhitOutSpaces);

      const clearTextbitString = ConvertHelper.uint8ToBitString(clearTextBytes);

      const generateSecureKey = chave ? secureKeybitString : GenerateSecureKey.exec(clearTextbitString.length)

      const result = this.encryptService.exec({bitString: clearTextbitString, secureKey: generateSecureKey});

      const resultBytes = ConvertHelper.bitStringToUint8(result);
      // const cipherText = ConvertHelper.uint8ToString(resultBytes);

      response.status(200).json({ 
        textoClaro: textoClaro,
        textoClaroBit: clearTextbitString,
        chave: chave,
        chaveEmBit: generateSecureKey,
        textoCifrado: result
      });
    } catch (error) {
      next(error);
    }
  }

  decrypt = (request: Request, response: Response, next: NextFunction) => {
    try {
      const { textoCifrado, chave } = request?.body;

      const isBitString = typeof textoCifrado === 'string' && /^[01]+$/.test(textoCifrado);

      if (!isBitString) {
        return response.status(400).json({ error: 'O texto cifrado deve ser uma string de bits (apenas 0 e 1)' });
      }

      const isBitStringChave = typeof chave === 'string' && /^[01]+$/.test(textoCifrado);
      if (!isBitStringChave) {
        return response.status(400).json({ error: 'O texto cifrado deve ser uma string de bits (apenas 0 e 1)' });
      }

      if (!textoCifrado) return response.status(400).json({ error: 'Texto cifrado é obrigatório' });
      if (!chave) return response.status(400).json({ error: 'Chave segura é obrigatória' });

      const hasSpacecipherText = /\s/.test(textoCifrado);
      if (hasSpacecipherText) return response.status(400).json({ error: 'O texto cifrado não deve conter espaços' });

      const hasSpaceSecureKey = /\s/.test(chave);
      if (hasSpaceSecureKey) return response.status(400).json({ error: 'A chave segura não deve conter espaços' });

      const textoClaroEmBits = this.encryptService.exec({ bitString: textoCifrado, secureKey: chave });
      const clearTextBytes = ConvertHelper.bitStringToUint8(textoClaroEmBits);
      const textoClaro = ConvertHelper.uint8ToString(clearTextBytes);

      response.status(200).json({ textoClaroEmBits, chave, textoClaro });

  } catch (error) {
      next(error);
    }
  }
}
export default VernanController;
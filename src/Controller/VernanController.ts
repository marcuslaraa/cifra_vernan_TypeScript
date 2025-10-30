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
      const { clearText, secureKey } = request?.body;
      

      if (!clearText) response.status(400).json({ error: 'Texto claro é obrigatório' });

      const clearTextWhitOutSpaces = clearText.replace(/\s/g, '');

      let secureKeyBytes: Uint8Array;
      let secureKeybitString: string;

      if (secureKey) {
        const hasSpaceSecureKey = /\s/.test(secureKey);
        if (hasSpaceSecureKey) return response.status(400).json({ error: 'A chave segura não deve conter espaços' });


        if (clearTextWhitOutSpaces.length !== secureKey.length) return response.status(400).json({ error: 'A chave segura deve ter o mesmo tamanho do texto claro' });

         secureKeyBytes = ConvertHelper.stringToUint8(secureKey);
         secureKeybitString = ConvertHelper.uint8ToBitString(secureKeyBytes);
      }

      const clearTextBytes = ConvertHelper.stringToUint8(clearTextWhitOutSpaces);

      const clearTextbitString = ConvertHelper.uint8ToBitString(clearTextBytes);

      const generateSecureKey = secureKey ? secureKeybitString : GenerateSecureKey.exec(clearTextbitString.length)

      const result = this.encryptService.exec({bitString: clearTextbitString, secureKey: generateSecureKey});

      const resultBytes = ConvertHelper.bitStringToUint8(result);
      const cipherText = ConvertHelper.uint8ToString(resultBytes);

      response.status(200).json({ 
        textoClaro: clearText,
        textoClaroBit: clearTextbitString,
        secureKey,
        secureKeyBit: generateSecureKey,
        cipherTextInBits: result,
        cipherText
      });
    } catch (error) {
      next(error);
    }
  }

  decrypt = (request: Request, response: Response, next: NextFunction) => {
    try {
      const { cipherText, secureKey } = request?.body;

      const isBitString = typeof cipherText === 'string' && /^[01]+$/.test(cipherText);

      if (!isBitString) {
        return response.status(400).json({ error: 'O texto cifrado deve ser uma string de bits (apenas 0 e 1)' });
      }

      if (!cipherText) return response.status(400).json({ error: 'Texto cifrado é obrigatório' });
      if (!secureKey) return response.status(400).json({ error: 'Chave segura é obrigatória' });

      const hasSpacecipherText = /\s/.test(cipherText);
      if (hasSpacecipherText) return response.status(400).json({ error: 'O texto cifrado não deve conter espaços' });

      const hasSpaceSecureKey = /\s/.test(secureKey);
      if (hasSpaceSecureKey) return response.status(400).json({ error: 'A chave segura não deve conter espaços' });

      const clearTextInbits = this.encryptService.exec({ bitString: cipherText, secureKey });
      const clearTextBytes = ConvertHelper.bitStringToUint8(clearTextInbits);
      const clearText = ConvertHelper.uint8ToString(clearTextBytes);

      response.status(200).json({ clearTextInbits, secureKey, clearText });

  } catch (error) {
      next(error);
    }
  }
}
export default VernanController;
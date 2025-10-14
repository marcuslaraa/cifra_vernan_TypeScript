import { Request, Response, NextFunction } from "express";
import EncryptService from "../Service/EncryptService";
import ConvertHelper from "../Helper/ConvertHelper";

class EncryptController {
  encryptService;

  constructor() {
    this.encryptService = new EncryptService();
  }

  encrypt = (request: Request, response: Response, next: NextFunction) => {
    try {
      const { clearText } = request?.body || { clearText: '' };
      const bytes = ConvertHelper.stringToUint8(clearText);
      console.log('bytes:', bytes);

      const bitString = ConvertHelper.uint8ToBitString(bytes);
      console.log('bitString:', bitString);

      const bitsArray = ConvertHelper.uint8ToBitArray(bytes);
      console.log('bits array (primeiros 32):', bitsArray.slice(0, 32));

      const backToBytes = ConvertHelper.bitStringToUint8(bitString);
      console.log('backToBytes:', backToBytes);

      console.log(clearText);
      response.status(200).json({ cipherText: "Encrypted text" });
    } catch (error) {
      next(error);
    }
  }
}
export default EncryptController;
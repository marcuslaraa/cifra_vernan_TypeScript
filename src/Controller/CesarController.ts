import { ICesarController } from '../interfaces/CesarInterface'
import CesarService from '../Service/CesarService'
import { Request, Response, NextFunction } from 'express';

class CesarController implements ICesarController {
  cesarService: CesarService

  constructor(){
    this.cesarService = new CesarService()
  }

  encrypt = (request: Request, response: Response, next: NextFunction) => {
    const { textoClaro, deslocamento } = request.body
    const resultado = this.cesarService.encrypt(textoClaro, deslocamento)
    response.json({ textoCifrado: resultado })
  }

  decrypt = (request: Request, response: Response, next: NextFunction) => {
    const { textoCifrado, deslocamento } = request.body
    const resultado = this.cesarService.decrypt(textoCifrado, deslocamento)
    response.json({ textoClaro: resultado })
  }

  bruteForce = (request: Request, response: Response, next: NextFunction) => {
    const { textoCifrado } = request.body;

    if (!textoCifrado) {
      return response.status(400).json({ erro: "O campo 'textoCifrado' é obrigatório." });
    }

    const tentativas = this.cesarService.bruteForce(textoCifrado);
    response.json({ textoCifrado });
  };


}

export default CesarController
import { ICesarController } from '../interfaces/CesarInterface'
import CesarService from '../Service/CesarService'

class CesarController implements ICesarController {
  cesarService: CesarService

  constructor(){
    this.cesarService = new CesarService()
  }

  encrypt(text: string, shift: number): string {
    return this.cesarService.encrypt(text, shift)
  }

  decrypt(text: string, shift: number): string {
    return this.cesarService.decrypt(text, shift)
  }


}

export default CesarController
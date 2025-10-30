import ConvertHelper from "../Helper/ConvertHelper";

interface IEncryptProps {
  bitString: string;
  secureKey: string;
}

class VernanService {
  exec({ bitString, secureKey }: IEncryptProps): string {
    let result = [];
   for (let i = 0; i < bitString.length; i++) {
    if (bitString[i] === secureKey[i]) {
      result.push(0);
    } else {
      result.push(1);
    }
   }

    return result.join('')
  }
}

export default VernanService;
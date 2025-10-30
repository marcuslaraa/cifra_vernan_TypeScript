import { randomBytes } from "crypto";
import ConvertHelper from "./ConvertHelper";

export class GenerateSecureKey {
  static exec(lengthInBits: number) {
    const bytesCount = Math.ceil(lengthInBits / 8);

    const key = new Uint8Array(bytesCount);

    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(key);
    } else {
      const random = randomBytes(bytesCount);
      key.set(random);
    }

    const bitStringSecureKey= ConvertHelper.uint8ToBitString(key);

    return bitStringSecureKey;
  }
}
export default GenerateSecureKey;
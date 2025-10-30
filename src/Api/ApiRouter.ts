import { Router } from "express";
import VernanController from "../Controller/VernanController";

class ApiRouter {
  router: Router;
  encryptController: VernanController;

  constructor() {
    this.router = Router();
    this.encryptController = new VernanController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
  /**
 * @openapi
 * /cifrar:
 *   post:
 *     summary: Encrypt a text using Vernam cipher
 *     description: Encrypt a text using Vernam cipher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textoClaro
 *             properties:
 *               textoClaro:
 *                 type: string
 *               chave:
 *                 type: string
 *                 description: Optional secure key for encryption
 *           example:
 *             textoClaro: "Hello World"
 *             chave: "mjkuhgytrf"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textoCifrado:
 *                   type: string
 *             example:
 *               textoCifrado: "Encrypted text"
 */
this.router.post("/cifrar", this.encryptController.encrypt);

  /**
   * @openapi
   * /decifrar:
   *   post:
   *     summary: Decrypt a text using Vernam cipher
   *     description: Decrypt a text using Vernam cipher
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - textoCifrado
   *             properties:
   *               textoCifrado:
   *                 type: string
   *               chave:
   *                 type: string
   *                 description: Secure key for decryption
   *           example:
   *             textoCifrado: "Encrypted text"
   *             chave: "kijudytgenbhg"
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 textoClaro:
   *                   type: string
   *             example:
   *               textoClaro: "Hello World"
   */
this.router.post("/decifrar", this.encryptController.decrypt);
  
  }
}

export default ApiRouter;
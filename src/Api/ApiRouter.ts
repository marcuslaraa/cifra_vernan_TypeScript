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
 * /api/vernan/encrypt:
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
 *               - clearText
 *             properties:
 *               clearText:
 *                 type: string
 *               secureKey:
 *                 type: string
 *                 description: Optional secure key for encryption
 *           example:
 *             clearText: "Hello World"
 *             secureKey: "MinhaChaveOpcional"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cipherText:
 *                   type: string
 *             example:
 *               cipherText: "Encrypted text"
 */
this.router.post("/vernan/encrypt", this.encryptController.encrypt);

  /**
   * @openapi
   * /api/vernan/decrypt:
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
   *               - cipherText
   *             properties:
   *               cipherText:
   *                 type: string
   *               secureKey:
   *                 type: string
   *                 description: Secure key for decryption
   *           example:
   *             cipherText: "Encrypted text"
   *             secureKey: "MinhaChaveOpcional"
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 clearText:
   *                   type: string
   *             example:
   *               clearText: "Hello World"
   */
this.router.post("/vernan/decrypt", this.encryptController.decrypt);
  
  }
}

export default ApiRouter;
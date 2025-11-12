import { Router } from "express";
import VernanController from "../Controller/VernanController";
import CesarController from "../Controller/CesarController";

class ApiRouter {
  router: Router;
  vernanEncryptController: VernanController;
  cesarEncryptController: CesarController;

  constructor() {
    this.router = Router();
    this.vernanEncryptController = new VernanController();
    this.cesarEncryptController = new CesarController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
  /**
 * openapi
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
// this.router.post("/cifrar", this.vernanEncryptController.encrypt);

  /**
   * openapi
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
// this.router.post("/decifrar", this.vernanEncryptController.decrypt);


/**
 * @openapi
 * /cifrar:
 *   post:
 *     summary: Cifrar um texto usando a cifra de César
 *     description: Cifrar um texto usando a cifra de César
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textoClaro
 *               - deslocamento
 *             properties:
 *               textoClaro:
 *                 type: string
 *               deslocamento:
 *                 type: integer
 *                 description: Shift value for Caesar cipher
 *           example:
 *             textoClaro: "Hello World"
 *             deslocamento: 3
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
 *               textoCifrado: "Khoor Zruog"
 */
this.router.post("/cifrar", this.cesarEncryptController.encrypt);


/**
 * @openapi
 * /decifrar:
 *   post:
 *     summary: Decifrar um texto usando a cifra de César
 *     description: Decifrar um texto usando a cifra de César
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textoCifrado
 *               - deslocamento
 *             properties:
 *               textoCifrado:
 *                 type: string
 *               deslocamento:
 *                 type: integer
 *                 description: Shift value for Caesar cipher
 *           example:
 *             textoCifrado: "Khoor Zruog"
 *             deslocamento: 3
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
this.router.post("/decifrar", this.cesarEncryptController.decrypt);

/**
 * @openapi
 * /decifrarForcaBruta:
 *   post:
 *     summary: Decifrar um texto cifrado com César usando força bruta
 *     description: Tenta decifrar um texto cifrado com a cifra de César testando todos os deslocamentos possíveis.
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
 *           example:
 *             textoCifrado: "Khoor Zruog"
 *     responses:
 *       '200':
 *         description: Operação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       deslocamento:
 *                         type: integer
 *                       textoClaro:
 *                         type: string
 *             example:
 *               resultados:
 *                 - deslocamento: 3
 *                   textoClaro: "Hello World"
 *                 - deslocamento: 4
 *                   textoClaro: "Gdkkn Vnqkc"
 */
this.router.post("/decifrarForcaBruta", this.cesarEncryptController.bruteForce);

  }
}

export default ApiRouter;
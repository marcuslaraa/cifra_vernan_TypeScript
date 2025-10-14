import { Router } from "express";
import EncryptController from "../Controller/EncryptController";

class ApiRouter {
  router: Router;
  encryptController: EncryptController;

  constructor() {
    this.router = Router();
    this.encryptController = new EncryptController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
   /**
 * @openapi
 * /api/encrypt:
 *   post:
 *     summary: Encrypt a text using Vernam cipher
 *     description: Encrypt a text using Vernam cipher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clearText:
 *                 type: string
 *           example:
 *             clearText: "Hello World"
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
this.router.post("/encrypt", this.encryptController.encrypt);
  }
}

export default ApiRouter;
import { Router } from "express";

class ApiRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/teste", (req, res) => {
      res.send("API Cifra Vernan");
    });
  }
}

export default ApiRouter;
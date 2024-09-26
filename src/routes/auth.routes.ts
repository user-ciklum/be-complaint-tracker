import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/login", this.controller.login);
    this.router.post("/otpVerify", this.controller.verifyOtp);

    // Retrieve a single Tutorial with id
    //this.router.get("/:id", this.controller.findOne);
  }
}

export default new AuthRoutes().router;

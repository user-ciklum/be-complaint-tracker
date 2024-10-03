import { Router } from "express";
import { loadData, welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.get("/load", loadData); // Add the /load route here
  }
}

export default new HomeRoutes().router;

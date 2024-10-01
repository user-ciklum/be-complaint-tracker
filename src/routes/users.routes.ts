import { Router } from "express";
import UsersController from "../controllers/users.controller";
class UsersRoutes {
  router = Router();
  controller = new UsersController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/", this.controller.create);

    // Retrieve all Tutorials
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Tutorials
    this.router.get("/active", this.controller.findAllActive);

    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Tutorial with id
    this.router.put("/:id", this.controller.update);

    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Tutorials
    this.router.delete("/", this.controller.deleteAll);

    // Login route
    this.router.post("/login", this.controller.login);

    // Login route
    this.router.get("/bulk-insert", this.controller.bulkUserImport);

  }
}

export default new UsersRoutes().router;

import { Router } from "express";
import ComplaintListController from "../controllers/complaintList.controller";

class ComplaintListRoutes {
  router = Router();
  controller = new ComplaintListController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/", this.controller.create);

    // Retrieve all Tutorials
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Tutorials
    this.router.get("/published", this.controller.findAllPublished);

    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.findOne);


    // Retrieve comlaintlist with userid
    this.router.get("/user/:id", this.controller.retrieveByUserId);

    // Update a Tutorial with id
    this.router.put("/:id", this.controller.update);

    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Tutorials
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new ComplaintListRoutes().router;

import { Router } from "express";
import InstituteController from "../controllers/institute.controller";

class InstituteRoutes {
    router = Router();
    controller = new InstituteController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        // Create a new Institute
        this.router.post("/", this.controller.create);

        // Retrieve all Institutes
        this.router.get("/", this.controller.findAll);

        // Retrieve all active Institutes
        this.router.get("/active", this.controller.findAllActive);

        // Retrieve a single Institute with id
        this.router.get("/:id", this.controller.findOne);

        // Update an Institute with id
        this.router.put("/:id", this.controller.update);

        // Delete an Institute with id
        this.router.delete("/:id", this.controller.delete);

        // Delete all Institutes
        this.router.delete("/", this.controller.deleteAll);
    }
}

export default new InstituteRoutes().router;

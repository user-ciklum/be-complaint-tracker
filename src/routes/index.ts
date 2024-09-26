import { Application } from "express";
import usersRoutes from "./users.routes";
import tutorialRoutes from "./tutorial.routes";
import authRoutes from "./auth.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/api/Users", usersRoutes);
    app.use("/api/auth",authRoutes);
  }
}

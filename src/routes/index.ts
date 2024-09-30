import { Application } from "express";
import usersRoutes from "./users.routes";
import complaintListRoutes from "./complaintList.routes";
import authRoutes from "./auth.routes";
import homeRoutes from "./home.routes";
import instituteRoutes from "./institute.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/complaint", complaintListRoutes);
    app.use("/api/Users", usersRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/institute", instituteRoutes);
  }
}

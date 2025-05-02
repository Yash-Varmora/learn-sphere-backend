import { Router } from "express";

import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import courseRoute from "./course.routes.js";
import sessionRoute from "./session.routes.js";
import lectureRoute from "./lecture.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/courses", courseRoute);
router.use("/sessions", sessionRoute);
router.use("/lectures", lectureRoute);

export default router;
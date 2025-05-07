import { Router } from "express";

import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import courseRoute from "./course.routes.js";
import sessionRoute from "./session.routes.js";
import lectureRoute from "./lecture.route.js";
import enrollmentRoute from "./enrollment.route.js";
import reviewRoute from "./review.route.js";
import instructorRoute from "./instructor.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/courses", courseRoute);
router.use("/sessions", sessionRoute);
router.use("/lectures", lectureRoute);
router.use("/enrollment", enrollmentRoute);
router.use("/reviews", reviewRoute);
router.use("/instructor", instructorRoute);

export default router;
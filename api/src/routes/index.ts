import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import bookingRouter from "./bookings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(bookingRouter);

export default router;

import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import helmet from "helmet";



const app = express();

app.use(helmet());

app.use(apiLimiter);


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ServiceHub API",
  });
});

app.use("/api/auth", authRoutes);


app.use("/api/services", serviceRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/admin", adminRoutes);

app.use( "/api/notifications",notificationRoutes);


export default app;
// app.js
import express from "express";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";

import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";
import subscriptionRoute from "./routes/subscription.routes.js";
import workflowRoutes from "./routes/workflow.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// ✅ CRITICAL: connect DB on cold start
await connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/subscriptions", subscriptionRoute);
app.use("/api/v1/workflows", workflowRoutes);

app.get("/", (_, res) => {
    res.send("Welcome to Subs-guard");
});

app.use(errorMiddleware);

// Local dev only
if (process.env.NODE_ENV !== "production") {
    app.listen(process.env.PORT ?? 3000, () => {
        console.log("Listening locally");
    });
}

export default app;

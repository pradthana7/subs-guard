import express from "express";
import cookieParser from "cookie-parser";
import {NODE_ENV, PORT} from "./config/env.js";

import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import subscriptionRoute from './routes/subscription.routes.js';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRoutes from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/subscriptions', subscriptionRoute);
app.use('/api/v1/workflows', workflowRoutes);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to my life');
});

app.listen(PORT, async () => {
    console.log(`Listening on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;
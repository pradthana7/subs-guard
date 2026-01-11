import aj from '../config/arcjet.js';
import {ARCJET_INTERNAL_SECRET, NODE_ENV} from "../config/env.js";

const arcjetMiddleware = async (req, res, next) => {
    try {

        if (NODE_ENV !== "production") {
            return next();
        }

        if (
            ARCJET_INTERNAL_SECRET &&
            req.headers["x-internal-test"] === ARCJET_INTERNAL_SECRET
        ) {
            return next();
        }

        const decision = await aj.protect(req, { requested: 5 });
        if (decision.isDenied()) {

            console.log(decision.isDenied())
            if (decision.reason.isRateLimit()) return res.status(429).json({error: 'Rate limit exceeded'});
            if (decision.reason.isBot()) return res.status(403).json({error: 'Bot detected'});

            return res.status(403).json({error: 'Access Denied'});
        }

        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
};

export default arcjetMiddleware;
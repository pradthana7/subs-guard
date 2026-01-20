import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {

    try {

        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });


        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription._id.toString(),
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).send({
            success: true,
            data: {
                subscription,
                workflowRunId
            }
        });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        if (subscription.status === 'cancelled') {
            return res.status(400).json({ message: 'Subscription already cancelled' });
        }

        subscription.status = 'cancelled';
        subscription.cancelledAt = new Date();

        await subscription.save();

        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully',
        });
    } catch (error) {
        next(error);
    }
};


export const getUserSubscription = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find(
            {user: req.user._id}
        );

        res.status(200).send({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
};
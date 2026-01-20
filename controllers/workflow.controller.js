import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;

    // Initial fetch (only for scheduling)
    const subscription = await fetchSubscription(context, subscriptionId);
    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date already passed for ${subscriptionId}`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(
                context,
                `Reminder ${daysBefore} days before`,
                reminderDate
            );
        }

        await triggerReminder(
            context,
            `${daysBefore} days before reminder`,
            subscriptionId,
            daysBefore
        );
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription
            .findById(subscriptionId)
            .populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscriptionId, daysBefore) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        const subscription = await Subscription
            .findById(subscriptionId)
            .populate('user', 'name email');

        if (!subscription) return;
        if (subscription.status !== 'active') return;

        const renewalDate = dayjs(subscription.renewalDate);
        const expectedReminderDate = renewalDate.subtract(daysBefore, 'day');

        // Ensure reminder is still valid
        if (!dayjs().isSame(expectedReminderDate, 'day')) {
            console.log(`Reminder date changed. Skipping ${label}`);
            return;
        }

        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        });

        console.log(`Email sent for ${label}`);
    });
};

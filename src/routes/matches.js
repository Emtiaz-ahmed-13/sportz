const { Router } = require('express');
const { matches } = require('../db/schema');
const { db } = require('../db');
const { createMatchSchema } = require('../validation/matches');
const { getMatchStatus } = require('../utils/match-status');

const matchRouter = Router();

// Create new match
matchRouter.post('/', async (req, res) => {
    const parsed = createMatchSchema.safeParse(req.body);

    if(!parsed.success) {
        return res.status(400).json({ error: 'Invalid payload.', details: parsed.error.issues });
    }

    const { data: { startTime, endTime, homeScore, awayScore } } = parsed;

    try {
        const [event] = await db.insert(matches).values({
            ...parsed.data,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            homeScore: homeScore ?? 0,
            awayScore: awayScore ?? 0,
            status: getMatchStatus(startTime, endTime),
        }).returning();

        if(res.app.locals.broadcastMatchCreated) {
            res.app.locals.broadcastMatchCreated(event);
        }

        res.status(201).json({ data: event });
    } catch (e) {
        console.error('Error creating match:', e);
        res.status(500).json({ error: 'Failed to create match.', details: e.message });
    }
});

module.exports = matchRouter;
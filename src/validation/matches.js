const { z } = require('zod');

// Match status constants
const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
};

// Schema for listing matches query parameters
const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(), 
});

// Schema for match ID parameter
const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Schema for creating a match
const createMatchSchema = z
  .object({
    sport: z.string().min(1, 'Sport is required'),
    homeTeam: z.string().min(1, 'Home team is required'),
    awayTeam: z.string().min(1, 'Away team is required'),
    startTime: z.string().refine(
      (val) => {
        try {
          const date = new Date(val);
          return !isNaN(date.getTime()) && date.toISOString() === val;
        } catch {
          return false;
        }
      },
      { message: 'Start time must be a valid ISO date string' }
    ),
    endTime: z.string().refine(
      (val) => {
        try {
          const date = new Date(val);
          return !isNaN(date.getTime()) && date.toISOString() === val;
        } catch {
          return false;
        }
      },
      { message: 'End time must be a valid ISO date string' }
    ),
    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End time must be after start time',
        path: ['endTime'],
      });
    }
  });

// Schema for updating match scores
const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
});

module.exports = {
  MATCH_STATUS,
  listMatchesQuerySchema,
  matchIdParamSchema,
  createMatchSchema,
  updateScoreSchema,
};

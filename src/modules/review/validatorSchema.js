import Joi from 'joi';

export const createReviewSchema = Joi.object({
    courseId: Joi.string().uuid().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    review: Joi.string().allow('').optional(),
});

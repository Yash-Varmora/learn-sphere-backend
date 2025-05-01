import Joi from "joi";

const createSessionSchema = Joi.object({
    sessionOrder: Joi.number().integer().min(1).required(),
    title: Joi.string().trim().min(1).max(100).required(),
});

const updateSessionSchema = Joi.object({
    sessionOrder: Joi.number().integer().min(1),
    title: Joi.string().trim().min(1).max(100),
    courseId: Joi.string().uuid(),
});

export { createSessionSchema, updateSessionSchema };



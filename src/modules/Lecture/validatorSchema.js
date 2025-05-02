import Joi from "joi";

const createLectureSchema = Joi.object({
    lectureOrder: Joi.number().integer().min(1).required(),
    title: Joi.string().trim().min(1).max(100).required(),
    lectureUrl : Joi.string().uri().required(),
    description: Joi.string().trim().min(1).required(),
});
const updateLectureSchema = Joi.object({
    lectureOrder: Joi.number().integer().min(1),
    title: Joi.string().trim().min(1).max(100),
    lectureUrl: Joi.string().uri(),
    description: Joi.string().trim().min(1),
});

export { createLectureSchema, updateLectureSchema };
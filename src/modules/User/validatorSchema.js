import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const updateUserSchema = Joi.object({
    id: Joi.string().trim(),
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    profilePicture: Joi.string().trim(),
})

export default {
    createUserSchema,
    updateUserSchema
}
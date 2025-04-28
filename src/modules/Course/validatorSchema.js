import Joi from "joi";

const createCourseSchema = Joi.object({
    title: Joi.string().required().min(3).max(100).messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 100 characters'
    }),
    description: Joi.string().required().min(10).max(1000).messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description must not exceed 1000 characters'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category is required'
    })
});

const updateCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100).messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 100 characters'
    }),
    description: Joi.string().min(10).max(1000).messages({
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description must not exceed 1000 characters'
    }),
    category: Joi.string()
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

const courseIdSchema = Joi.object({
    id: Joi.string().uuid().required().messages({
        'string.guid': 'Invalid course ID format',
        'any.required': 'Course ID is required'
    })
});

export {
    createCourseSchema,
    updateCourseSchema,
    courseIdSchema
}; 
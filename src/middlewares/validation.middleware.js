import { CustomError, httpStatusCodes } from "../constants/constants.js";

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return next(new CustomError(httpStatusCodes["Bad Request"], errorMessage));
        }

        next();
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return next(new CustomError(httpStatusCodes["Bad Request"], errorMessage));
        }

        next();
    };
};

export { validate, validateParams }; 
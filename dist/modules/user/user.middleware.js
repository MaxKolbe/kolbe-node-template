import { errorResponse } from "../../utils/responseHandler.js";
// VALIDATION MIDDLEWARE WTH JOI
export const validateJoiRequest = (schema) => (req, res, next) => {
    try {
        const payload = req.body;
        const { error } = schema.validate(payload);
        if (!error) {
            next();
        }
        else {
            errorResponse(res, 400, "Invalid Payload", error.details);
        }
    }
    catch (error) {
        errorResponse(res, 400, "An Error Occurred", error);
    }
};
// VALIDATION MIDDLEWARE WITH ZOD
export const validateZodRequest = (schema) => (req, res, next) => {
    try {
        const payload = req.body;
        const result = schema.safeParse(payload);
        if (result.success) {
            next();
        }
        else {
            errorResponse(res, 400, "Invalid Payload", result.error.issues);
        }
    }
    catch (error) {
        errorResponse(res, 400, "An Error Occurred", error);
    }
};

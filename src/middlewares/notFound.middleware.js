import { BASE_HTTP_ERRORS, generateError } from "http-errors-plus";

/**
 * 
 */
const notFound=(req , res) => {
    const err = generateError(BASE_HTTP_ERRORS.NOT_FOUND , {
        code : 'NOT_FOUND',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    }).toJSON()

    res.status(BASE_HTTP_ERRORS.NOT_FOUND.status).json(err);
}
export {notFound};
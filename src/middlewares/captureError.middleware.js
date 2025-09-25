import { BASE_HTTP_ERRORS, generateError } from "http-errors-plus";

export const captureErrors = (err, req, res, next) => {
    
    const a = generateError(err).toJSON()
    // res.on('error', (err) =>{
    //     console.log(err );
    // })

    // next();
    res.status(err.status ?? BASE_HTTP_ERRORS.INTERNAL_SERVER_ERROR.status).json(a)
}
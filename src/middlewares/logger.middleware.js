/**
 *  @return {function}
 */

import { logger } from "@sonatel-os/juf-xpress-logger";

const captureRequest =  (req, res, next) => {
    const { ip, originalUrl, headers, body, method } = req;
    const { statusCode, statusMessage } = res;
    const start = Date.now();

    logger.writeLog({
            params: {
                logFrom: ip,
                userIp: req.headers['x-forwarded-for'] || ip,
                method: method,
                payload: body ?? {},
                headers: headers ,
                logTarget: originalUrl,
                userAgent: headers['user-agent'],
                logStatus: 301,
                logStatusCode: 'REDIRECTED' ?? '' //Http status message of the response
            },
            userName: 'elz',
            logLevel: 'INFO',
            action: 'User login',
            duration: Date.now() - start,
        });

    /** @Event listner */
    res.on('finish', () => {
        logger.writeLog({
            params: {
                logFrom: ip,
                userIp: req.headers['x-forwarded-for'] || ip,
                method: method,
                payload: body ?? {},
                headers: headers ,
                logTarget: originalUrl,
                userAgent: headers['user-agent'],
                logStatus: statusCode,
                logStatusCode: statusMessage ?? '',
            },
            userName: 'elz',
            logLevel: 'INFO',
            action: req.headers.routeName ?? '',
            duration: Date.now() - start,
        });
    })
    next();
}

export { captureRequest }